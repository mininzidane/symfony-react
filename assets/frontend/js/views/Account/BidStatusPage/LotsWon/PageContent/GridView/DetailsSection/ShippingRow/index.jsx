import React, { useEffect, useContext } from 'react';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import ShippingQuoteDestination from 'frontend/js/components/ThemedTable/LotsWonCells/_components/ShippingQuoteDestination';
import ShippingQuoteRow from './ShippingQuoteRow';

function ShippingRow() {
  const { updateFromShippingOrder, initShippingFromCustomer, customerDataInited } = useContext(ShippingQuoteContext);
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();
  const { lot, lotPurchase } = invoice;
  const { shippingOrder, isActiveOrder } = currentShippingOrder;

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
      <>
        {isActiveOrder ? (
          <Row
            condition={shippingOrder.destination}
            label={<FormattedMessage id="shared.label.shippingTo" />}
            value={<ShippingQuoteDestination />}
          />
        ) : (
          <>{lot && <ShippingQuoteRow lot={lot} />}</>
        )}
      </>
    );
  }

  return null;
}

export default ShippingRow;
