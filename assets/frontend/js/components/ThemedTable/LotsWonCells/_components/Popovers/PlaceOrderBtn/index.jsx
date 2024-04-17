import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Button from 'frontend/js/components/Button';
import ContentPopover from 'frontend/js/components/ContentPopover';
import ShippingPromotionForm from 'frontend/js/views/Shared/ShippingPromotionForm';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import RouterService from 'frontend/js/api/RouterService';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import useDestinations from 'frontend/js/hooks/useDestinations';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';

function PlaceOrderBtn({ lot, className, token, ...props }) {
  const intl = useIntl();
  const {
    shippingCountryId,
    shippingStateCode,
    shippingAddress,
    shippingCity,
    shippingZip,
    shippingDestinationId,
    isBorderCrossing,
    isDomestic,
    shippingQuote,
  } = useContext(ShippingQuoteContext);
  const { shippingOrder } = useLotWonContext();
  const countries = useShippingCountries();
  const destinations = useDestinations(shippingCountryId);

  function handleSubmit({ shippingOrder: createdShippingOrder, isAddShippingToMyInvoice = false }) {
    if (isAddShippingToMyInvoice) {
      shippingOrder.changeShippingOrder(createdShippingOrder);
    } else if (createdShippingOrder.token) {
      RouterService.redirect('shippingPayment', null, false, { token: createdShippingOrder.token });
    }
  }

  return (
    <div className={className}>
      <ContentPopover
        trigger={
          <Button
            label={intl.formatMessage({ id: 'shipping.orderShipping' })}
            size="sm"
            isNowrap
            color="yellow"
            {...props}
          />
        }
        popoverTitle={intl.formatMessage({ id: 'lotsWonPage.shippingOrder' })}
        popoverClass=""
        popoverOptions={{ placement: 'bottom' }}
      >
        {({ close }) => (
          <ShippingPromotionForm
            countries={countries}
            destinations={destinations}
            isDrivable={lot.drivable}
            originZip={lot.physicalZip}
            lotId={lot.id}
            auction={lot.inventoryAuction}
            vin={lot.vin}
            country={shippingCountryId}
            destination={shippingDestinationId}
            isBorderCrossing={isBorderCrossing()}
            shippingType={isDomestic() ? ShippingOrderService.TypeDomestic : ShippingOrderService.TypeInternational}
            quoteDomestic={isDomestic() ? shippingQuote : undefined}
            quoteIntl={!isDomestic() ? shippingQuote : undefined}
            location={{
              address: shippingAddress,
              city: shippingCity,
              state_code: shippingStateCode,
              zip: shippingZip,
            }}
            onSubmit={(values) => {
              close();
              handleSubmit(values);
            }}
            index={`lot${lot.id}`}
            orderSource="lots_won"
            isPreorder={false}
            lotPurchaseToken={token}
          />
        )}
      </ContentPopover>
    </div>
  );
}

PlaceOrderBtn.propTypes = {
  lot: PropTypes.shape({
    id: PropTypes.number,
    drivable: PropTypes.bool,
    vin: PropTypes.string,
    physicalZip: PropTypes.string,
    inventoryAuction: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  token: PropTypes.string,
};

PlaceOrderBtn.defaultProps = {
  className: '',
  token: '',
};

export default PlaceOrderBtn;
