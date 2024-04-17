import React from 'react';
import { SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Swiper from 'frontend/js/components/Swiper';
import Review from 'frontend/js/views/Shared/PageSections/Reviews/Review';
import Arrow from './icons/Arrow';
import reviews from './reviews';
import useStyles from './useStyles';

function ReviewsCarousel() {
  const classes = useStyles();

  const params = {
    navigation: {
      prevEl: `.${classes.prev}`,
      nextEl: `.${classes.next}`,
      disabledClass: classes.navigationDisabled,
      lockClass: classes.navigationHidden,
    },
    pagination: {
      el: `.${classes.bullets}`,
      type: 'bullets',
      clickable: true,
      bulletClass: classes.bullet,
      bulletActiveClass: classes.activeBullet,
    },
    simulateTouch: false,
    watchOverflow: true,
    slidesPerView: 'auto',
    spaceBetween: 18,
    slidesPerGroup: 1,

    breakpoints: {
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 18,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
      1780: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
    },
  };

  return (
    <div className={classes.root}>
      <ContainerFullScreen>
        <div className={classes.header}>
          <h2 className={classes.title}>
            <FormattedMessage id="homePage.reviews.title" />
          </h2>
          <div className={classes.control}>
            <div className={classnames(classes.navigation, classes.prev)}>
              <Arrow />
            </div>
            <div className={classnames(classes.navigation, classes.next)}>
              <Arrow />
            </div>
          </div>
        </div>
        <Swiper {...params} className={classes.swiper}>
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className={classes.slide}>
              <Review
                name={review.name}
                photo={review.photo}
                photo2x={review.photo2x}
                message={review.message}
                rating={review.rating}
                className={classes.review}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classes.bullets} />
      </ContainerFullScreen>
    </div>
  );
}

export default ReviewsCarousel;
