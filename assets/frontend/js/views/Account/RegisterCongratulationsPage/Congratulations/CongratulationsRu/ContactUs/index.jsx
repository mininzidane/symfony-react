import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CountryService from 'frontend/js/api/CountryService';
import EmailLink from 'frontend/js/components/EmailLink';
import PhoneLink from 'frontend/js/components/PhoneLink';
import useContacts from 'frontend/js/hooks/useContacts';
import SocialLinks from 'frontend/js/views/Account/RegisterCongratulationsPage/Shared/SocialLinks';

const ContactUs = () => {
  const { phoneNumber, viber, whatsapp, email } = useContacts(CountryService.COUNTRIES.russia.iso2);

  return (
    <div>
      <PhoneLink phone={phoneNumber} />
      <SocialLinks viber={viber} whatsapp={whatsapp} />
      <p>
        <FormattedMessage id="registerCongratulations.ru.contactUs.orByEmail" /> <EmailLink email={email} />
      </p>
    </div>
  );
};

export default ContactUs;
