/* eslint-disable react/no-danger */
import React from 'react';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Container from 'frontend/js/components/Container';
import data from './data';
import useStyles from './useStyles';
import Hero from './Hero';
import Form from './Form';
import Guide from './Guide';
import AboutUs from './AboutUs';
import Reviews from './Reviews';
import Promo from './Promo';
import Footer from './Footer';

function StateLandingPage() {
  const classes = useStyles();

  const stateMatch = window.location.pathname.match(/state-(.*)/);
  const state = stateMatch && stateMatch[1];
  const values = data[state] || {};

  return (
    <div>
      <SimpleHeader />
      <Hero titleKey={values.titleKey} img={values.heroImg} statesImg={values.heroStatesImg} state={state} />
      <div className={classes.form}>
        <Container>
          <Form />
        </Container>
      </div>
      <Guide img={values.carsImg} />
      <Reviews />
      <AboutUs />
      <Promo />
      <Footer />
    </div>
  );
}

export default StateLandingPage;
