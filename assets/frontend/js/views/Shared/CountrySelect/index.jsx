import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useMutation } from 'react-query';
import CustomerService from 'frontend/js/api/CustomerService';
import LanguageService from 'frontend/js/api/LanguageService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import CountryService from 'frontend/js/api/CountryService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import Select from 'frontend/js/components/Select';
import CountryFlag from 'frontend/js/components/CountryFlag';
import useStyles from './useStyles';

function CountrySelect({ className, placement }) {
  const classes = useStyles();
  const countryLocalesMap = BootstrapService.getAppValue('countryLocales', {});
  const officeLocations = OfficeLocationsService.getOfficeLocations();
  const { getUserCountryIso2, isCountryWithOffice, COUNTRIES } = CountryService;
  const userCountryIso2 = getUserCountryIso2();
  const value = isCountryWithOffice(userCountryIso2) ? userCountryIso2 : COUNTRIES.usa.iso2;
  const { mutateAsync: updatePreferredCountry } = useMutation((payload) =>
    CustomerService.updatePreferredCountry(payload),
  );

  const options = officeLocations.map((location) => ({
    value: location.country.iso_2,
    label: (
      <>
        <CountryFlag iso_2={location.country.iso_2} className={classes.icon} />
        <span className={classes.label}>{location.name}</span>
      </>
    ),
  }));

  const { name } = officeLocations.filter((location) => location.country.iso_2 === value)[0];

  function setPreferredCountry(iso2) {
    updatePreferredCountry({ countryIso2: iso2 })
      .then(() => LanguageService.changeLocale(countryLocalesMap[iso2][0]))
      .catch(() => null);
  }

  return (
    <Select
      options={options}
      classes={{
        listItem: classes.listItem,
      }}
      value={value}
      onChange={(v) => setPreferredCountry(v)}
      trigger={
        <div className={classnames(classes.root, className)}>
          <CountryFlag iso_2={value} className={classes.icon} />
          <span className={classes.label}>{name}</span>
        </div>
      }
      placement={placement}
    />
  );
}

CountrySelect.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.string,
};

CountrySelect.defaultProps = {
  className: '',
  placement: 'bottom',
};

export default CountrySelect;
