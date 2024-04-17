import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ShippingTo from 'frontend/js/views/Shared/Shipping/ShippingTo';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';

function ShippingQuote({ className, lot }) {
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
        <div>
          <FormattedMessage id="shared.label.quote" />:{' '}
          {shippingQuote ? (
            <Amount value={parseFloat(shippingQuote.quote.total, 10)} hasCurrency className={classes.amount} />
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
};

ShippingQuote.defaultProps = {
  className: '',
};

export default ShippingQuote;
