import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Feature({ icon, text, alt }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={icon} alt={alt} height="42" width="42" />
      <div className={classes.text}>{text}</div>
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.node.isRequired,
  alt: PropTypes.node.isRequired,
};

export default Feature;
