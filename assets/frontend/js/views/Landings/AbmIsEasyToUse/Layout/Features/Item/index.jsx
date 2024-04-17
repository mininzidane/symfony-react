import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Item({ imgSrc, title, description }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.imgWrapper}>
        <img src={imgSrc} alt={title} />
      </div>
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.description}>{description}</p>
    </div>
  );
}

Item.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  description: PropTypes.string.isRequired,
};

export default Item;
