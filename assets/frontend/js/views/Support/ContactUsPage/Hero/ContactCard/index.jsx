import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl-phraseapp';
import ViberSvg from 'frontend/images/shared/social/viber-circle-40x40.svg';
import WhatsappSvg from 'frontend/images/shared/social/whatsapp-circle-40x40.svg';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';
import RouterService from 'frontend/js/api/RouterService';
import CountryFlag from 'frontend/js/components/CountryFlag';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import CommaWrapText from 'frontend/js/components/CommaWrapText';
import ClocksSvg from 'frontend/images/shared/squared-blue-set/clock.svg';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';
import SocialLinksService from 'frontend/js/lib/utils/SocialLinksService';
import ZendeskTrigger from 'frontend/js/views/Support/ZendeskTrigger';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Name from '../../_Shared/Name';
import GoogleMapsLink from '../../_Shared/GoogleMapsLink';
import Address from '../../_Shared/Address';
import OfficeOpenStateLabel from '../../_Shared/OfficeOpenStateLabel';
import useOpen from '../../_Shared/OfficeOpenStateLabel/useOpen';
import useStyles from './useStyles';

function ContactCard({ data, className }) {
  const classes = useStyles();
  const countryCode = get(data, 'country.iso_2');
  const { phoneNumber, officeHours, officeHourData } = data || {};
  const { isOpen: isOfficeOpen, hasHoursInfo } = useOpen(get(data, 'officeHourData'));
  const whatsapp = get(data, 'socialContacts.whatsapp');
  const viber = get(data, 'socialContacts.viber');
  const { isBelowMd } = useBreakpoint();

  if (!data) {
    return <div className={classnames(classes.root, className)} style={{ minHeight: 300 }} />;
  }

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {countryCode && <CountryFlag iso_2={countryCode} className={classes.flag} hasBorder />}
          <Name data={data} className={classes.name} />
          {hasHoursInfo && <div className={classnames(classes.dot, isOfficeOpen && 'is-open')} />}
        </div>
        <ZendeskTrigger
          className={classes.zendeskTrigger}
          label={isBelowMd ? <FormattedMessage id="shared.cta.chat" /> : null}
        />
      </div>

      <div className={classes.controls}>
        <div className={classes.socialWrap}>
          {phoneNumber && (
            <ButtonOutlined
              className={classes.cta}
              isThinBorder
              isBackgroundWhite
              href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`}
              label={
                <>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.833333 0H3.75C4.20833 0 4.58333 0.375 4.58333 0.833333C4.58333 1.875 4.75 2.875 5.05833 3.80833C5.15 4.1 5.08333 4.425 4.85 4.65833L3.01667 6.49167C4.21667 8.85 6.15 10.775 8.50833 11.9833L10.3417 10.15C10.5083 9.99167 10.7167 9.90833 10.9333 9.90833C11.0167 9.90833 11.1083 9.91667 11.1917 9.95C12.125 10.2583 13.1333 10.425 14.1667 10.425C14.625 10.425 15 10.8 15 11.2583V14.1667C15 14.625 14.625 15 14.1667 15C6.34167 15 0 8.65833 0 0.833333C0 0.375 0.375 0 0.833333 0ZM2.95023 1.66667C3.00023 2.40833 3.12523 3.13333 3.32523 3.825L2.32523 4.825C1.98356 3.825 1.76689 2.76667 1.69189 1.66667H2.95023ZM11.1668 11.6833C11.8752 11.8833 12.6002 12.0083 13.3335 12.0583V13.3C12.2335 13.225 11.1752 13.0083 10.1668 12.675L11.1668 11.6833Z"
                    />
                  </svg>

                  {phoneNumber}
                </>
              }
            />
          )}

          {viber && (
            <TooltipOnHover
              content={<>Viber</>}
              placement="top"
              maxWidth={300}
              isInteractive={false}
              hasArrow
              color="black"
              padding="6px 12px"
              isWithoutWrapper
              trigger={
                <a
                  href={SocialLinksService.viber(viber)}
                  className={classes.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={ViberSvg} alt="Viber" />
                </a>
              }
            />
          )}

          {whatsapp && (
            <TooltipOnHover
              content={<>WhatsApp</>}
              placement="top"
              maxWidth={300}
              isInteractive={false}
              hasArrow
              color="black"
              padding="6px 12px"
              isWithoutWrapper
              trigger={
                <a
                  href={SocialLinksService.whatsapp(whatsapp)}
                  className={classes.socialLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={WhatsappSvg} alt="WhatsApp" />
                </a>
              }
            />
          )}
        </div>

        <ButtonOutlined
          label={
            <>
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 2 }}
              >
                <path
                  d="M3.25 0H16.75C18.483 0 19.8992 1.35645 19.9949 3.06558L20 3.25V12.75C20 14.483 18.6435 15.8992 16.9344 15.9949L16.75 16H3.25C1.51697 16 0.100754 14.6435 0.00514483 12.9344L0 12.75V3.25C0 1.51697 1.35645 0.100754 3.06558 0.0051446L3.25 0H16.75H3.25ZM18.5 5.373L10.3493 9.66369C10.1619 9.76233 9.94313 9.77642 9.74676 9.70596L9.65069 9.66369L1.5 5.374V12.75C1.5 13.6682 2.20711 14.4212 3.10647 14.4942L3.25 14.5H16.75C17.6682 14.5 18.4212 13.7929 18.4942 12.8935L18.5 12.75V5.373ZM16.75 1.5H3.25C2.33183 1.5 1.57881 2.20711 1.5058 3.10647L1.5 3.25V3.679L10 8.15246L18.5 3.678V3.25C18.5 2.33183 17.7929 1.57881 16.8935 1.5058L16.75 1.5Z"
                  fill="#2158F5"
                />
              </svg>

              <FormattedMessage id="contactUsPage.sendUsAnEmail" />
            </>
          }
          href={RouterService.getLocalizedHcRoute('hcSubmitRequest')}
          className={classes.cta}
          isRegularCase
          isThinBorder
          isBackgroundWhite
          isTargetBlank
        />
      </div>

      <div className={classes.address}>
        {officeHours && (
          <div className={classes.addressSection}>
            <img width={18} src={ClocksSvg} alt="clocks" />

            <div className={classes.addressDesc}>
              <div className={classes.addressLabel}>
                <FormattedMessage id="shared.label.hours" />:
              </div>
              <CommaWrapText className={classes.officeHours} value={officeHours} />

              <div className={classes.addressSmallText}>
                <OfficeOpenStateLabel officeHourData={officeHourData} />
              </div>
            </div>
          </div>
        )}

        <div className={classes.addressSection}>
          <img width={18} src={PinSvg} alt="clocks" />

          <div className={classes.addressDesc}>
            <div className={classes.addressLabel}>
              <FormattedMessage id="shared.label.location" />:
            </div>
            <Address data={data} />

            <div className={classes.addressSmallText}>
              <GoogleMapsLink data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  data: OfficeLocationShape,
  className: PropTypes.string,
};

ContactCard.defaultProps = {
  data: {},
  className: '',
};

export default ContactCard;
