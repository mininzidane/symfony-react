import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useAuctionLocation from 'frontend/js/hooks/useAuctionLocation';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useUSPorts from 'frontend/js/hooks/useUSPorts';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Refinement from '../Refinement';

function ShippingFromUSPort() {
  const { refinements } = useContext(CalculatorContext);
  const { auctionLocationId, destinationId, USPortId, countryId, auction } = refinements;
  const auctionLocation = useAuctionLocation(auctionLocationId, auction);
  const ports = useUSPorts(destinationId, {
    lat: auctionLocation && auctionLocation.latitude,
    lon: auctionLocation && auctionLocation.longitude,
  });
  const shippingType = ShippingOrderService.getShippingTypeByCountryId(countryId);

  if (shippingType !== ShippingOrderService.TypeInternational) {
    return null;
  }

  return (
    <Refinement
      label={<FormattedMessage id="vehicleCalculator.refinement.fromUsPort" />}
      input={
        <SelectPlane
          onChangeAttribute="id"
          onChange={() => {}}
          id="USPortId"
          name="USPortId"
          options={ports}
          value={USPortId}
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={parseInt}
          disabled
          dropdownIcon={false}
        />
      }
    />
  );
}

export default ShippingFromUSPort;
