/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LeadService from 'frontend/js/api/LeadService';
import CountryService from 'frontend/js/api/CountryService';
import LeadCard from 'frontend/js/views/Landings/Shared/LeadCard';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import ContactInfoCard from './ContactInfoCard';
import useStyles from './useStyles';

function ContactUs({ iso2 }) {
  const classes = useStyles();

  const locations = OfficeLocationsService.getOfficeLocations();
  const { COUNTRIES } = CountryService;
  const { southKorea, poland } = COUNTRIES;
  const loungesWithoutOffice = [southKorea.iso2, poland.iso2];
  const selectedLocation = locations.find((l) => l.country.iso_2 === iso2 && !loungesWithoutOffice.includes(iso2));

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="shared.cta.contactUs" />
        </h2>

        <div className={classnames(classes.grid, !selectedLocation && 'is-single')}>
          <ContactInfoCard location={selectedLocation} />
          <LeadCard leadSource={LeadService.SOURCE_LOUNGE_PAGE} />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
