import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';

function LogisticMap() {
  const classes = useStyles();

  return (
    <ContainerFullScreen background={{ color: '#C3E2F9' }} className={classes.root}>
      <Container>
        <div className={classes.wrap}>
          <h2 className={classes.title}>
            <FormattedMessage id="internationalAutoShippingPage.logisticMap.title" />
          </h2>
          <p className={classes.desc}>
            <FormattedMessage id="internationalAutoShippingPage.logisticMap.desc" />
          </p>
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

export default LogisticMap;
