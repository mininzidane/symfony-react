import React from 'react';
import PropTypes from 'prop-types';
import STEPS from '../../useInstantOffer/steps';
import useOption from './useOptions';
import ContactInfoForm from './ContactInfoForm';
import VinForm from './VinForm';
import ZipForm from './ZipForm';
import WheelsAndTiresForm from './WheelsAndTiresForm';
import RadioGroupForm from './RadioGroupForm';
import MileageForm from './MileageForm';
import InstantOffer from './InstantOffer';
import PhotosForm from './PhotosForm';
import MissingOwnershipDocuments from './MissingOwnershipDocuments';

function StepsForm({ className, step, formik, instantOffer }) {
  const {
    onChangeMake,
    yearOptions,
    makeOptions,
    modelOptions,
    titleTypesOptions,
    conditionsOptions,
    yesNoOptions,
    wheelsOptions,
    underTheHoodOptions,
    floodAndFireOptions,
    damageOptions,
  } = useOption({ make: formik.values.make });

  return (
    <div className={className}>
      {step === STEPS.CONTACTS && <ContactInfoForm formik={formik} />}
      {step === STEPS.VIN && (
        <VinForm
          formik={formik}
          onChangeMake={onChangeMake}
          yearOptions={yearOptions}
          makeOptions={makeOptions}
          modelOptions={modelOptions}
          hasYMM
        />
      )}
      {step === STEPS.TITLE_TYPE && <RadioGroupForm formik={formik} name="titleType" options={titleTypesOptions} />}
      {step === STEPS.CAR_PAID_OFF && <RadioGroupForm formik={formik} name="carPaidOff" options={yesNoOptions} />}
      {step === STEPS.ZIP && <ZipForm formik={formik} />}
      {step === STEPS.WHEELS_AND_TIRES && (
        <WheelsAndTiresForm formik={formik} name="wheelsAndTires" options={wheelsOptions} />
      )}
      {step === STEPS.KEYS && <RadioGroupForm formik={formik} name="keys" options={yesNoOptions} />}
      {step === STEPS.CONDITION_TYPE && (
        <RadioGroupForm formik={formik} name="conditionType" options={conditionsOptions} />
      )}
      {step === STEPS.UNDER_THE_HOOD && (
        <RadioGroupForm formik={formik} name="underTheHood" options={underTheHoodOptions} hasDamagesDescription />
      )}
      {step === STEPS.MILEAGE && <MileageForm formik={formik} />}
      {step === STEPS.REMOVED_OR_LOOSE_EXTERIOR_PANELS && (
        <RadioGroupForm
          formik={formik}
          name="removedOrLooseExteriorPanels"
          options={damageOptions}
          hasDamagesDescription
        />
      )}
      {step === STEPS.BODY_DAMAGE && (
        <RadioGroupForm formik={formik} name="bodyDamage" options={damageOptions} hasDamagesDescription />
      )}
      {step === STEPS.MIRRORS_GLASS_OR_LIGHTS_DAMAGE && (
        <RadioGroupForm
          formik={formik}
          name="mirrorsGlassOrLightsDamage"
          options={damageOptions}
          hasDamagesDescription
        />
      )}
      {step === STEPS.FLOOD_OR_FIRE_DAMAGE && (
        <RadioGroupForm formik={formik} name="floodOrFireDamage" options={floodAndFireOptions} />
      )}
      {step === STEPS.OFFER_CREATED && <InstantOffer formik={formik} instantOffer={instantOffer} />}
      {step === STEPS.PHOTOS_ADDITIONAL && <PhotosForm formik={formik} />}
      {step === STEPS.VIN_ADDITIONAL && <VinForm formik={formik} />}
      {step === STEPS.ACCEPT_OFFER && <InstantOffer formik={formik} instantOffer={instantOffer} isFinal />}
      {step === STEPS.MISSING_OWNERSHIP_DOCUMENTS && <MissingOwnershipDocuments />}
    </div>
  );
}

StepsForm.propTypes = {
  instantOffer: PropTypes.object,
  className: PropTypes.string,
  step: PropTypes.number.isRequired,
  formik: PropTypes.object,
};

StepsForm.defaultProps = {
  instantOffer: {},
  formik: {},
  className: '',
};

export default StepsForm;
