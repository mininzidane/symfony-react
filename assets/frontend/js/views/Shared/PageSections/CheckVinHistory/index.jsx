import React, { useState } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Fade from 'frontend/js/components/Fade';
import RouterService from 'frontend/js/api/RouterService';
import LanguageService from 'frontend/js/api/LanguageService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import Container from 'frontend/js/components/Container';
import CvLogo from 'frontend/images/shared/logo/clearvin-logo.svg';
import BackgroundDesktopJpg from './img/backgroundDesktop.jpg';
import BackgroundDesktop2xJpg from './img/backgroundDesktop@2x.jpg';
import BackgroundMobileJpg from './img/backgroundMobile.jpg';
import BackgroundMobile2xJpg from './img/backgroundMobile@2x.jpg';
import NmvtisPng from './img/nmvtis.png';
import SchemaPng from './img/schema.png';
import useStyles from './useStyles';

function CheckVinHistory() {
  const VIN_MAX_LENGTH = 17;
  const VIN_MIN_LENGTH = 13;
  const classes = useStyles();
  const intl = useIntl();
  const [vin, setVin] = useState('');
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isFindVinModalOpen, setIsFindVinModalOpen] = useState(false);
  const [isNmvtisTooltipOpen, setIsNmvtisTooltipOpen] = useState(false);

  function handleInputChange(event) {
    setVin(event.target.value.slice(0, VIN_MAX_LENGTH));
    setIsErrorShown(false);
  }

  function handleSubmit() {
    if (vin.length < VIN_MIN_LENGTH) {
      setIsErrorShown(true);
    } else {
      const clearvinLocale = LanguageService.getClearvinSupportedLocale();
      window.open(RouterService.getRoute('clearvinPayment', { vin }, true, { locale: clearvinLocale }), '_blank');
    }
  }

  return (
    <ContainerFullScreen
      className={classes.container}
      background={{
        xl_x1: BackgroundDesktopJpg,
        xl_x2: BackgroundDesktop2xJpg,
        sm_x1: BackgroundMobileJpg,
        sm_x2: BackgroundMobile2xJpg,
        color: '#2A2B20',
      }}
    >
      <Container>
        <h2 className={classes.title}>
          <FormattedMessage id="homePage.intl.checkVinHistory.title" />
        </h2>

        <div className={classes.subtitle}>
          <FormattedMessage id="homePage.intl.checkVinHistory.subtitle" />
        </div>

        <div className={classes.form}>
          <div className={classes.inputContainer}>
            <div className={classes.cvLogoContainer}>
              <img width="74" src={CvLogo} alt="ClearVIN" />
            </div>
            <input
              onChange={handleInputChange}
              type="text"
              value={vin}
              className={classes.input}
              placeholder={intl.formatMessage(
                { id: 'homePage.intl.checkVinHistory.placeholder' },
                { maxLength: VIN_MAX_LENGTH },
              )}
            />
          </div>

          {isErrorShown && (
            <div className={classes.error}>
              <FormattedMessage id="form.error.vin.pleaseEnterValidVIN" />
            </div>
          )}

          <Button
            color="green-bright"
            label={<FormattedMessage id="homePage.intl.checkVinHistory.cta" />}
            className={classes.cta}
            onClick={handleSubmit}
          />

          <div className={classes.footer}>
            <button type="button" className={`${classes.link} is-start`} onClick={() => setIsFindVinModalOpen(true)}>
              <FormattedMessage id="homePage.intl.checkVinHistory.whereToFindVin" />
            </button>
            <div
              className={classes.nmvtisContainer}
              onMouseEnter={() => setIsNmvtisTooltipOpen(true)}
              onMouseLeave={() => setIsNmvtisTooltipOpen(false)}
            >
              <img src={NmvtisPng} alt="NMVTIS" />

              <Fade isOpen={isNmvtisTooltipOpen} isAlwaysMounted>
                <div className={classes.nmvtisTooltip}>
                  <FormattedMessage id="homePage.intl.checkVinHistory.approvedProvider" />
                </div>
              </Fade>
            </div>
            <Link
              className={`${classes.link} is-end`}
              href="https://www.clearvin.com/payment/buy-credits"
              isTargetBlank
              isNofollow
            >
              <FormattedMessage id="homePage.intl.checkVinHistory.noVinLink" />
            </Link>
          </div>
        </div>

        <ModalWindow isOpen={isFindVinModalOpen} onClose={() => setIsFindVinModalOpen(false)} size="md">
          <ModalWindowHeader
            title={intl.formatMessage({ id: 'globalNotificationsSettings.phoneNumber.dialog.verify.title' })}
            onClose={() => setIsFindVinModalOpen(false)}
          />
          <ModalWindowBody>
            <div>
              <div>
                <FormattedMessage id="homePage.intl.checkVinHistory.vinLocatedHere" />
              </div>
              <img src={SchemaPng} alt="schema" className={classes.schemaImage} />
              <div>
                <FormattedMessage id="homePage.intl.checkVinHistory.vinLocation1" />
              </div>
              <div style={{ marginTop: 5 }}>
                <FormattedMessage id="homePage.intl.checkVinHistory.vinLocation2" />
              </div>
              <div style={{ marginTop: 10 }}>
                <FormattedMessage id="homePage.intl.checkVinHistory.vinMotorcycles" />
              </div>
            </div>
          </ModalWindowBody>
        </ModalWindow>
      </Container>
    </ContainerFullScreen>
  );
}

export default CheckVinHistory;
