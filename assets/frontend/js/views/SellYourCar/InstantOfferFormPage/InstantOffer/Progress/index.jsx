import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Progress({ step, totalSteps }) {
  const classes = useStyles();
  const width = step > totalSteps ? 100 : ((step - 1) * 100) / totalSteps;
  return (
    <div className={classes.root}>
      <div style={{ width: `${width}%` }} />
    </div>
  );
}

Progress.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default Progress;
