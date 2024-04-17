/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { Collapse } from '@material-ui/core';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ButtonLink from 'frontend/js/components/ButtonLink';
import LanguageService from 'frontend/js/api/LanguageService';
import CallSvg from 'frontend/images/shared/support/call.svg';
import ChatSvg from 'frontend/images/shared/support/chat.svg';
import EmailSvg from 'frontend/images/shared/support/email.svg';
import ViberSvg from 'frontend/images/shared/social/viber-20x20.svg';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-20x20.svg';
import Link from 'frontend/js/components/Link';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import CommaWrapText from 'frontend/js/components/CommaWrapText';
import CountryFlag from 'frontend/js/components/CountryFlag';
import PhoneLink from 'frontend/js/components/PhoneLink';
import SmsLink from 'frontend/js/components/SmsLink';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';
import LoungePageLink from 'frontend/js/views/Support/ContactUsPage/Directory/Office/LoungePageLink';
import Address from '../../_Shared/Address';
import Name from '../../_Shared/Name';
import ContactInfoEntry from '../../_Shared/ContactInfoEntry';
import GoogleMapsLink from '../../_Shared/GoogleMapsLink';
import OfficeOpenStateLabel from '../../_Shared/OfficeOpenStateLabel';
import useOpen from '../../_Shared/OfficeOpenStateLabel/useOpen';
import useStyles from './useStyles';
import OpenStateIcon from './OpenStateIcon';

function Office({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const countryCode = get(data, 'country.iso_2');
  const brokerUrl = get(data, 'socialContacts.brokerUrl');
  const viber = get(data, 'socialContacts.viber');
  const whatsapp = get(data, 'socialContacts.whatsapp');
  const email = get(data, 'socialContacts.email');
  const { isOpen: isOfficeOpen, hasHoursInfo } = useOpen(get(data, 'officeHourData'));

  const { isAboveSm } = useBreakpoint();

  function handleClick(e) {
    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
      return;
    }

    setIsOpen(!isOpen);
  }

  const emailEntry = email ? (
    <ContactInfoEntry icon={{ src: EmailSvg, alt: 'Email icon' }} value={<a href={`mailto:${email}`}>{email}</a>} />
  ) : null;

  return (
    <>
      <div className={classnames(classes.root, isOpen && 'is-open')}>
        <div
          className={classnames(classes.grid, classes.head)}
          onClick={handleClick}
          onKeyPress={handleClick}
          role="button"
          tabIndex={0}
        >
          <div className={classes.title}>
            {countryCode && <CountryFlag iso_2={countryCode} className={classes.flag} hasBorder />}
            {brokerUrl ? (
              <Link
                href={`/${LanguageService.getCurrentLocale()}${brokerUrl}`}
                className={classnames(classes.name, 'fw-7')}
              >
                <Name data={data} />
              </Link>
            ) : (
              <Name data={data} className={classes.name} />
            )}

            {hasHoursInfo && <div className={classnames(classes.dot, isOfficeOpen && 'is-open')} />}
          </div>

          {isAboveSm ? (
            <>
              <div className={classes.contactInfo}>
                <ContactInfoEntry
                  icon={{ src: CallSvg, alt: 'Call icon' }}
                  value={<ButtonLink label={<FormattedMessage id="contactUsPage.viewContactInfo" />} />}
                />
              </div>

              <div className={classes.location}>
                <div className={classes.googleMapsLink}>
                  <img src={PinSvg} alt="Location" width="22" height="22" />
                  {data.mapUrl ? (
                    <GoogleMapsLink data={data} />
                  ) : (
                    <button type="button">
                      <FormattedMessage id="contactUsPage.directory.showAddress" />
                    </button>
                  )}
                </div>

                <OpenStateIcon className={classes.icon} isOpen={isOpen} />
              </div>
            </>
          ) : (
            <OpenStateIcon className={classes.icon} isOpen={isOpen} />
          )}
        </div>

        <Collapse in={isOpen} timeout={300} unmountOnExit mountOnEnter>
          <div className={classnames(classes.grid, classes.details)} hidden>
            <div>
              {data.officeHours && <CommaWrapText className={classes.officeHours} value={data.officeHours} />}
              <div className={classes.openLabel}>
                <OfficeOpenStateLabel officeHourData={data.officeHourData} />
              </div>
              <LoungePageLink iso2={countryCode} />
            </div>
            <div className={classes.socials}>
              {!isAboveSm && (data.phoneNumber || data.textNumber || emailEntry) && (
                <div className={classes.caption} style={{ marginBottom: -4 }}>
                  <FormattedMessage id="contactUsPage.directory.contactInfo" />
                </div>
              )}
              {data.phoneNumber && (
                <ContactInfoEntry
                  icon={{ src: CallSvg, alt: 'Call icon' }}
                  label={<FormattedMessage id="contactUsPage.directory.callUs" />}
                  value={<PhoneLink phone={data.phoneNumber} className={classes.blackText} />}
                />
              )}
              {data.textNumber && (
                <ContactInfoEntry
                  icon={{ src: ChatSvg, alt: 'Chat icon' }}
                  label={<FormattedMessage id="contactUsPage.directory.textUs" />}
                  value={<SmsLink phone={data.textNumber} className={classes.blackText} />}
                />
              )}

              {data.phoneNumber && emailEntry}

              {(viber || whatsapp) && (
                <div className={classes.socialChats}>
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
            </div>
            <div>
              {!isAboveSm && (
                <>
                  <div className={classes.caption} style={{ paddingBottom: data.mapUrl ? 9 : 0 }}>
                    <FormattedMessage id="shared.label.businessAddress" />
                  </div>
                  {data.mapUrl && (
                    <div className={classes.googleMapsLink}>
                      <img src={PinSvg} alt="Location" width="22" height="22" />
                      <GoogleMapsLink data={data} />
                    </div>
                  )}
                </>
              )}
              <div style={{ paddingTop: 4 }}>
                <Address data={data} />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
      <div className={classes.separator} />
    </>
  );
}

export default Office;
