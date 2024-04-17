/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';
import CompanyService from 'frontend/js/api/CompanyService';
import Container from 'frontend/js/components/Container';
import Office from './Office';
import useStyles from './useStyles';

function Directory({ locations, className, classNameHead, noTitle }) {
  const classes = useStyles();
  const intl = useIntl();
  const intlLocation = OfficeLocationsService.getIntlOfficeLocation();
  const intlName = intl.formatMessage({ id: 'shared.label.intlSalesDept' });
  const { isAboveSm } = useBreakpoint();

  let formattedIntlLocation = {
    name: intlName,
    officeHours: CompanyService.officeHours.label,
    socialContacts: {
      email: CompanyService.emailIntl.raw,
      viber: CompanyService.messenger.viber.formatted,
      whatsapp: CompanyService.messenger.whatsapp.formatted,
    },
  };

  if (intlLocation) {
    formattedIntlLocation = {
      ...intlLocation,
      name: intlName,
    };
  }

  const intlDeptEnabled = locations.filter((loc) => loc.id === intlLocation?.id).length > 0;
  const groupedLocations = Object.values(locations).reduce((acc, cur) => {
    const office = { ...cur };
    const iso2 = get(office, 'country.iso_2');
    if (!acc[iso2]) {
      acc[iso2] = [];
    } else {
      office.country = undefined;

      const existingName = acc[iso2].find((officeLocation) => officeLocation.name === office.name);
      if (existingName) {
        office.name = undefined;
      }
    }

    acc[iso2].push(office);
    if (CountryService.isUsa(iso2) && !intlDeptEnabled) {
      acc[iso2].push(formattedIntlLocation);
    }

    return acc;
  }, {});

  return (
    <Container className={classnames(classes.root, className)}>
      {!noTitle && (
        <h2 className={classes.title}>
          <FormattedMessage id="contactUsPage.directory.title" />
        </h2>
      )}

      {isAboveSm && (
        <div className={classnames(classes.head, classNameHead)}>
          <div>
            <FormattedMessage id="shared.label.country" />
          </div>
          <div>
            <FormattedMessage id="contactUsPage.directory.contactInfo" />
          </div>
          <div>
            <FormattedMessage id="shared.label.businessAddress" />
          </div>
        </div>
      )}

      <div>
        {Object.values(groupedLocations).map((offices) =>
          offices.map((office) => <Office key={`office_${office.id}`} data={office} />),
        )}
      </div>
    </Container>
  );
}

export default Directory;
