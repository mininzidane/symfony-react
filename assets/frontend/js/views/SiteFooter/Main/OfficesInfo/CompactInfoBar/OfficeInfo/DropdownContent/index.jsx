/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import CommaWrapText from 'frontend/js/components/CommaWrapText';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ClocksSvg from 'frontend/images/shared/squared-blue-set/clock.svg';
import CountryFlag from 'frontend/js/components/CountryFlag';
import Address from './Address';
import OfficeOpenStateLabel from './OfficeOpenStateLabel';
import useOpen from './OfficeOpenStateLabel/useOpen';
import GoogleMapsLink from './GoogleMapsLink';
import useStyles from './useStyles';

function DropdownContent({ data, hasHeader = true }) {
  const classes = useStyles();
  const { name, phoneNumber, officeHours, officeHourData } = data || {};
  const { isOpen: isOfficeOpen, hasHoursInfo } = useOpen(officeHourData);

  return (
    <div>
      {hasHeader && (
        <div className={classes.title}>
          <CountryFlag iso_2={data.country.iso_2} className={classes.flag} />
          <div className={classes.titleLabel}>
            <strong>{name}</strong>
            {hasHoursInfo && <div className={classnames(classes.dot, isOfficeOpen && 'is-open')} />}
          </div>
        </div>
      )}

      <div className={classnames(classes.buttons, !hasHeader && 'has-border')}>
        {phoneNumber && (
          <ButtonOutlined
            className={classes.cta}
            isThinBorder
            isBackgroundWhite
            href={`tel:${phoneNumber.replace(/[^+\d]/g, '')}`}
            label={
              <>
                <svg width="15" height="15" viewBox="0 0 15 15">
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

        <ButtonOutlined
          label={
            <>
              <svg width="20" height="17" viewBox="0 0 20 17" fill="none" style={{ top: 3, marginRight: 4 }}>
                <rect x="0.75" y="0.75" width="18.5" height="15.5" rx="1.25" stroke="#2158F5" strokeWidth="1.5" />
                <rect x="4" y="5" width="11" height="1" fill="#2158F5" />
                <rect x="4" y="8" width="11" height="1" fill="#2158F5" />
                <rect x="4" y="11" width="8" height="1" fill="#2158F5" />
              </svg>
              <FormattedMessage id="shared.label.submitRequestForm" />
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

export default DropdownContent;
