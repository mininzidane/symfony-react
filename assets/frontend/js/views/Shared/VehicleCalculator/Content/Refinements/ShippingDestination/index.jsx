import React, { useContext } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useDestinations from 'frontend/js/hooks/useDestinations';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Refinement from '../Refinement';

function ShippingDestination() {
  const intl = useIntl();
  const { refinements, refine } = useContext(CalculatorContext);
  const { shippingCountryId, destinationId } = refinements;
  const destinations = useDestinations(shippingCountryId);
  const shippingType = ShippingOrderService.getShippingTypeByCountryId(shippingCountryId);

  function handleChange(_, v) {
    refine({ destinationId: v, USPortId: null });
  }

  const label =
    shippingType === ShippingOrderService.TypeInternational
      ? intl.formatMessage({ id: 'shared.label.port' })
      : intl.formatMessage({ id: 'shared.label.destination' });

  return (
    <Refinement
      label={label}
      input={
        <SelectPlane
          onChangeAttribute="id"
          onChange={handleChange}
          id="destinationId"
          name="destinationId"
          options={destinations}
          value={destinationId}
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={parseInt}
          isNativeLabelDisabled={false}
          nativeLabel={label}
        />
      }
    />
  );
}

export default ShippingDestination;
