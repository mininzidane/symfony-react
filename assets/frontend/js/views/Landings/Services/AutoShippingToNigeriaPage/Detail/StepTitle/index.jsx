import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function StepTitle({ title, subtitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

StepTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default StepTitle;
