import React from 'react';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Hero from './Hero';
import Steps from './Steps';
import Faq from './Faq';
import useStyles from './useStyles';

function UkraineRepresentativePage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SimpleHeader />
      <Hero />
      <Steps />
      <Faq className={classes.faq} />
    </div>
  );
}

export default UkraineRepresentativePage;
