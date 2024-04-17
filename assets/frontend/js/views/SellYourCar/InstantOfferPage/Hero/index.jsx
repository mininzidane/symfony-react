import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import HeroVer1 from './HeroVer1';
import HeroVer2 from './HeroVer2';

function Hero({ onSubmit, v2 }) {
  const eventTrackingService = new EventTrackingService();
  const ga = new GoogleAnalyticsService();

  function handleSubmit(values) {
    eventTrackingService.sendEvent({
      step: 'sell_your_car',
      substep: 'form_started',
    });

    ga.sendEvent('submit', 'sendform', 'sellyourcar');

    onSubmit(values);
  }

  useEffect(() => {
    eventTrackingService.sendEvent({
      step: 'sell_your_car',
    });
  }, []);

  if (v2) {
    return <HeroVer2 onSubmit={handleSubmit} />;
  }

  return <HeroVer1 onSubmit={handleSubmit} />;
}

Hero.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  v2: PropTypes.bool,
};

Hero.defaultProps = {
  v2: false,
};

export default Hero;
