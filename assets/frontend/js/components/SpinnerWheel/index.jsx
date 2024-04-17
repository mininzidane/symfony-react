import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function SpinnerWheel({ className, style, size, thickness, color, isCentered }) {
  const classes = useStyles();
  const spinnerWheelClasses = classNames(classes.root, `is-${color}`, { 'is-centered': isCentered }, className);

  const negativeShift = -1 * (size / 2);
  const spinnerWheelStyles = {
    width: size,
    height: size,
    borderWidth: thickness,
    ...(isCentered && { marginTop: negativeShift, marginLeft: negativeShift }),
    ...style,
  };

  return <span className={spinnerWheelClasses} style={spinnerWheelStyles} />;
}

SpinnerWheel.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thickness: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  isCentered: PropTypes.bool,
};

SpinnerWheel.defaultProps = {
  color: 'blue',
  size: 20,
  thickness: 2,
  className: '',
  style: {},
  isCentered: false,
};

export default SpinnerWheel;
