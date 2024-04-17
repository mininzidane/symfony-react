import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import CountryFlag from 'frontend/js/components/CountryFlag';
import CountryService from 'frontend/js/api/CountryService';
import Link from 'frontend/js/components/Link';
import PhoneLink from 'frontend/js/components/PhoneLink';
import EmailLink from 'frontend/js/components/EmailLink';
import SmsLink from 'frontend/js//components/SmsLink';
import CallSvg from 'frontend/images/shared/support/call.svg';
import EmailSvg from 'frontend/images/shared/support/email.svg';
import ChatSvg from 'frontend/images/shared/support/chat.svg';
import LoungePageLink from 'frontend/js/views/Support/ContactUsPage/Directory/Office/LoungePageLink';
import ContactInfoEntry from './ContactInfoEntry';
import Address from './Address';
import SocialContacts from './SocialContacts';
import useStyles from './useStyles';

function OfficeInfo({ data }) {
  const classes = useStyles();
  const isBelow1580 = useMediaQuery(`(max-width: 1580px)`);
  const isUsa = CountryService.isCountry(data.country.iso_2, 'usa');

  return (
    <div className={classes.container}>
      <ContainerFullScreen>
        <div className={classes.grid}>
          <div className={classes.locationDetails}>
            <CountryFlag iso_2={data.country.iso_2} className={classes.flag} />
            <div className={classes.locationTitle}>
              <div className={classes.locationTitleText}>{data.name}</div>
              <div className={classes.openHours}>{data.officeHours}</div>
              {isUsa && (
                <div>
                  <Link href={RouterService.getRoute('contactUs')}>{t('footer.link.viewAllOfficeLocations')}</Link>
                </div>
              )}
              <LoungePageLink iso2={data.country.iso_2} />
            </div>
          </div>

          <div className={classes.contactsList}>
            {data.phoneNumber && (
              <ContactInfoEntry
                icon={{ src: CallSvg, alt: 'Call icon' }}
                label={<FormattedMessage id="contactUsPage.directory.callUs" />}
                value={<PhoneLink phone={data.phoneNumber} className={classes.blackText} />}
              />
            )}
            {data.textNumber && (
              <ContactInfoEntry
                icon={{ src: ChatSvg, alt: 'SMS icon' }}
                label={<FormattedMessage id="contactUsPage.directory.textUs" />}
                value={<SmsLink phone={data.textNumber} className={classes.blackText} />}
              />
            )}
            {data.socialContacts.email && (
              <ContactInfoEntry
                icon={{ src: EmailSvg, alt: 'Email icon' }}
                value={<EmailLink email={data.socialContacts.email} className={classes.blackText} />}
              />
            )}

            {isBelow1580 && <SocialContacts data={data.socialContacts} />}
          </div>

          {!isBelow1580 && (
            <div className={classes.contactsList}>
              <SocialContacts data={data.socialContacts} />
            </div>
          )}

          <Address data={data} />
        </div>
      </ContainerFullScreen>
    </div>
  );
}

OfficeInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OfficeInfo;
