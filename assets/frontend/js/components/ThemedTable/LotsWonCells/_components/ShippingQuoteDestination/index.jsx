// import { FormattedMessage } from "react-intl-phraseapp";
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useIntl from 'frontend/js/hooks/useIntl';

function ShippingQuoteDestination() {
  const { shippingOrder: currentShippingOrder } = useLotWonContext();
  const { isActiveOrder, shippingOrder, getShippingQuoteDestination } = currentShippingOrder;
  const destination = getShippingQuoteDestination();
  const intl = useIntl();

  if (!isActiveOrder || !destination) {
    return null;
  }

  if (destination.type === ShippingOrderService.TypeInternational) {
    return `${destination.port}, ${destination.country} ${intl.formatMessage({ id: 'shared.label.via' })} ${
      destination.usPort
    }`;
  }

  return shippingOrder?.destination || null;
}

export default ShippingQuoteDestination;
