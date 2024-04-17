import React from 'react';
import classnames from 'classnames';
import useOceanQuotes from 'frontend/js/hooks/useOceanQuotes';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Steps from './Steps';
import Shipping from './Shipping';
import useStyles from './useStyles';
import BackgroundDesktopJpg from './img/backgroundDesktop.png';
import BackgroundDesktop2xJpg from './img/backgroundDesktop@2x.png';

function ImportInfo() {
  const { quotes, destination } = useOceanQuotes();
  const classes = useStyles();

  return (
    <ContainerFullScreen
      className={classnames(classes.root, { 'is-empty': quotes.length === 0 })}
      background={{
        xl_x1: BackgroundDesktopJpg,
        xl_x2: BackgroundDesktop2xJpg,
      }}
    >
      <Shipping quotes={quotes.length ? quotes : null} destinationName={destination ? destination.name : ''} />
      <Steps />
    </ContainerFullScreen>
  );
}

export default ImportInfo;
