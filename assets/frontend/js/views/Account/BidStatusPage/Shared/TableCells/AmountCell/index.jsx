/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';

function AmountCell({ value, emptyValue, hasCurrency, hasPaddingLeft, isFontWeightNormal, className }) {
  const nullValue = emptyValue !== undefined ? emptyValue : '—';
  const classes = useStyles({ hasPaddingLeft, isFontWeightNormal });

  return value !== null ? (
    <span className={classnames(classes.root, className)}>
      <Amount hasCurrency={hasCurrency} value={value} />
    </span>
  ) : (
    nullValue
  );
}

export default AmountCell;
