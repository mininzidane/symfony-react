import React from 'react';
import PropTypes from 'prop-types';
import useSaleDateTimer from 'frontend/js/hooks/useSaleDateTimer';
import useStyles from './useStyles';

function SaleDateTimer({ date }) {
  const classes = useStyles();
  const { isTimeLeft, timeString } = useSaleDateTimer(date);

  return isTimeLeft ? <div className={classes.root}>{timeString}</div> : null;
}

SaleDateTimer.propTypes = {
  date: PropTypes.shape({
    dashArray: PropTypes.number,
    isTimeLeft: PropTypes.bool,
    d: PropTypes.number,
    h: PropTypes.number,
    m: PropTypes.number,
    s: PropTypes.number,
    progress: PropTypes.number,
    liveLink: PropTypes.string,
  }),
};

SaleDateTimer.defaultProps = {
  date: {},
};

export default SaleDateTimer;
