import React from 'react';
import PropTypes from 'prop-types';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import InspectionPreview from './InspectionPreview';
import Progress from './Progress';
import OfferDetails from './OfferDetails';
import LeadForm from './LeadForm';
import useInstantOffer from './useInstantOffer';

function InstantOffer({ customerContacts, initialInstantOffer }) {
  const {
    formik,
    activeStep,
    lastStep,
    totalSteps,
    restart,
    prevStep,
    changeStep,
    saveDraft,
    setInstantOffer,
    isSubmitting,
    isDraftSubmitting,
    instantOffer,
  } = useInstantOffer({ customerContacts, initialInstantOffer });

  function updateInstantOffer(data) {
    window.scroll(0, 0);
    setInstantOffer(data);
  }

  const { STATUSES } = InstantOfferService;
  const isOfferDetailsShown =
    Boolean(instantOffer?.acceptedPrice) ||
    [STATUSES.PENDING_REVIEW, STATUSES.SELLER_FEEDBACK].includes(instantOffer?.status);

  return (
    <>
      {isOfferDetailsShown ? (
        <>
          <InspectionPreview
            instantOffer={instantOffer}
            isInstantOfferAccepted
            formik={formik}
            changeStep={changeStep}
            lastStep={lastStep}
          />
          <OfferDetails instantOffer={instantOffer} updateInstantOffer={updateInstantOffer} />
        </>
      ) : (
        <>
          <Progress step={activeStep} totalSteps={totalSteps} />
          <InspectionPreview instantOffer={instantOffer} formik={formik} changeStep={changeStep} lastStep={lastStep} />
          <LeadForm
            formik={formik}
            activeStep={activeStep}
            changeStep={changeStep}
            lastStep={lastStep}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
            isDraftSubmitting={isDraftSubmitting}
            saveDraft={saveDraft}
            onAccept={updateInstantOffer}
            instantOffer={instantOffer}
            restart={restart}
          />
          <Contacts />
        </>
      )}
    </>
  );
}

InstantOffer.propTypes = {
  customerContacts: PropTypes.object,
  initialInstantOffer: PropTypes.object,
};

InstantOffer.defaultProps = {
  customerContacts: {},
  initialInstantOffer: null,
};

export default InstantOffer;
