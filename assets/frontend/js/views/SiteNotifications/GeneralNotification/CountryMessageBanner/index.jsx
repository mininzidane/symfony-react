import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ContactInfoEntry from 'frontend/js/views/Support/ContactUsPage/_Shared/ContactInfoEntry';
import CallSvg from 'frontend/images/shared/support/call.svg';
import { FormattedMessage } from 'react-intl-phraseapp';
import PhoneLink from 'frontend/js/components/PhoneLink';
import ChatSvg from 'frontend/images/shared/support/chat.svg';
import SmsLink from 'frontend/js/components/SmsLink';
import ViberSvg from 'frontend/images/shared/social/viber-20x20.svg';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-20x20.svg';
import EmailSvg from 'frontend/images/shared/support/email.svg';
import useOfficeData from 'frontend/js/hooks/useOfficeData';
import useStyles from './useStyles';

function GeneralMessageBanner({ title, message }) {
  const classes = useStyles();
  const location = useOfficeData();
  const phoneNumber = get(location, 'phoneNumber');
  const textNumber = get(location, 'textNumber');
  const email = get(location, 'socialContacts.email');
  const whatsapp = get(location, 'socialContacts.whatsapp');
  const viber = get(location, 'socialContacts.viber');

  if (!title && !message) {
    return null;
  }

  return (
    <>
      {title && <div className={classes.title}>{title}</div>}
      <div className={classes.message}>{message}</div>
      {location && (
        <div className={classes.contacts}>
          {phoneNumber && (
            <ContactInfoEntry
              icon={{ src: CallSvg, alt: 'Call icon' }}
              label={<FormattedMessage id="contactUsPage.directory.callUs" />}
              value={<PhoneLink phone={phoneNumber} className={classes.blackText} />}
            />
          )}

          {textNumber && (
            <ContactInfoEntry
              icon={{ src: ChatSvg, alt: 'Chat icon' }}
              label={<FormattedMessage id="contactUsPage.directory.textUs" />}
              value={<SmsLink phone={textNumber} className={classes.blackText} />}
            />
          )}

          {email && (
            <ContactInfoEntry
              icon={{ src: EmailSvg, alt: 'Email icon' }}
              value={<a href={`mailto:${email}`}>{email}</a>}
            />
          )}

          {viber && (
            <ContactInfoEntry
              icon={{ src: ViberSvg, alt: 'Viber icon' }}
              value={
                <a href={SocialLinksService.viber(viber)} className={classes.blackText}>
                  Viber
                </a>
              }
            />
          )}

          {whatsapp && (
            <ContactInfoEntry
              icon={{ src: WhatsappSvg, alt: 'Whatsapp icon' }}
              value={
                <a href={SocialLinksService.whatsapp(whatsapp)} className={classes.blackText}>
                  WhatsApp
                </a>
              }
            />
          )}
        </div>
      )}
    </>
  );
}

GeneralMessageBanner.defaultProps = {
  title: '',
  message: '',
};

GeneralMessageBanner.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default GeneralMessageBanner;
