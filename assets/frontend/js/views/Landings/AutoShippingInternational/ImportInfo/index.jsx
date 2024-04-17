import React from 'react';
import useOceanQuotes from 'frontend/js/hooks/useOceanQuotes';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import Steps from './Steps';
import Shipping from './Shipping';
import useStyles from './useStyles';
import BackgroundPng from './img/background.png';

function ImportInfo() {
  const { quotes, destination } = useOceanQuotes();
  const classes = useStyles();

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{
        xl_x1: BackgroundPng,
      }}
    >
      <Container>
        <Shipping quotes={quotes.length ? quotes : null} destinationName={destination ? destination.name : ''} />
        <Steps />
      </Container>
    </ContainerFullScreen>
  );
}

export default ImportInfo;
