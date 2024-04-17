import React from 'react';
import PropTypes from 'prop-types';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import ViberSvg from 'frontend/images/shared/social/viber-20x20.svg';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-20x20.svg';
import TelegramSvg from 'frontend/images/shared/social/telegram-circle-30x30.svg';
import ContactInfoEntry from '../ContactInfoEntry';

function SocialContacts({ data }) {
  const linkStyle = { color: '#333' };

  return (
    <>
      {data.viber && (
        <ContactInfoEntry
          icon={{ src: ViberSvg, alt: 'Viber icon' }}
          label="Viber"
          value={
            <a href={SocialLinksService.viber(data.viber)} style={linkStyle}>
              {data.viber}
            </a>
          }
        />
      )}

      {data.whatsapp && (
        <ContactInfoEntry
          icon={{ src: WhatsappSvg, alt: 'Whatsapp icon' }}
          label="Whatsapp"
          value={
            <a href={SocialLinksService.whatsapp(data.whatsapp)} style={linkStyle}>
              {data.whatsapp}
            </a>
          }
        />
      )}

      {data.telegram && (
        <ContactInfoEntry
          icon={{ src: TelegramSvg, alt: 'Telegram icon' }}
          label="Telegram"
          value={
            <a href={SocialLinksService.telegram(data.telegram)} style={linkStyle}>
              {data.telegram}
            </a>
          }
        />
      )}
    </>
  );
}

SocialContacts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SocialContacts;
