import React from 'react';
import Container from 'frontend/js/components/Container';
import Steps from './Steps';
import useStyles from './useStyles';

function HowItWorks() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <h2 className={classes.title}>How it works</h2>
        <Steps />
      </Container>
    </div>
  );
}

export default HowItWorks;
