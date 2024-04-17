import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useSaleDateTimer from 'frontend/js/hooks/useSaleDateTimer';
import useStyles from './useStyles';

function SaleDateTimer({ date, className }) {
  const classes = useStyles();
  const { isTimeLeft, timeString } = useSaleDateTimer(date);

  return isTimeLeft ? <div className={classnames(classes.root, className)}>{timeString}</div> : null;
}

SaleDateTimer.propTypes = {
  className: PropTypes.string,
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
  className: null,
};

export default SaleDateTimer;
