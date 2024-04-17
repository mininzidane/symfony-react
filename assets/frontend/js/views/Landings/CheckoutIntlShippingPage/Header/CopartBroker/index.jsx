import React from 'react';
import CopartBrokerSvg from 'frontend/images/shared/partners/copart-broker-white.svg';
import useStyles from './useStyles';

function CopartBroker() {
  const classes = useStyles();

  return <img className={classes.root} src={CopartBrokerSvg} alt="Copart Registered Broker" />;
}

export default CopartBroker;
