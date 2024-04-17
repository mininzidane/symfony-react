import React from 'react';
import PropTypes from 'prop-types';
import StepPinSvg from './img/step-pin.svg';

function StepPin({ className }) {
  return <img className={className} width="25px" height="25px" src={StepPinSvg} alt="Step Pin" />;
}

StepPin.propTypes = {
  className: PropTypes.string.isRequired,
};

export default StepPin;
