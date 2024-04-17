import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Pagination, Navigation, A11y, Lazy } from 'swiper';
import { Swiper as SwiperJs } from 'swiper/react';

// List here all modules used by any swiper
SwiperCore.use([Pagination, Navigation, A11y, Lazy]);

const Swiper = forwardRef(({ children, ...props }, ref) => (
  <SwiperJs {...props} ref={ref}>
    {children}
  </SwiperJs>
));

Swiper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.any]),
};

Swiper.defaultProps = {
  children: null,
};

export default Swiper;
