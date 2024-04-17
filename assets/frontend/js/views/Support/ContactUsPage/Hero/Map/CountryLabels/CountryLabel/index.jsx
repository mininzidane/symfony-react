/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function CountryLabel({ left, top, text, isVisible, scale, zoom }) {
  const classes = useStyles();
  const labelShiftMap = {
    '-2': -18,
    '-1': -7,
    0: 0,
    1: 5,
    2: 10,
    3: 12,
  };

  return (
    <div
      className={classnames(classes.root, 'country-label', isVisible && 'is-visible')}
      style={{ left, top, transform: `scale(${1 / scale})`, marginTop: labelShiftMap[zoom] }}
    >
      {text}
    </div>
  );
}

CountryLabel.propTypes = {};

export default CountryLabel;
