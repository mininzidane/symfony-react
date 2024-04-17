import React from 'react';
import Container from 'frontend/js/components/Container';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import BackgroundJpg from './img/background.png';
import BackgroundImageJpg from './img/background-image.jpg';
import MotorcycleMobilePng from './img/motorcycle-mobile.png';
import MotorcyclePng from './img/motorcycle.png';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      {isBelowSm ? (
        <div className={classes.mobileSection} style={{ backgroundImage: `url(${BackgroundImageJpg})` }}>
          <h1 className={classes.caption}>
            <FormattedMessage id="newAndUsedMotorcyclesPage.hero.title" />
          </h1>
          <p className={classes.desc}>
            <FormattedMessage id="newAndUsedMotorcyclesPage.hero.subtitle" />
          </p>
          <div>
            <Button
              className={classes.cta}
              href={RouterService.getRoute('searchResults', { auction: AuctionService.SRP_FILTER_AUCTIONS.NPA })}
              color="white"
              label={<FormattedMessage id="locationPopper.viewInventory" />}
            />
          </div>

          <img className={classes.image} src={MotorcycleMobilePng} alt="Motorcycle" />
        </div>
      ) : (
        <Container>
          <div className={classes.grid}>
            <div className={classes.info}>
              <h1 className={classes.caption}>
                <FormattedMessage id="newAndUsedMotorcyclesPage.hero.title" />
              </h1>
              <p className={classes.desc}>
                <FormattedMessage id="newAndUsedMotorcyclesPage.hero.subtitle" />
              </p>
              <Button
                className={classes.cta}
                href={RouterService.getRoute('searchResults', { auction: AuctionService.SRP_FILTER_AUCTIONS.NPA })}
                color="white"
                label={<FormattedMessage id="locationPopper.viewInventory" />}
              />
              <img className={classes.image} src={MotorcyclePng} alt="Motorcycle" />
            </div>
            <div>
              <div className={classes.background} style={{ backgroundImage: `url(${BackgroundJpg})` }} />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Hero;
