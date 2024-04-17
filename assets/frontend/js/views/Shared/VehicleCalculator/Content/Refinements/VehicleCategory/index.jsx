import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import useVehicleTypes from 'frontend/js/hooks/useVehicleTypes';
import Refinement from '../Refinement';

function VehicleCategory() {
  const { refinements, refine } = useContext(CalculatorContext);
  const { vehicleCategory } = refinements;
  const vehicleTypes = useVehicleTypes();

  if (!vehicleCategory) {
    return null;
  }

  return (
    <Refinement
      label={<FormattedMessage id="vehicleCalculator.refinement.vehicleType" />}
      input={
        <SelectPlane
          onChange={(name, v) => refine({ [name]: v })}
          id="vehicleCategory"
          name="vehicleCategory"
          onChangeAttribute="key"
          options={vehicleTypes}
          value={vehicleCategory}
          formatOptionLabel={(option) => option.label}
          disabled
          dropdownIcon={false}
        />
      }
    />
  );
}

export default VehicleCategory;
