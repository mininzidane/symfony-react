import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Feature({ icon, text, alt }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.icon} src={icon} alt={alt} height="42" width="42" />
      <div className={classes.text} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Feature;
