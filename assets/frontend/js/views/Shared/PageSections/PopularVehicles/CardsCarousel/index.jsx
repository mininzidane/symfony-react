import React from 'react';
import Swiper from 'frontend/js/components/Swiper';
import { SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import VehicleCard from '../VehicleCard';
import useStyles from './useStyles';

function CardsCarousel({ vehicles }) {
  const classes = useStyles();

  const params = {
    simulateTouch: false,
    watchOverflow: true,
    slidesPerView: 1,
    spaceBetween: 14,
    loop: true,
    pagination: {
      el: `.${classes.bullets}`,
      type: 'bullets',
      clickable: true,
      bulletClass: classes.bullet,
      bulletActiveClass: classes.activeBullet,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
    },
  };

  return (
    <div className={classes.root}>
      <Swiper {...params} className={classes.swiper}>
        {vehicles.map((props, index) => (
          <SwiperSlide key={index} className={classes.slide}>
            <VehicleCard {...props} />
          </SwiperSlide>
        ))}
        <div className={classes.bullets} />
      </Swiper>
    </div>
  );
}

CardsCarousel.propTypes = {
  vehicles: PropTypes.array.isRequired,
};

export default CardsCarousel;
