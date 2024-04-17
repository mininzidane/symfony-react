import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Benefit({ title, subtitle, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} className={classes.image} alt="Преимущество" />
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

Benefit.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Benefit;
