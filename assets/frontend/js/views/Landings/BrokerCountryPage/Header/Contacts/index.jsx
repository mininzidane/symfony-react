/* eslint-disable react/prop-types */
import React from 'react';
import StringService from 'frontend/js/lib/utils/StringService';
import PhoneSvg from 'frontend/images/shared/support/phone.svg';
import SocialLinks from 'frontend/js/views/Shared/SocialLinks';
import useContacts from 'frontend/js/hooks/useContacts';
import useStyles from './useStyles';

function Contacts({ iso2 }) {
  const classes = useStyles();
  const { getPhoneHref } = StringService;
  const { phoneNumber, viber, whatsapp } = useContacts(iso2);

  return (
    <div className={classes.contactsContainer}>
      <a href={getPhoneHref(phoneNumber)} className={classes.phoneContainer}>
        <img src={PhoneSvg} alt="phone" />
        <span className={classes.phoneNumber}>{phoneNumber}</span>
      </a>
      <div>
        <SocialLinks viber={viber} whatsapp={whatsapp} />
      </div>
    </div>
  );
}

export default Contacts;
