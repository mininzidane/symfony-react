import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Card({ className, label, caption, description }) {
  const classes = useStyles();
  return (
    <div className={classnames(classes.root, className)} data-is-reveal-on-scroll>
      <div className={classes.label}>{label}</div>
      <div className={classes.caption}>{caption}</div>
      <p>{description}</p>
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
};

export default Card;
