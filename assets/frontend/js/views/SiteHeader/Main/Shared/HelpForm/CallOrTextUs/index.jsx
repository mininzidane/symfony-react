import React, { useState } from 'react';
import CountryService from 'frontend/js/api/CountryService';
import PhoneLink from 'frontend/js/components/PhoneLink';
import { FormattedMessage } from 'react-intl-phraseapp';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import OpenStateLabel from './OpenStateLabel';
import useStyles from './useStyles';
import CallusSvg from './img/callus.svg';
import PhoneSvg from './img/phone.svg';
import ChatSvg from './img/chat.svg';

function CallOrTextUs() {
  const classes = useStyles();
  const [isShown, setIsShown] = useState(false);
  const { isAuthenticated } = useCustomerHelper();
  const { COUNTRIES } = CountryService;
  const usaOfficeData = OfficeLocationsService.getOfficeData(COUNTRIES.usa.iso2);
  const ga = new GoogleAnalyticsService();

  function handleTrackClick() {
    setIsShown(true);
    ga.sendEvent('header_question', 'click', 'cpb');
  }

  function handlePhoneLinkClick() {
    if (!isAuthenticated) {
      ga.sendEvent('click', 'contact', 'contactus');
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="header.needHelp.needToTalkToLivePerson" />
      </div>
      <button type="button" className={classes.button} onClick={handleTrackClick}>
        <img src={CallusSvg} alt="Call us" />
        <span>
          <FormattedMessage id="header.needHelp.callOrTextUs" />
        </span>
      </button>

      {isShown && (
        <>
          <OpenStateLabel timeData={usaOfficeData} />
          <div className={classes.contacts}>
            <div className={classes.row}>
              <div className={classes.key}>
                <FormattedMessage id="shared.label.customerService" />
              </div>
              <div className={classes.value}>{usaOfficeData.officeHours}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.key}>
                <div className={classes.label}>
                  <div>
                    <img src={PhoneSvg} alt="Call us" />
                  </div>
                  <span>
                    <FormattedMessage id="header.needHelp.callUs" />
                  </span>
                </div>
              </div>
              <div className={classes.value}>
                <PhoneLink phone={usaOfficeData.phoneNumber} onClick={handlePhoneLinkClick} />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.key}>
                <div className={classes.label}>
                  <div>
                    <img src={ChatSvg} alt="Call us" style={{ marginTop: 3 }} />
                  </div>
                  <span>
                    <FormattedMessage id="header.needHelp.textUsAt" />
                  </span>
                </div>
              </div>
              <div className={classes.value}>
                <PhoneLink phone={usaOfficeData.textNumber} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CallOrTextUs;
