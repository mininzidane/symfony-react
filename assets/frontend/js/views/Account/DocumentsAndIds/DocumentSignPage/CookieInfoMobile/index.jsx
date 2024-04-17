import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Ios1Png from './img/ios-1.png';
import Ios2Png from './img/ios-2.png';
import Ios3Png from './img/ios-3.png';
import Android1Png from './img/android-1.png';
import Android2Png from './img/android-2.png';
import Android3Png from './img/android-3.png';
import Android4Png from './img/android-4.png';
import Android5Png from './img/android-5.png';
import useStyles from './useStyles';

function CookieInfoMobile() {
  const classes = useStyles();
  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div className={classes.info}>
      <div className={classes.title}>
        <FormattedMessage id="documentSignPage.cookies.mobileTitle" />
      </div>

      {isIOS && (
        <div>
          <div className={classes.step}>
            1. <FormattedMessage id="documentSignPage.cookies.mobile.ios.step1" />
          </div>
          <img className={classes.instructionImage} src={Ios1Png} alt="step 1" />
          <div className={classes.step}>
            2. <FormattedMessage id="documentSignPage.cookies.mobile.ios.step2" />
          </div>
          <img className={classes.instructionImage} src={Ios2Png} alt="step 2" />
          <div className={classes.step}>
            3. <FormattedMessage id="documentSignPage.cookies.mobile.ios.step3" />
          </div>
          <img className={classes.instructionImage} src={Ios3Png} alt="step 3" />
        </div>
      )}

      {isAndroid && (
        <div>
          <div className={classes.step}>
            1. <FormattedMessage id="documentSignPage.cookies.mobile.android.step1" />
          </div>
          <img className={classes.instructionImage} src={Android1Png} alt="step 1" />
          <div className={classes.step}>
            2. <FormattedMessage id="documentSignPage.cookies.mobile.android.step2" />
          </div>
          <img className={classes.instructionImage} src={Android2Png} alt="step 2" />
          <div className={classes.step}>
            3. <FormattedMessage id="documentSignPage.cookies.mobile.android.step3" />
          </div>
          <img className={classes.instructionImage} src={Android3Png} alt="step 3" />
          <div className={classes.step}>
            4. <FormattedMessage id="documentSignPage.cookies.mobile.android.step4" />
          </div>
          <img className={classes.instructionImage} src={Android4Png} alt="step 3" />
          <div className={classes.step}>
            5. <FormattedMessage id="documentSignPage.cookies.mobile.android.step5" />
          </div>
          <img className={classes.instructionImage} src={Android5Png} alt="step 3" />
        </div>
      )}

      <div className={classes.footer}>
        <FormattedMessage
          id="documentSignPage.cookies.mobile.footerText"
          values={{ button: (chunk) => <ButtonLink label={<strong>{chunk}</strong>} onClick={RouterService.reload} /> }}
        />
      </div>
    </div>
  );
}

export default CookieInfoMobile;
