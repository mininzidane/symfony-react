/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import { SwiperSlide } from 'swiper/react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Swiper from 'frontend/js/components/Swiper';
import Container from 'frontend/js/components/Container';
import ArrowRightSvg from './img/arrow-right.svg';
import data from './data';
import styles from './styles';

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
    };
  }

  renderBullet = (index, className) => {
    const { classes } = this.props;

    const review = data[index];

    return ReactDOMServer.renderToString(
      <div className={className}>
        <img className={classes.icon} src={review.img} alt={review.name} />
        <div className={classes.footer}>
          <div className={classes.name}>{review.name}</div>
          <div className={classes.location}>{review.location}</div>
        </div>
      </div>,
    );
  };

  render() {
    const { classes } = this.props;
    const { currentSlide } = this.state;

    const params = {
      onSlideChange: (swiper) => this.setState({ currentSlide: swiper.realIndex }),
      loop: true,
      spaceBetween: 30,
      navigation: {
        prevEl: `.${classes.arrowLeft}`,
        nextEl: `.${classes.arrowRight}`,
      },
      pagination: {
        el: `.${classes.bullets}`,
        type: 'bullets',
        clickable: true,
        bulletClass: classes.bullet,
        bulletActiveClass: classes.activeBullet,
        renderBullet: this.renderBullet,
      },
      roundLengths: true,
      slidesPerView: 1,
      wrapperTag: ({ className, children, ...props }) => (
        <div className={classNames(className, classes.wrapper)} {...props}>
          {children}
        </div>
      ),
    };

    return (
      <div className={classes.root}>
        <Container>
          <div className={classes.title}>
            <FormattedMessage id="stateLandingPage.reviews.96_of_customers_would_use_us_again" />
          </div>
        </Container>

        {data[currentSlide] && (
          <div className={classes.rating}>
            <Rating className={classes.stars} value={data[currentSlide].rating} precision={0.1} readOnly />
          </div>
        )}

        <div className={classes.swiper}>
          <Swiper {...params}>
            {data.map((review, index) => (
              <SwiperSlide key={index}>
                <div className={classes.review}>
                  <FormattedMessage id={review.reviewTranslationKey} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {Boolean(data.length) && (
            <>
              <img
                className={classNames(classes.arrow, classes.arrowLeft, 'op-h')}
                src={ArrowRightSvg}
                alt="Left Arrow Icon"
              />
              <img
                className={classNames(classes.arrow, classes.arrowRight, 'op-h')}
                src={ArrowRightSvg}
                alt="Right Arrow Icon"
              />
            </>
          )}
        </div>
        <div className={classes.bullets} />
      </div>
    );
  }
}

export default withStyles(styles)(Reviews);
