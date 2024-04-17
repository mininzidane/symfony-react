import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import BackgroundPng from './img/bg.png';
import BackgroundMobilePng from './img/bg-mobile.png';
import useStyles from './useStyles';

function Hero({ loading, averageRating, total }) {
  const classes = useStyles();

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{
        xl_x1: BackgroundPng,
        sm_x1: BackgroundMobilePng,
        color: '#5967B3',
      }}
      isBeyondBackground
    >
      <div itemScope="" itemType="http://schema.org/Organization">
        <div
          className={classes.content}
          itemProp="aggregateRating"
          itemScope=""
          itemType="http://schema.org/AggregateRating"
        >
          <RatingStars className={classes.stars} rating={5} />
          <div className={classes.title}>
            <FormattedMessage id="testimonialsPage.averageRating" />{' '}
            {loading ? (
              <SpinnerWheel color="white" size={28} thickness={4} />
            ) : (
              <span itemProp="ratingValue">{averageRating.toFixed(1)}</span>
            )}
          </div>
          <div className={classes.subtitle}>
            <FormattedMessage
              id="testimonialsPage.basedOn"
              values={{
                total: loading ? (
                  <SpinnerWheel color="white" size={18} thickness={1} />
                ) : (
                  <span itemProp="ratingCount">{total}</span>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </ContainerFullScreen>
  );
}

Hero.propTypes = {
  loading: PropTypes.bool,
  averageRating: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

Hero.defaultProps = {
  loading: false,
};

export default Hero;
