/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useMutation } from 'react-query';
import get from 'lodash/get';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import t from 'frontend/js/api/TranslatorService';
import CountryService from 'frontend/js/api/CountryService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import CustomerService from 'frontend/js/api/CustomerService';
import LanguageService from 'frontend/js/api/LanguageService';
import CountryFlag from 'frontend/js/components/CountryFlag';
import useStyles from './useStyles';

function CountrySelect({ SubmenuComponent, isOpen, onTriggerClick, ...props }) {
  const classes = useStyles(props);
  const { isBelowSm } = useBreakpoint();
  const officeLocations = BootstrapService.getAppValue('officeLocations', {});
  const countryLocalesMap = BootstrapService.getAppValue('countryLocales', {});
  const userCountryIso2 = CountryService.getUserCountryIso2();

  const { mutateAsync: updatePreferredCountry } = useMutation((payload) =>
    CustomerService.updatePreferredCountry(payload),
  );

  function setCountryDefaultLocale(iso2) {
    if (typeof countryLocalesMap[iso2] !== 'undefined') {
      return LanguageService.changeLocale(countryLocalesMap[iso2][0]);
    }

    return LanguageService.changeLocale(LanguageService.DEFAULT_LOCALE);
  }

  function setPreferredCountry(iso2) {
    updatePreferredCountry({ countryIso2: iso2 })
      .then(() => setCountryDefaultLocale(iso2))
      .catch(() => null);
  }

  const uniqueLocations = useMemo(
    () =>
      Object.values(officeLocations)
        .filter((officeLocation) => officeLocation.featured)
        .reduce((acc, curr) => {
          const iso2 = get(curr, 'country.iso_2');
          const exists = acc.find(({ country }) => country.iso_2 === iso2);
          if (!exists) {
            acc.push(curr);
          }

          return acc;
        }, []),
    [],
  );

  const menuItems = useMemo(
    () =>
      uniqueLocations.map((office, index) => ({
        label: (
          <>
            <CountryFlag iso_2={office.country.iso_2} className={classes.flag} />
            <span>{office.name}</span>
          </>
        ),
        onClick: () => setPreferredCountry(office.country.iso_2),
        id: index,
      })),
    [uniqueLocations],
  );

  const officeCountry = useMemo(
    () => uniqueLocations.find((value) => value.country.iso_2 === userCountryIso2),
    [userCountryIso2],
  );

  return (
    <SubmenuComponent
      isOpen={isOpen}
      onTriggerClick={onTriggerClick}
      className="qa_id_location_button"
      label={
        <>
          {isBelowSm && (
            <span>
              {t('shared.label.country')}
              :&nbsp;&nbsp;
            </span>
          )}
          <CountryFlag
            iso_2={officeCountry?.country.iso_2 || CountryService.COUNTRIES.usa.iso2}
            className={classnames(classes.flag, 'is-main')}
          />
          <span className={classes.country}>{officeCountry?.name || CountryService.COUNTRIES.usa.name}</span>
        </>
      }
      menuItems={menuItems}
    />
  );
}

export default CountrySelect;
