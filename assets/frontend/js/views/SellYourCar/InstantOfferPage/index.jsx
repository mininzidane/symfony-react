import React from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';
import Steps from './Steps';
import InfoCard from './InfoCard';
import ReviewsSection from './ReviewsSection';
import ReviewsCarousel from './ReviewsCarousel';
import InstantOfferBanner from './InstantOfferBanner';

function InstantOfferPage({ onSubmit, v2 }) {
  if (v2) {
    return (
      <div>
        <Hero v2 onSubmit={onSubmit} />
        <ReviewsCarousel />
        <Steps bgColor="#fff" />
        <InfoCard />
        <InstantOfferBanner v2 />
      </div>
    );
  }

  return (
    <div>
      <Hero onSubmit={onSubmit} />
      <Steps />
      <InfoCard />
      <ReviewsSection />
      <InstantOfferBanner />
    </div>
  );
}

InstantOfferPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  v2: PropTypes.bool,
};

InstantOfferPage.defaultProps = {
  v2: false,
};

export default InstantOfferPage;
