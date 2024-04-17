import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import SelectPlane from 'frontend/js/components/Form/PlaneTheme/SelectPlane';
import useShippingCountries from 'frontend/js/hooks/useShippingCountries';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import Refinement from '../Refinement';

function ShippingToCountry() {
  const intl = useIntl();
  const countries = useShippingCountries();
  const { refinements, refine } = useContext(CalculatorContext);
  const { shippingCountryId } = refinements;

  function handleChange(_, v) {
    refine({ countryId: v, destinationId: null, USPortId: null });
  }

  return (
    <Refinement
      label={<FormattedMessage id="vehicleCalculator.refinement.shippingToCountry" />}
      input={
        <SelectPlane
          onChangeAttribute="id"
          onChange={handleChange}
          isSearchable
          id="countryId"
          name="countryId"
          options={countries.filter((v) => v.iso_2 !== ShippingOrderService.CountryCodeUS)}
          value={shippingCountryId}
          formatOptionLabel={(option) => option.name}
          convertMobileSelectValue={parseInt}
          isNativeLabelDisabled={false}
          nativeLabel={intl.formatMessage({ id: 'vehicleCalculator.refinement.shippingToCountry' })}
        />
      }
    />
  );
}

export default ShippingToCountry;
