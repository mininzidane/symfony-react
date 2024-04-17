/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function FeeRow({ label, value, currency, className }) {
  const classes = useStyles();

  if (value <= 0) {
    return null;
  }

  return (
    <div className={classnames(classes.root, className)}>
      <div>{label}</div>
      <div>
        {NumberService.formatCurrency(value, currency)} {currency}
      </div>
    </div>
  );
}

export default FeeRow;
