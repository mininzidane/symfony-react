import React from 'react';
import PropTypes from 'prop-types';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

function Form({ formik, activeStep }) {
  if (activeStep === 1) {
    return <Step1Form formik={formik} />;
  }

  if (activeStep === 2) {
    return <Step2Form formik={formik} />;
  }

  if (activeStep === 3) {
    return <Step3Form formik={formik} />;
  }

  if (activeStep === 4) {
    return <Step4Form formik={formik} />;
  }

  return null;
}

Form.propTypes = {
  formik: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
};

export default Form;
