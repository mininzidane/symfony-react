import React from 'react';
import { PropTypes } from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function FeeRow({ label, value, isStrong, currency, currencySymbol, cents }) {
  if (value === 0) {
    return null;
  }

  const classes = useStyles();
  const formattedValue = NumberService.formatNumber(cents ? value / 100 : value);

  const outputValue = (
    <>
      {formattedValue < 0 ? `-${currencySymbol}${Math.abs(formattedValue)}` : `${currencySymbol}${formattedValue}`}{' '}
      <span>{currency}</span>
    </>
  );

  return (
    <div className={classes.root}>
      <div>{label}</div>
      <div>{isStrong ? <strong>{outputValue}</strong> : <>{outputValue}</>}</div>
    </div>
  );
}

FeeRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isStrong: PropTypes.bool,
  currencySymbol: PropTypes.string,
  currency: PropTypes.string,
  cents: PropTypes.bool,
};

FeeRow.defaultProps = {
  currencySymbol: '$',
  currency: 'USD',
  isStrong: false,
  cents: true,
};

export default FeeRow;
