import React from 'react';
import PropTypes from 'prop-types';

import Image from 'frontend/js/components/Image';

import useStyles from './useStyles';

function Item({ srcSet, title, priceNew, priceUsed, priceAbm, width, imgHeight, left, right, zIndex, labelOffset }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ left, right, zIndex }}>
      <div className={classes.imgWrapper} style={{ width }}>
        <Image src={srcSet[0]} srcSet={`${srcSet[0]}, ${srcSet[1]} 2x`} alt={title} height={imgHeight} />
      </div>
      <div className={classes.table} style={{ left: labelOffset }}>
        <h4 className={classes.title}>{title}</h4>
        <ul className={classes.prices}>
          <li>
            NEW <span className={classes.priceNew}>{priceNew}</span>
          </li>
          <li>
            USED <span className={classes.priceUsed}>{priceUsed}</span>
          </li>
          <li style={{ fontWeight: 700 }}>
            ABM <span className={classes.priceAbm}>{priceAbm}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

Item.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
  imgHeight: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  labelOffset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  srcSet: PropTypes.array.isRequired,
  priceNew: PropTypes.string.isRequired,
  priceUsed: PropTypes.string.isRequired,
  priceAbm: PropTypes.string.isRequired,
};

Item.defaultProps = {
  width: 300,
  left: 'initial',
  right: 'initial',
  zIndex: 0,
  labelOffset: 'initial',
};

export default Item;
