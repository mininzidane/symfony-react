import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function ProgressBar({ doneCount, totalCount }) {
  const classes = useStyles();
  const widthPercentage = (doneCount / totalCount) * 100;

  return (
    <div className={classes.root}>
      <div className={classes.fill} style={{ width: `${widthPercentage}%` }} />
    </div>
  );
}

ProgressBar.propTypes = {
  doneCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default ProgressBar;
