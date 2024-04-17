import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CookiesChrome1Png from './img/cookies-chrome-2018-1.png';
import CookiesChrome2Png from './img/cookies-chrome-2018-2.png';
import CookiesChrome3Png from './img/cookies-chrome-2018-3.png';
import CookiesChrome4Png from './img/cookies-chrome-2018-4.png';
import ChromeSvg from './img/chrome.svg';
import useStyles from './useStyles';

function CookieInfoDesktop() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.caption}>
        <img className={classes.chromeIcon} src={ChromeSvg} alt="Chrome Icon" />

        <h2 className={classes.cookiesTitle}>
          <FormattedMessage id="documentSignPage.howToEnableCookiesInChrome" />
        </h2>
      </div>

      <div className={classes.info}>
        <div style={{ marginTop: 5 }}>
          <FormattedMessage id="documentSignPage.clickTheThreeDots" />
        </div>
        <img style={{ marginTop: 30 }} src={CookiesChrome1Png} alt="step 1" />
        <div style={{ marginTop: 40 }}>
          <FormattedMessage id="documentSignPage.clickOnContentSetting" />
        </div>
        <img style={{ marginTop: 30 }} src={CookiesChrome2Png} alt="step 2" />
        <div style={{ marginTop: 40 }}>
          <FormattedMessage id="documentSignPage.clickOnCookies" />
        </div>
        <img style={{ marginTop: 20 }} src={CookiesChrome3Png} alt="step 3" />
        <div style={{ marginTop: 50 }}>
          <FormattedMessage id="documentSignPage.allowSites" />
        </div>
        <img style={{ marginTop: 20 }} src={CookiesChrome4Png} alt="step 4" />
      </div>
    </>
  );
}

export default CookieInfoDesktop;
