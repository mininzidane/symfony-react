/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function Row({ label, value, condition, href, onBuyItNowButtonClick, isAbmInventory }) {
  const classes = useStyles();

  return condition ? (
    <a
      href={href}
      className={classnames(classes.root, isAbmInventory && 'is-abm-inventory')}
      onClick={onBuyItNowButtonClick}
    >
      <span className={classes.label}>{label}:</span>
      <strong className={classes.value}>{value}</strong>
    </a>
  ) : null;
}

export default Row;
