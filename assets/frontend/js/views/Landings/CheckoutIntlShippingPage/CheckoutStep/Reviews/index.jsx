import React from 'react';
import classnames from 'classnames';
import { SwiperSlide } from 'swiper/react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Swiper from 'frontend/js/components/Swiper';
import Card from '../../Card';
import Review from './Review';
import testimonials from './testimonials';
import ArrowRightSvg from './img/arrow-right.svg';
import useStyles from './useStyles';

function Reviews() {
  const classes = useStyles();

  const params = {
    simulateTouch: false,
    watchOverflow: true,

    loop: true,
    navigation: {
      prevEl: `.${classes.arrowLeft}`,
      nextEl: `.${classes.arrowRight}`,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
    },
  };

  return (
    <Card title={<FormattedMessage id="checkoutIntlShippingPage.reviews.title" />} className={classes.root}>
      <Swiper {...params} className={classes.swiper} autoHeight>
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className={classes.slide}>
            <Review
              photo={item.avatarUrl}
              photo2x={item.avatarUrl}
              name={item.authorName}
              rating={item.rating}
              message={item.content}
            />
          </SwiperSlide>
        ))}
        <div className={classes.bullets} />
      </Swiper>

      {Boolean(testimonials.length) && (
        <>
          <img
            className={classnames(classes.arrow, classes.arrowLeft, 'op-h')}
            src={ArrowRightSvg}
            alt="Left Arrow Icon"
          />
          <img
            className={classnames(classes.arrow, classes.arrowRight, 'op-h')}
            src={ArrowRightSvg}
            alt="Right Arrow Icon"
          />
        </>
      )}
    </Card>
  );
}

export default Reviews;
