/* eslint-disable react/prop-types */
import React from 'react';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import ContactCard from 'frontend/js/views/Landings/Shared/ContactCard';
import useStyles from './useStyles';

function ContactInfoCard() {
  const classes = useStyles();
  const location = OfficeLocationsService.getIntlOfficeLocation();

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        <ContactCard data={location} />
      </div>
    </div>
  );
}

export default ContactInfoCard;
