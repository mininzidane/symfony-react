/* eslint-disable import/prefer-default-export */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingQuote from '../_components/ShippingQuote';
import useShippingActions from '../_components/useShippingActions';
import PlaceOrderPopoverBtn from '../_components/Popovers/PlaceOrderBtn';
import CustomOrderPopoverBtn from '../_components/Popovers/CustomOrderBtn';
import ShippingDue from './ShippingDue';
import useStyles from './useStyles';

function B2bShippingCell({ hasShippingActions }) {
  const classes = useStyles();
  const { updateFromShippingOrder, initShippingFromCustomer, customerDataInited } = useContext(ShippingQuoteContext);
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();

  const { lot, lotPurchase } = invoice;
  const { isLoading, shippingOrder, isActiveOrder, isSubmittedCustomQuote, errorMsg } = currentShippingOrder;
  const { displayCustomOrder, displayPlaceOrder } = useShippingActions();

  useEffect(() => {
    (async () => {
      if (shippingOrder) {
        if (!customerDataInited) {
          await initShippingFromCustomer(window.customer);
        }
        await updateFromShippingOrder(shippingOrder);
      }
    })();
  }, [shippingOrder]);

  if (shippingOrder || (lotPurchase && !lotPurchase.pickedUp)) {
    return (
      <div className={classes.root}>
        {isActiveOrder && <ShippingDue shippingOrder={shippingOrder} invoice={invoice} hasCurrency={false} />}
        {!isActiveOrder && (
          <>
            {lot ? <ShippingQuote lot={lot} hasCurrency={false} triggerClassName={classes.shipTo} /> : null}
            {isLoading ? (
              <SpinnerWheel size={14} thickness={2} className={classes.spinner} />
            ) : (
              <>
                {isSubmittedCustomQuote && (
                  <div className="text-green">
                    <FormattedMessage id="shipping.status.yourCustomQuoteRequestHasBeenSubmitted" />
                  </div>
                )}
                {errorMsg && <div className="text-red">{errorMsg}</div>}
              </>
            )}
          </>
        )}
        {hasShippingActions && (
          <>
            {lot && displayPlaceOrder && (
              <PlaceOrderPopoverBtn
                lot={lot}
                token={lotPurchase?.token}
                isInline
                isRegularCase
                className={classes.btn}
              />
            )}
            {lot && displayCustomOrder && (
              <CustomOrderPopoverBtn lot={lot} isInline isRegularCase className={classes.btn} />
            )}
          </>
        )}
      </div>
    );
  }

  return null;
}

B2bShippingCell.propTypes = {
  hasShippingActions: PropTypes.bool,
};

B2bShippingCell.defaultProps = {
  hasShippingActions: false,
};

export { B2bShippingCell };
