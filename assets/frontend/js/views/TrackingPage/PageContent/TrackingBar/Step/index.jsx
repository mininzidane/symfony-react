/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Step1Svg from './img/step_1.svg';
import Step2Svg from './img/step_2.svg';
import Step3Svg from './img/step_3.svg';
import Step4Svg from './img/step_4.svg';
import CheckmarkSvg from './img/checkmark.svg';
import useStyles from './useStyles';

function Step({ isCompleted, isActive, stepNumber, isDone }) {
  const classes = useStyles();

  const iconMap = {
    1: Step1Svg,
    2: Step2Svg,
    3: Step3Svg,
    4: Step4Svg,
  };

  return (
    <div
      className={classnames(classes.root, isCompleted && 'is-completed', isActive && 'is-active', isDone && 'is-done')}
    >
      {isActive && stepNumber < 5 && <img src={iconMap[stepNumber]} alt="Icon" />}
      {isDone && <img src={CheckmarkSvg} alt="Icon" />}
    </div>
  );
}

export default Step;
