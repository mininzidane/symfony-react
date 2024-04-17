import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';
import CountryService from 'frontend/js/api/CountryService';
import Container from 'frontend/js/components/Container';
import Link from 'frontend/js/components/Link';
import RegisterCard from 'frontend/js/views/Shared/Auth/RegisterCard';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import PhoneLink from 'frontend/js/components/PhoneLink';
import BackgroundJpg from './img/hero-bg.jpg';
import BackgroundMobilePng from './img/hero-bg-mobile.png';
import FlagPng from './img/flag.png';
import useStyles from './useStyles';

function Hero({ pageType }) {
  const classes = useStyles();
  const { phoneNumber } = OfficeLocationsService.getOfficeData(CountryService.COUNTRIES.nigeria.iso2);

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <div className={classes.root}>
      <div>
        <img src={FlagPng} className={classes.flag} alt="Flag" />
      </div>

      <ContainerFullScreen
        background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundMobilePng }}
        className={classes.container}
      >
        <Container>
          <h1 className={classes.title}>
            {pageType === 'copart' && (
              <>
                AutoBidMaster provides Nigerian buyers with the most favorable conditions to bid on any car from Copart
                Auto Auctions.
              </>
            )}

            {pageType === 'cheki' && (
              <>
                Cheki.com & AutoBidMaster.com provide Nigerian buyers the best opportunity to bid on any car from Copart
                Auto Auctions.
              </>
            )}
          </h1>

          <div className={classes.grid}>
            <div id="register-card-container">
              <RegisterCard
                onSuccess={handleSuccess}
                title="Join Now To Start Bidding"
                className={classes.card}
                footer={
                  <div className={classes.login}>
                    <FormattedMessage
                      id="shared.access.alreadyHaveAnAccount"
                      values={{ a: (chunks) => <Link routeParams={['login']}>{chunks}</Link> }}
                    />
                  </div>
                }
              />
            </div>

            <div className={classes.description}>
              AutoBidMaster will help with bidding, winning, document processing, and shipping to Nigeria.
              <div className={classes.features}>
                <div>• Lowest broker fees for Nigerian customers</div>
                <div>• Full transparency, no hidden costs or fees</div>
                <div>• Live Bidding access to Copart Auto Auctions</div>
                <div>• Superior online and phone support </div>
              </div>
              <div className={classes.phone}>
                <PhoneLink phone={phoneNumber} />
              </div>
              <div className={classes.openHours}>Monday-Friday, 6:00-24:00 Lagos Time</div>
            </div>
          </div>
        </Container>
      </ContainerFullScreen>
    </div>
  );
}

Hero.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default Hero;
