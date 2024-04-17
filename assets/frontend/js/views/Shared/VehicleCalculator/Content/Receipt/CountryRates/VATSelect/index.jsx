import React, { useContext } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import PolandOptions from './Options/Poland';

function VATSelect() {
  const { refine, refinements } = useContext(CalculatorContext);
  const { vatRateType, countryId } = refinements;

  function handleChange(name, value) {
    refine({ [name]: value });
  }

  const options = {
    [CountryService.COUNTRIES.poland.code]: PolandOptions,
  }[countryId];

  if (!options) {
    return null;
  }

  return (
    <SelectPlane
      onChange={handleChange}
      id="vatRateType"
      name="vatRateType"
      options={options}
      value={vatRateType || options[0]}
      formatOptionLabel={(option) => `${option.label} ${+(option.rate * 100).toFixed(2)}%`}
      size="sm"
    />
  );
}

export default VATSelect;
