import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BackgroundJpg from './img/partners-eh-domestic.jpg';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      background={{ xl_x1: BackgroundJpg, sm_x1: BackgroundJpg, color: '#6b7151' }}
      className={classes.root}
    >
      <Container>
        <h2 className={classes.title}>
          <FormattedMessage id="domesticShippingPage.hero.title" values={{ br: <br className="sm-hide" /> }} />
        </h2>
      </Container>
    </ContainerFullScreen>
  );
}

export default Hero;
