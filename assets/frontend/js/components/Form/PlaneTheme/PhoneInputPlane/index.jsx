import React from 'react';
import InputPlane from '../InputPlane';
import PhoneInput from '../../PhoneInput';

function PhoneInputPlane(props) {
  return <PhoneInput {...props} inputComponent={InputPlane} />;
}

export default PhoneInputPlane;
