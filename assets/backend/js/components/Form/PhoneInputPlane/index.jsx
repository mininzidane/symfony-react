import React from 'react';
import PhoneInput from 'backend/js/components/Form/PhoneInput';
import Input from 'backend/js/components/Form/Input';

function PhoneInputPlane(props) {
  return <PhoneInput {...props} inputComponent={Input} />;
}

export default PhoneInputPlane;
