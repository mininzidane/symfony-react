import React from 'react';
import PropTypes from 'prop-types';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import useStyles from './useStyles';

function Review({ photo, photo2x, name, rating, message }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        {photo && (
          <div className={classes.photo}>
            <img src={photo} srcSet={photo2x && `${photo}, ${photo2x} 2x `} alt={`Autobidmaster ${name} Review`} />
          </div>
        )}
        <div className={classes.info}>
          <div className={classes.rating}>
            <RatingStars rating={rating} color="#EA5507" />
          </div>
          <div className={classes.name}>{name}</div>
        </div>
      </div>
      <div className={classes.message}>{message}</div>
    </div>
  );
}

Review.defaultProps = {
  photo: '',
  photo2x: '',
};

Review.propTypes = {
  name: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  rating: PropTypes.number.isRequired,
  photo: PropTypes.string,
  photo2x: PropTypes.string,
};

export default Review;
