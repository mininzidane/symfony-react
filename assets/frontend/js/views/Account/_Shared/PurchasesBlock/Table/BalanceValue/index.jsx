/* eslint-disable react/prop-types */
import React from 'react';
import classanames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function BalanceValue({ value }) {
  const { formatCurrency } = NumberService;
  const classes = useStyles();

  return (
    <span className={classanames(classes.root, { 'is-highlighted': Boolean(parseFloat(value)) })}>
      {formatCurrency(value, 'USD', true)}
    </span>
  );
}

BalanceValue.propTypes = {};

export default BalanceValue;
