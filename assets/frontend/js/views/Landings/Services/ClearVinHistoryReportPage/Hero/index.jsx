import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ClearVinLogoSvg from 'frontend/images/shared/logo/clearvin-logo-white-green.svg';
import BackgroundJpg from './img/bg.jpg';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundJpg, color: '#07431D' }}
      className={classes.root}
    >
      <Container className={classes.container}>
        <img className={classes.logo} src={ClearVinLogoSvg} alt="ClearVin" />
        <h1 className={classes.title}>
          <FormattedMessage id="clearVinHistoryReportPage.hero.title" />
        </h1>
        <div className={classes.desc}>
          <FormattedMessage id="clearVinHistoryReportPage.hero.desc" />
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
