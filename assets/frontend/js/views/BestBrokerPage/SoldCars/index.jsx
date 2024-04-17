import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import useEventListener from 'frontend/js/hooks/useEventListener';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import SlideDown from './SlideDown';
import Car from './Car';
import useStyles from './useStyles';

function SoldCars({ lots }) {
  const classes = useStyles();
  const ref = useRef();
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const handleThrottleScroll = useCallback(
    throttle(() => {
      if (ViewportService.isPartiallyInViewport(ref.current, window.height / 3)) {
        setIsAnimationStarted(true);
        window.removeEventListener('scroll', handleThrottleScroll);
      }
    }, 250),
  );

  useEventListener('scroll', handleThrottleScroll);

  const INIT_VISIBLE_CARS_COUNT = 10;
  const allCars = lots.length;

  return (
    <div className={classes.root}>
      <div className={classes.soldCars}>Already Sold 147,834 cars</div>
      <div className={classes.list} ref={ref}>
        {lots.map(({ car_name, location }, index) => {
          const isVisible = allCars - index < INIT_VISIBLE_CARS_COUNT;
          const delay = !isVisible ? (allCars - INIT_VISIBLE_CARS_COUNT - index + 1) * 5000 : 0;
          return (
            <SlideDown key={index} in={isAnimationStarted || isVisible} delay={delay}>
              <Car name={car_name} location={location} />
            </SlideDown>
          );
        })}
      </div>
    </div>
  );
}

SoldCars.propTypes = {
  lots: PropTypes.arrayOf(PropTypes.shape({})),
};

SoldCars.defaultProps = {
  lots: [],
};

export default SoldCars;
