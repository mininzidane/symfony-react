import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import NumberService from 'backend/js/lib/utils/NumberService';
import Tickbox from 'backend/js/components/Form/FormikTickbox';
import ButtonLink from 'backend/js/components/ButtonLink';
import { useShippingContext } from 'backend/js/context/ShippingContext';
import { TYPE_ACCEPT_MIN } from 'backend/js/views/_Shared/Actions/CounterBidAction/types';
import useStyles from './useStyles';

function SellersMinForm({ bid, updateShippingAddress, onSubmit }) {
  const { id, sellerMinimum, activeShippingPreorder, lot = {} } = bid;
  if (!sellerMinimum) {
    return null;
  }

  const preorderTotal = get(activeShippingPreorder, 'orderInformation.quote.quote.total');
  const preorderDestination = get(activeShippingPreorder, 'destination');

  const { currency } = lot;
  const {
    destination,
    isQuoteInformationValid,
    triggerQuoteUpdate,
    getShipToLabel,
    shippingQuote,
    isQuoteValid,
    getPreorderParams,
    validatePreorderParams,
  } = useShippingContext();
  const quoteTotal = get(shippingQuote, 'quote.total');
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      preorderShipping: false,
    },
    onSubmit: async (values) => {
      const payload = {
        type: TYPE_ACCEPT_MIN,
        amount: sellerMinimum,
      };

      if (!activeShippingPreorder && values.preorderShipping && isQuoteValid && validatePreorderParams()) {
        payload.preorder = getPreorderParams();
      }

      onSubmit(payload);
    },
  });

  useEffect(() => {
    if (isQuoteInformationValid && !activeShippingPreorder) {
      triggerQuoteUpdate();
    }
  }, [destination, isQuoteInformationValid]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.row}>
        <span className="m-r-sm">
          {NumberService.formatCurrency(sellerMinimum, currency)} {currency}
        </span>
        <SubmitButton className="btn-primary" label="Accept Minimum" />
      </div>

      {activeShippingPreorder ? (
        <div className={classes.row}>
          Order placed for <b>{NumberService.formatCurrency(preorderTotal)} USD</b>&nbsp;to {preorderDestination}
        </div>
      ) : (
        <>
          <div className={classes.row}>
            <Tickbox
              id={`bid-${id}-shipping-preorder`}
              name="preorderShipping"
              onChange={(name, value) => {
                if (isQuoteValid && value) {
                  formik.setFieldValue(name, true);
                } else {
                  formik.setFieldValue(name, false);
                }
              }}
              value={formik.values.preorderShipping}
              error={formik.errors.preorderShipping}
            >
              {isQuoteValid ? (
                <>
                  Order Shipping: <b>{NumberService.formatCurrency(quoteTotal)}</b> USD
                </>
              ) : (
                <>Quote unavailable</>
              )}
            </Tickbox>
          </div>

          <div className={classes.row}>
            To:&nbsp;
            <ButtonLink label={getShipToLabel()} onClick={updateShippingAddress} />
          </div>
        </>
      )}
    </form>
  );
}

SellersMinForm.propTypes = {
  bid: PropTypes.object.isRequired,
  updateShippingAddress: PropTypes.func,
  onSubmit: PropTypes.func,
};

SellersMinForm.defaultProps = {
  updateShippingAddress: () => null,
  onSubmit: () => null,
};

export default SellersMinForm;
