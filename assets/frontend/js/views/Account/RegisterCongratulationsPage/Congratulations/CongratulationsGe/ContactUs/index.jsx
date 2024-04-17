import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import EmailLink from 'frontend/js/components/EmailLink';
import PhoneLink from 'frontend/js/components/PhoneLink';
import useContacts from 'frontend/js/hooks/useContacts';
import SocialLinks from 'frontend/js/views/Account/RegisterCongratulationsPage/Shared/SocialLinks';

const ContactUs = () => {
  const { phoneNumber, email, viber, whatsapp } = useContacts();

  return (
    <div>
      <PhoneLink phone={phoneNumber} />
      <SocialLinks viber={viber} whatsapp={whatsapp} />
      <p>
        <FormattedMessage id="registerCongratulations.ge.contactUs.orByEmail" /> <EmailLink email={email} />
      </p>
    </div>
  );
};

export default ContactUs;
