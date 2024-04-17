import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function StepNumberLabel({ currentNumber, totalNumber }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {currentNumber} / {totalNumber}
    </div>
  );
}

StepNumberLabel.propTypes = {
  currentNumber: PropTypes.string.isRequired,
  totalNumber: PropTypes.number.isRequired,
};

export default StepNumberLabel;
