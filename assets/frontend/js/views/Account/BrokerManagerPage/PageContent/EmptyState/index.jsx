/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BrokerManagerSvg from './img/broker-manager.svg';
import useStyles from './useStyles';

function EmptyState({ onClick }) {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <img src={BrokerManagerSvg} alt="Broker Manager" width="82" />
        <h1 className={classes.title}>
          <FormattedMessage id="brokerManagerPage.emptyState.title" />
        </h1>
        <p className={classes.subtitle}>
          <FormattedMessage id="brokerManagerPage.emptyState.subtitle" />
        </p>
        <Button
          color="blue"
          onClick={onClick}
          label={<FormattedMessage id="brokerManagerPage.addNewBroker" />}
          className={classes.button}
          isInline
          isRegularCase
        />
      </div>
    </Container>
  );
}

EmptyState.propTypes = {};

export default EmptyState;
