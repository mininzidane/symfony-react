import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import ShippingTo from 'frontend/js/views/Shared/Shipping/ShippingTo';
import useLoadShippingQuote from 'frontend/js/views/Shared/Shipping/useLoadShippingQuote';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import SyncDefaultShippingInfo from 'frontend/js/views/Shared/Shipping/SyncDefaultShippingInfo';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function ShippingQuoteRow({ lot }) {
  const classes = useStyles();
  const { shippingQuote, updateShippingInformation, updateShippingQuote } = useContext(ShippingQuoteContext);
  const isLoading = useLoadShippingQuote(lot, false);

  function handleFormSubmit(values) {
    updateShippingQuote(null);
    updateShippingInformation(values);
  }

  return (
    <>
      <SyncDefaultShippingInfo lot={lot} />
      <Row
        condition
        label={<FormattedMessage id="shared.label.shippingTo" />}
        value={<ShippingTo onChange={handleFormSubmit} />}
      />
      <Row
        condition
        label={<FormattedMessage id="shared.label.quote" />}
        value={
          <>
            {isLoading && <SpinnerWheel size={14} thickness={2} />}
            {!isLoading && (
              <>
                {shippingQuote ? (
                  <span className={classes.amount}>
                    {NumberService.formatCurrency(parseFloat(shippingQuote.quote.total, 10))} USD
                  </span>
                ) : (
                  <FormattedMessage id="lotsWonPage.notAvailable.short" />
                )}
              </>
            )}
          </>
        }
      />
    </>
  );
}

ShippingQuoteRow.propTypes = {
  lot: PropTypes.object.isRequired,
};

export default ShippingQuoteRow;
