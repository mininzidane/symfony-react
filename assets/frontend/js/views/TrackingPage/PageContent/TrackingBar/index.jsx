/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';
import Step from './Step';

function TrackingBar({ step }) {
  const classes = useStyles();
  const isAllCompleted = step === 5;

  const widthMap = {
    1: '12.5%',
    2: '37.5%',
    3: '62.5%',
    4: '87.5%',
    5: '0',
  };

  return (
    <Container>
      <div className={classes.root}>
        {isAllCompleted ? (
          <>
            <div className={classes.allCompletedBar} />
            <Step stepNumber={1} isDone />
            <Step stepNumber={2} isDone />
            <Step stepNumber={3} isDone />
            <Step stepNumber={4} isDone />
            <Step stepNumber={5} isDone />
          </>
        ) : (
          <>
            <Step stepNumber={1} isCompleted={step >= 1} isActive={step === 1} />
            <Step stepNumber={2} isCompleted={step >= 2} isActive={step === 2} />
            <Step stepNumber={3} isCompleted={step >= 3} isActive={step === 3} />
            <Step stepNumber={4} isCompleted={step >= 4} isActive={step === 4} />
            <Step stepNumber={5} isCompleted={step >= 5} isActive={step === 5} />
            <div className={classes.bar} />
            <div className={classes.completedBar} style={{ width: widthMap[step] }} />
          </>
        )}
      </div>
    </Container>
  );
}

export default TrackingBar;
