import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function LoadingOverlay({ width, blur, opacity, duration }) {
  const classes = useStyles();

  const style = {
    width,
    filter: `blur(${blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    animationDuration: `${duration}ms`,
  };

  return <div className={classes.root} style={style} />;
}

LoadingOverlay.propTypes = {
  width: PropTypes.number,
  blur: PropTypes.number,
  opacity: PropTypes.number,
  duration: PropTypes.number,
};

LoadingOverlay.defaultProps = {
  width: 75,
  blur: 30,
  opacity: 0.5,
  duration: 1500,
};

export default LoadingOverlay;
