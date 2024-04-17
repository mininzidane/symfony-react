import React, { useState } from 'react';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotPurchaseShape from 'frontend/js/lib/propshapes/LotPurchaseShape';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import ShippingQuoteContextProvider from 'frontend/js/context/ShippingQuoteContext';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CreateShippingOrder from './CreateShippingOrder';

function ShippingOrder({ lot, lotPurchase }) {
  const intl = useIntl();
  const { saleLocation, activeShippingOrder } = lotPurchase;
  const [shippingOrder, setShippingOrder] = useState(activeShippingOrder);
  const { orderInformation } = shippingOrder || {};
  const {
    name: locationName,
    address: locationAddress,
    city: locationCity,
    state_code: locationStateCode,
    zip: locationZip,
  } = saleLocation || {};

  function getDestination() {
    if (orderInformation.shippingType === ShippingOrderService.TypeDomestic) {
      return (
        <>
          {orderInformation.destination_contact_name}
          <br />
          {orderInformation.address}
          <br />
          {orderInformation.city} {orderInformation.state} {orderInformation.zip}
        </>
      );
    }

    const shippingQuote = shippingOrder?.orderInformation?.quote;
    if (!shippingQuote || !shippingQuote?.destination) {
      return null;
    }

    if (orderInformation.shippingType === ShippingOrderService.TypeInternational) {
      return (
        <>
          {shippingQuote.destination.name}, {shippingQuote.destination.country.name}{' '}
          {intl.formatMessage({ id: 'shared.label.via' })} {shippingQuote.us_port.name}
        </>
      );
    }

    if (orderInformation.shippingType === ShippingOrderService.TypeBorderCrossing) {
      return (
        <>
          {shippingQuote.destination.zip.city} {shippingQuote.destination.zip.state_code}
        </>
      );
    }

    return null;
  }

  return (
    <div className="grid-x bleed mt-15 text-black">
      {saleLocation && locationName && (
        <div className="cell xl-12 mt-5 mb-20">
          <strong>{intl.formatMessage({ id: 'shared.label.from' })}</strong>
          <br />
          {locationName}
          <br />
          {locationAddress}
          <br />
          {locationCity} {locationStateCode} {locationZip}
        </div>
      )}
      <div className="cell xl-12">
        {orderInformation ? (
          <>
            <strong>{intl.formatMessage({ id: 'shared.label.to' })}</strong>
            <br />
            {getDestination()}
            <Button
              href={RouterService.getRoute('shippingTracking', null, false, {
                emailOrToken: activeShippingOrder?.token,
                vin: lotPurchase?.vehicleVin,
              })}
              label={intl.formatMessage({ id: 'trackMyOrderPage.trackMyOrder' })}
              className="mt-15"
              isNowrap
            />
          </>
        ) : (
          <ShippingQuoteContextProvider>
            <CreateShippingOrder lot={lot} lotPurchase={lotPurchase} setShippingOrder={setShippingOrder} />
          </ShippingQuoteContextProvider>
        )}
      </div>
    </div>
  );
}

ShippingOrder.propTypes = {
  lot: LotShape.isRequired,
  lotPurchase: LotPurchaseShape,
};

ShippingOrder.defaultProps = {
  lotPurchase: {},
};

export default ShippingOrder;
