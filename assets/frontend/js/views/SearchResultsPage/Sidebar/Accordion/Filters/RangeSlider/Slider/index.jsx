/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import MuiSlider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './useStyles';

const AirbnbSlider = withStyles({
  root: {
    color: '#2158F5',
    height: 1,
    padding: '10px 0',
  },
  thumb: {
    height: 17,
    width: 17,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -9,
    boxShadow: 'none !important',
  },
  active: {},
  track: {
    height: 1,
  },
  rail: {
    color: '#BBBBBB',
    opacity: 1,
    height: 1,
  },
})(MuiSlider);

function Slider({ minValue, setMinValue, maxValue, setMaxValue, minThreshold, maxThreshold }) {
  const classes = useStyles();

  function handleChange(_, newValue) {
    setMinValue(newValue[0]);
    setMaxValue(newValue[1]);
  }

  return (
    <div className={classes.root}>
      <AirbnbSlider
        value={[minValue, maxValue]}
        onChange={handleChange}
        min={minThreshold}
        max={maxThreshold}
        defaultValue={[minThreshold, maxThreshold]}
      />
    </div>
  );
}

export default Slider;
