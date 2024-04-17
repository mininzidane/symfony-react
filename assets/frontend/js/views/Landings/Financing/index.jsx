import React from 'react';

import Header from './Header';
import ThreeEasySteps from './ThreeEasySteps';
import HowItWork from './HowItWork';
import Cta from './Cta';
import useStyles from './useStyles';

function Financing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <ThreeEasySteps />
      <HowItWork />
      <Cta />
    </div>
  );
}

export default Financing;
