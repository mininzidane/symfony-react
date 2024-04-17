/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function ProductCard({ label, price }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{label}</span>
      <span>{price}</span>
    </div>
  );
}

export default ProductCard;
