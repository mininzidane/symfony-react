import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ShippingTo from 'frontend/js/views/Shared/Shipping/ShippingTo';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';

function ShippingQuote({ className, lot, hasCurrency, triggerClassName }) {
  const classes = useStyles();
  const { shippingQuote, updateShippingInformation, updateShippingQuote } = useContext(ShippingQuoteContext);
  const { shippingOrder } = useLotWonContext();
  const { resetError } = shippingOrder;
  const isLoading = useLoadShippingQuote(lot, false);

  function handleFormSubmit(values) {
    resetError();
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  return (
    <div className={className}>
      <SyncDefaultShippingInfo lot={lot} />

      <div>
        <FormattedMessage id="shared.label.shipTo" />:{' '}
        <span className={classes.shippingTo}>
          <ShippingTo onChange={handleFormSubmit} triggerClassName={triggerClassName} />
        </span>
      </div>

      {isLoading ? (
        <SpinnerWheel size={14} thickness={2} className={classes.spinner} />
      ) : (
        <div className={classes.quote}>
          <FormattedMessage id="shared.label.quote" />:{' '}
          {shippingQuote ? (
            <Amount
              value={parseFloat(shippingQuote.quote.total, 10)}
              hasCurrency={hasCurrency}
              className={classes.amount}
            />
          ) : (
            <FormattedMessage id="lotsWonPage.notAvailable.short" />
          )}
        </div>
      )}
    </div>
  );
}

ShippingQuote.propTypes = {
  lot: PropTypes.object.isRequired,
  className: PropTypes.string,
  triggerClassName: PropTypes.string,
  hasCurrency: PropTypes.bool,
};

ShippingQuote.defaultProps = {
  className: '',
  triggerClassName: '',
  hasCurrency: true,
};

export default ShippingQuote;
