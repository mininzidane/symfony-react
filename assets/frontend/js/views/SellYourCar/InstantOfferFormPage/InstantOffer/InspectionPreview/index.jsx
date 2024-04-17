/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import InspectionPreviewTrigger from './InspectionPreviewTrigger';
import InspectionPreviewContent from './InspectionPreviewContent';
import useStyles from './useStyles';

function InspectionPreview({ formik, changeStep, lastStep, instantOffer, isInstantOfferAccepted }) {
  const ANIMATION_DURATION = 300;
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  function handleTriggerClick() {
    setIsOpen(!isOpen);
  }

  function handleChangeStep(step) {
    changeStep(step);
    setIsOpen(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Collapse in={isOpen} timeout={ANIMATION_DURATION}>
          <InspectionPreviewContent
            className={classes.steps}
            formik={formik}
            changeStep={handleChangeStep}
            lastStep={lastStep}
            instantOffer={instantOffer}
          />
        </Collapse>
        <InspectionPreviewTrigger
          instantOfferRef={instantOffer?.ref}
          onClick={handleTriggerClick}
          isActive={isOpen}
          duration={ANIMATION_DURATION}
        />
      </div>
    </div>
  );
}

InspectionPreview.propTypes = {
  formik: PropTypes.object.isRequired,
  changeStep: PropTypes.func.isRequired,
  lastStep: PropTypes.number.isRequired,
  instantOffer: PropTypes.object,
  isInstantOfferAccepted: PropTypes.bool,
};

InspectionPreview.defaultProps = {
  instantOffer: null,
  isInstantOfferAccepted: false,
};

export default InspectionPreview;
