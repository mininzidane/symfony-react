import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Triangle({ type, size, color, className, isFlipped }) {
  const classes = useStyles({ size, color });

  return <div className={classnames(classes.root, className, `is-${type}`, isFlipped && 'is-flipped')} />;
}

Triangle.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  isFlipped: PropTypes.bool,
};

Triangle.defaultProps = {
  type: 'vertical',
  className: '',
  color: '#333',
  size: 4,
  isFlipped: false,
};

export default Triangle;
