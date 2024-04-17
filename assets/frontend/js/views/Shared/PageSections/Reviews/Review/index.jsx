import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import useStyles from './useStyles';

function Review({ className, photo, photo2x, name, rating, message }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.details}>
        {photo && (
          <div className={classes.photo}>
            <img
              src={photo}
              srcSet={photo2x && `${photo}, ${photo2x} 2x `}
              alt={`Autobidmaster ${name} Review`}
              width={42}
              height={42}
            />
          </div>
        )}
        <div className={classes.info}>
          <div className={classes.name}>{name}</div>
          <RatingStars className={classes.ratingStars} rating={rating} color="#EA5507" />
          <div className={classes.ratingHint}>
            <FormattedMessage id="testimonialsPage.rating.starsCount" values={{ count: rating }} />
          </div>
        </div>
      </div>
      <p className={classes.message}>{message}</p>
    </div>
  );
}

Review.defaultProps = {
  photo: '',
  photo2x: '',
  className: '',
};

Review.propTypes = {
  name: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  rating: PropTypes.number.isRequired,
  photo: PropTypes.string,
  photo2x: PropTypes.string,
  className: PropTypes.string,
};

export default Review;
