import React, { useEffect, useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingQuoteDestination from 'frontend/js/components/ThemedTable/LotsWonCells/_components/ShippingQuoteDestination';
import ShippingQuote from './ShippingQuote';
import useStyles from './useStyles';

function Shipping() {
  const classes = useStyles();
  const { updateFromShippingOrder, initShippingFromCustomer, customerDataInited } = useContext(ShippingQuoteContext);
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();
  const { lot, lotPurchase } = invoice;
  const { isLoading, shippingOrder, isActiveOrder, isSubmittedCustomQuote, errorMsg } = currentShippingOrder;

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
        {isActiveOrder ? (
          <div>
            <FormattedMessage id="shared.label.shippingTo" />: <ShippingQuoteDestination />
          </div>
        ) : (
          <>
            {lot && <ShippingQuote lot={lot} />}
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
      </div>
    );
  }

  return null;
}

export default Shipping;
