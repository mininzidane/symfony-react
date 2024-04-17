import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function RatingStars({ className, rating, color }) {
  const classes = useStyles();
  const filledStars = new Array(Math.floor(rating)).fill('');
  const hollowStars = new Array(Math.floor(5 - rating)).fill('');

  return (
    <div className={classnames(classes.root, className)}>
      {filledStars.map((_, index) => (
        <svg key={index} viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 0L30.8374 17.9656H49.7275L34.4451 29.0689L40.2824 47.0344L25 35.9311L9.71758 47.0344L15.5549 29.0689L0.272532 17.9656H19.1626L25 0Z"
            fill={color}
          />
        </svg>
      ))}
      {hollowStars.map((_, index) => (
        <svg key={index} viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M25 4.8541L29.4108 18.4291L29.7476 19.4656H30.8374H45.1109L33.5634 27.8554L32.6817 28.4959L33.0185 29.5324L37.4292 43.1074L25.8817 34.7176L25 34.077L24.1183 34.7176L12.5708 43.1074L16.9815 29.5324L17.3183 28.4959L16.4366 27.8554L4.88906 19.4656H19.1626H20.2524L20.5892 18.4291L25 4.8541Z"
            stroke={color}
            strokeWidth="3"
          />
        </svg>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

RatingStars.defaultProps = {
  className: '',
  color: '#FDB81E',
};

export default RatingStars;
