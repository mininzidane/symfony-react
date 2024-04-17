import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import SocialLinks from 'frontend/js/views/Shared/SocialLinks';
import useContacts from 'frontend/js/hooks/useContacts';

function Component() {
  const { viber, whatsapp } = useContacts(CountryService.getUserCountryIso2());

  return <SocialLinks viber={viber} whatsapp={whatsapp} type="circle" className="pr-0" />;
}

export default Component;
