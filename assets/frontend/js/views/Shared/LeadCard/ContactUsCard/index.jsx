import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Link from 'frontend/js/components/Link';
import TelegramSvg from 'frontend/images/shared/social/telegram-circle-24x24.svg';
import ViberSvg from 'frontend/images/shared/social/viber-circle-24x24.svg';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-circle-24x24.svg';
import CountryService from 'frontend/js/api/CountryService';
import EmailLink from 'frontend/js/components/EmailLink';
import PhoneLink from 'frontend/js/components/PhoneLink';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import useStyles from './useStyles';

function ContactUsCard() {
  const intl = useIntl();
  const classes = useStyles();

  const officeData = OfficeLocationsService.getOfficeData(CountryService.getUserCountryIso2()) || {};
  const { socialContacts = {}, phoneNumber } = officeData;
  const { viber, whatsapp, telegram, email } = socialContacts;

  const translationSets = {
    weAppreciateYou: intl.formatMessage({ id: 'businessPage.weAppreciateYou' }),
    learnMore: intl.formatMessage({ id: 'businessPage.learnMore' }),
  };

  return (
    <div className={classes.root}>
      <div className={classes.desc}>
        <p>{translationSets.weAppreciateYou}</p>
        <p>{translationSets.learnMore}</p>
      </div>
      <div className={classes.wrap}>
        <div className={classes.phoneNumber}>
          <PhoneLink phone={phoneNumber} className={classes.phoneNumberLink}>
            {phoneNumber}
          </PhoneLink>
        </div>
        <div className={classes.messengers}>
          {viber && (
            <Link href={SocialLinksService.viber(viber)}>
              <img src={ViberSvg} alt="Viber" />
            </Link>
          )}
          {whatsapp && (
            <Link href={SocialLinksService.whatsapp(whatsapp)}>
              <img src={WhatsappSvg} alt="Whatapp" />
            </Link>
          )}
          {telegram && (
            <Link href={SocialLinksService.telegram(telegram)}>
              <img src={TelegramSvg} alt="Telegram" />
            </Link>
          )}
        </div>
      </div>
      <div className={classes.email}>
        <EmailLink email={email} className={classes.emailLink}>
          {email}
        </EmailLink>
      </div>
    </div>
  );
}

export default ContactUsCard;
