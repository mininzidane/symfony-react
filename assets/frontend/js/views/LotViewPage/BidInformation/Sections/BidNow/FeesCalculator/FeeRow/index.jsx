import React from 'react';
import { PropTypes } from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function FeeRow({ label, value, isStrong, currency, currencySymbol }) {
  const classes = useStyles();
  const outputValue = (
    <>
      {currencySymbol}
      {NumberService.formatNumber(value)} <span>{currency}</span>
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
};

FeeRow.defaultProps = {
  currencySymbol: '$',
  currency: 'USD',
  isStrong: false,
};

export default FeeRow;
