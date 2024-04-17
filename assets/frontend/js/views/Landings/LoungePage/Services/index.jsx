/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LanguageService from 'frontend/js/api/LanguageService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import ServiceItem from './ServiceItem';
import data from './data';
import useStyles from './useStyles';

function Services({ iso2 }) {
  const classes = useStyles();
  const currentLocale = LanguageService.getCurrentLocale();
  const locations = OfficeLocationsService.getOfficeLocations();
  const location = locations.find((l) => l.country.iso_2 === iso2);

  const ContactCta = (
    <>
      <ButtonLink
        label={<FormattedMessage id="loungePage.services.signUpConsultation" />}
        onClick={() => {
          ScrollService.scrollIntoViewById('lounge-lead-form', 15, 'smooth');
          setTimeout(() => document.getElementById('lounge-lead-name').focus());
        }}
      />
      .
    </>
  );

  const services = data[iso2] || [];

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="loungePage.services.title" />
        </h2>

        <div className={classes.grid}>
          {services.map(({ title, subtitle }, index) => (
            <ServiceItem
              title={<FormattedMessage id={title} />}
              subtitle={
                <FormattedMessage
                  id={subtitle}
                  values={{
                    ContactCta,
                    officeAddress: location?.localizedAddress?.[currentLocale] || location?.address,
                  }}
                />
              }
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
