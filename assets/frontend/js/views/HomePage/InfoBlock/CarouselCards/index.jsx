import React from 'react';
import { SwiperSlide } from 'swiper/react';
import Swiper from 'frontend/js/components/Swiper';
import InfoCardsArray from '../InfoCardsArray';
import useStyles from './useStyles';

function InfoCardsCarousel() {
  const classes = useStyles();

  const params = {
    simulateTouch: false,
    watchOverflow: true,
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 14,
    loop: true,
    pagination: {
      el: `.${classes.bullets}`,
      type: 'bullets',
      clickable: true,
      bulletClass: classes.bullet,
      bulletActiveClass: classes.activeBullet,
    },
  };

  return (
    <div>
      <Swiper {...params} className={classes.swiper}>
        {InfoCardsArray.map((card, index) => (
          <SwiperSlide key={index} className={classes.slide}>
            <div>{card}</div>
          </SwiperSlide>
        ))}
        <div className={classes.bullets} />
      </Swiper>
    </div>
  );
}

export default InfoCardsCarousel;
