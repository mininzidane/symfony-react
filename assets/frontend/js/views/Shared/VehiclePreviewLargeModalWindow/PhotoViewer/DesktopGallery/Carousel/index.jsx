/* eslint-disable react/prop-types */
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Swiper from 'frontend/js/components/Swiper';
import Image from 'frontend/js/components/Image';
import LeftArrowIcon from './img/arrow_left.svg';
import useStyles from './useStyles';
import Control from '../Control';

function Carousel({ images, title, getSwiper, onSlideChange }) {
  const classes = useStyles();

  function renderNavigationButton(className) {
    return (
      <Control className={classnames(classes.navigation, className)}>
        <img src={LeftArrowIcon} alt="" />
      </Control>
    );
  }

  const params = {
    navigation: {
      prevEl: `.${classes.prev}`,
      nextEl: `.${classes.next}`,
    },
    loop: true,
    onSlideChange: (swiper) => onSlideChange(swiper.realIndex),
    onSwiper: getSwiper,
  };

  return (
    <Swiper {...params} className={classes.root}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image ratio={75} src={image.hdr || image.full} lazy fallback placeholder alt={title} />
        </SwiperSlide>
      ))}
      {renderNavigationButton(classes.prev)}
      {renderNavigationButton(classes.next)}
    </Swiper>
  );
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getSwiper: PropTypes.func.isRequired,
  onSlideChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Carousel.defaultProps = {
  title: '',
};

export default Carousel;
