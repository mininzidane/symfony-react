import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ShippingTo from 'frontend/js/views/Shared/Shipping/ShippingTo';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function NotActiveOrder({ className, lot }) {
  const classes = useStyles();
  const { shippingQuote, updateShippingInformation, updateShippingQuote } = useContext(ShippingQuoteContext);
  const isLoading = useLoadShippingQuote(lot, false);

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  return (
    <div className={className}>
      <SyncDefaultShippingInfo lot={lot} />

      <div>
        <FormattedMessage id="shared.label.shippingTo" />:{' '}
        <span className={classes.shippingTo}>
          <ShippingTo onChange={handleFormSubmit} />
        </span>
      </div>

      {isLoading ? (
        <SpinnerWheel size={14} thickness={2} className={classes.spinner} />
      ) : (
        <>
          {shippingQuote ? (
            <div className={classes.totalWrap}>
              <strong className={classes.total}>
                <span>{NumberService.formatCurrency(shippingQuote.quote.total, 'USD', true)}</span>{' '}
                <span className={classes.currency}>USD</span>
              </strong>
            </div>
          ) : (
            <div className={classes.labelWrap}>
              <span className={classes.label}>
                <FormattedMessage id="lotsWonPage.notAvailable" />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

NotActiveOrder.propTypes = {
  lot: PropTypes.object.isRequired,
  className: PropTypes.string,
};

NotActiveOrder.defaultProps = {
  className: '',
};

export default NotActiveOrder;
