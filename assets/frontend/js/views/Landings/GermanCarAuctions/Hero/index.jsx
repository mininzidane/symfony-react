import React from 'react';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import BackgroundJpg from './img/background.jpg';
import BackgroundMobileJpg from './img/background-mobile.jpg';
import FlagSvg from './img/flag.svg';
import MapPng from './img/map.png';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root} style={{ backgroundImage: isBelowSm ? `url(${BackgroundMobileJpg})` : undefined }}>
      <Container>
        <div className={classes.grid}>
          <div className={classes.info}>
            <h1 className={classes.caption}>
              <img src={FlagSvg} alt="flag" />
              <FormattedMessage id="germanCarAuctionsPage.hero.title" />
            </h1>
            <p className={classes.desc}>
              <FormattedMessage id="germanCarAuctionsPage.hero.subtitle" />
            </p>
            <Button
              className={classes.cta}
              href={RouterService.getRoute('searchResults', { auction: AuctionService.SRP_FILTER_AUCTIONS.COPART_DE })}
              color="white"
              label={<FormattedMessage id="locationPopper.viewInventory" />}
            />
          </div>

          {!isBelowSm && (
            <div className={classes.backgroundWrap}>
              <div className={classes.background} style={{ backgroundImage: `url(${BackgroundJpg})` }} />
            </div>
          )}
        </div>
      </Container>

      <img src={MapPng} className={classes.map} alt="map" />
    </div>
  );
}

export default Hero;
