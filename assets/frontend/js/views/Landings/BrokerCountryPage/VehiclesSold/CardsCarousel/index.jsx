import React from 'react';
import Swiper from 'frontend/js/components/Swiper';
import { SwiperSlide } from 'swiper/react';
import useStyles from './useStyles';
import data from '../data';
import VehicleCard from '../VehicleCard';

function CardsCarousel() {
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
    },
  };

  return (
    <div className={classes.root}>
      <Swiper {...params} className={classes.swiper}>
        {data.map((vehicle) => (
          <SwiperSlide key={vehicle.vin} className={classes.slide}>
            <VehicleCard data={vehicle} />
          </SwiperSlide>
        ))}
        <div className={classes.bullets} />
      </Swiper>
    </div>
  );
}

export default CardsCarousel;
