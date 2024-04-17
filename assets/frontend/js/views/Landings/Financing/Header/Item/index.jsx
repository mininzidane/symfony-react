import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Item({ img, alt, text }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.img}>
        <img src={img} alt={alt} />
      </div>
      <div className={classes.text}>{text}</div>
    </div>
  );
}

Item.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default Item;
