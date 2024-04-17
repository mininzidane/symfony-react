import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';
import Step from './Step';

function TrackingBar({ step, className }) {
  const classes = useStyles();

  const widthMap = {
    1: '12.5%',
    2: '37.5%',
    3: '62.5%',
    4: '86.5%',
    5: '86.5%', // 5th step is hidden, it is displayed as the 4th step is not active
    6: '100%',
  };

  return (
    <div className={classnames(classes.root, className)}>
      <Step stepNumber={1} isCompleted={step >= 1} isActive={step === 1} />
      <Step stepNumber={2} isCompleted={step >= 2} isActive={step === 2} />
      <Step stepNumber={3} isCompleted={step >= 3} isActive={step === 3} />
      <Step stepNumber={4} isCompleted={step >= 4} isActive={step === 4} />
      <Step stepNumber={6} isCompleted={step >= 6} isActive={step === 6} isLast />
      <div className={classes.bar} />
      <div className={classes.completedBar} style={{ width: widthMap[step] }} />
    </div>
  );
}

TrackingBar.propTypes = {
  step: PropTypes.number.isRequired,
  className: PropTypes.string,
};

TrackingBar.defaultProps = {
  className: '',
};

export default TrackingBar;
