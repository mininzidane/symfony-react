import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fade from 'frontend/js/components/Fade';
import STEPS from '../useInstantOffer/steps';
import Title from './Title';
import StepsForm from './StepsForm';
import Actions from './Actions';
import useStyles from './useStyles';

function Form({
  formik,
  instantOffer,
  activeStep,
  prevStep,
  isSubmitting,
  isDraftSubmitting,
  saveDraft,
  restart,
  onAccept,
}) {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(activeStep);

  function handleExited() {
    setCurrentStep(activeStep);
  }

  return (
    <div id="sell-your-car-lead-form">
      <div className={classes.root}>
        <div className={classes.form}>
          <Fade isOpen={activeStep === currentStep} duration={200} onUnmount={handleExited}>
            <div>
              {currentStep === STEPS.OFFER_CREATED ||
              currentStep === STEPS.ACCEPT_OFFER ||
              currentStep === STEPS.MISSING_OWNERSHIP_DOCUMENTS ? (
                <StepsForm instantOffer={instantOffer} step={currentStep} formik={formik} />
              ) : (
                <>
                  <div className={classes.header}>
                    <Title step={currentStep} />
                  </div>
                  <StepsForm className={classes.body} instantOffer={instantOffer} step={currentStep} formik={formik} />
                </>
              )}
            </div>
          </Fade>
          <Actions
            className={classes.actions}
            instantOffer={instantOffer}
            step={currentStep}
            prevStep={prevStep}
            formik={formik}
            isSubmitting={isSubmitting}
            isDraftSubmitting={isDraftSubmitting}
            saveDraft={saveDraft}
            restart={restart}
            onAccept={onAccept}
          />
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  instantOffer: PropTypes.object,
  formik: PropTypes.object.isRequired,
  activeStep: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  isDraftSubmitting: PropTypes.bool,
};

Form.defaultProps = {
  instantOffer: {},
  isSubmitting: false,
  isDraftSubmitting: false,
};

export default Form;
