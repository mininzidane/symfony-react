import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import RouterService from 'frontend/js/api/RouterService';
import prepareInstantOfferData from './prepareInstantOfferData';
import validationSchema from './validationSchema';
import STEPS from './steps';

const INITIAL_VALUES = {
  step: 2,

  // step 1
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',

  // step 2
  vin: '',
  year: '',
  make: '',
  model: '',

  damagesDescription: {},
  titleType: '',
  zip: '',
  wheelsAndTires: '',
  keys: '',
  conditionType: '',
  underTheHood: '',
  mileage: '',
  removedOrLooseExteriorPanels: '',
  bodyDamage: '',
  mirrorsGlassOrLightsDamage: '',
  floodOrFireDamage: '',

  photos: [],
  schedulePickUp: true,
  pickupAddress: '',
  pickupDate: '',
  pickupTime: '',
};

function useInstantOffer({ customerContacts, initialInstantOffer }) {
  const { TITLE_TYPE_LIST } = InstantOfferService;

  const [activeStep, setActiveStep] = useState(
    initialInstantOffer && !initialInstantOffer.isDraft ? STEPS.ACCEPT_OFFER : STEPS.VIN,
  );
  const [lastStep, setLastStep] = useState(activeStep);
  const [lastAdditionalStep, setLastAdditionalStep] = useState(STEPS.PHOTOS_ADDITIONAL);

  const [initialValues, setInitialValues] = useState(() => {
    const instantOfferValues = prepareInstantOfferData(initialInstantOffer) || {};
    return { ...INITIAL_VALUES, ...customerContacts, ...instantOfferValues };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSubmitting, setIsDraftSubmitting] = useState(false);

  const [instantOffer, setInstantOffer] = useState(initialInstantOffer);

  const { enqueueSnackbar } = useSnackbar();
  const intl = useIntl();
  const eventTrackingService = new EventTrackingService();

  function changeStep(step) {
    setActiveStep(step);
  }

  function prepareFormValues(values, isFormData = false) {
    const payload = { ...values };
    delete payload.step;
    delete payload.vinValid;
    delete payload.vinYMM;
    delete payload.unableToVerifyMileage;
    delete payload.damagesDescriptionTmp;
    payload.year = parseInt(payload.year, 10) || null;
    payload.mileage = parseFloat(payload.mileage) || null;
    payload.keys = payload.keys === '' ? null : payload.keys === '1';
    payload.carPaidOff = payload.carPaidOff === '' ? null : payload.carPaidOff === '1';
    payload.removedOrLooseExteriorPanels =
      payload.removedOrLooseExteriorPanels === '' ? null : payload.removedOrLooseExteriorPanels === '1';
    payload.mirrorsGlassOrLightsDamage =
      payload.mirrorsGlassOrLightsDamage === '' ? null : payload.mirrorsGlassOrLightsDamage === '1';
    payload.bodyDamage = (payload.bodyDamage !== '' && (payload.bodyDamage === '1' ? 'Yes' : 'No')) || null;
    payload.damagesDescription = values.damagesDescription ?? {};
    if (!payload.damagesDescription || Object.values(payload.damagesDescription).filter(Boolean).length === 0) {
      payload.damagesDescription = null;
    }

    if (isFormData) {
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === 'photos') {
          payload[key].forEach((file, i) => {
            formData.append(`photos_${i}`, file);
          });
        } else if (key === 'damagesDescription') {
          if (payload[key]) {
            Object.entries(payload[key]).forEach(([damageKey, value]) => {
              if (value) {
                formData.append(`damagesDescription[${damageKey}]`, value);
              }
            });
          } else {
            formData.append(`damagesDescription`, '');
          }
        } else {
          formData.append(key, payload[key]);
        }
      });
      return formData;
    }

    return payload;
  }

  async function submitForm(values) {
    setIsSubmitting(true);
    let data = null;
    try {
      const isInstantOfferCreated = Boolean(instantOffer?.ref);
      if (isInstantOfferCreated) {
        const formData = prepareFormValues(values, true);
        data = await InstantOfferService.updateInstantOffer(instantOffer?.ref, formData);
        setInstantOffer(data?.instantOffer);
      } else {
        const payload = prepareFormValues(values);
        data = await InstantOfferService.createInstantOffer(payload);
        setInstantOffer(data?.instantOffer);
      }
      // changeStep(activeStep + 1);
      changeStep(STEPS.ACCEPT_OFFER);
      const { hash, ref } = data?.instantOffer;
      window.history.pushState('', '', RouterService.getRoute('sellYourCarOffer', null, false, { ref, hash }));
      eventTrackingService.sendEvent({
        step: 'sell_your_car',
        substep: 'form_completed',
      });
    } catch (error) {
      const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(errors, { variant: 'error' });
    }
    setIsSubmitting(false);
  }

  async function instantOfferUpdate(values) {
    const formData = prepareFormValues(values, true);

    setIsSubmitting(true);
    try {
      const data = await InstantOfferService.updateInstantOffer(instantOffer?.ref, formData);
      changeStep(STEPS.ACCEPT_OFFER);
      setInstantOffer(data?.instantOffer);
    } catch (error) {
      const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(errors, { variant: 'error' });
    }
    setIsSubmitting(false);
  }

  async function handleNextForm(values) {
    if (activeStep === STEPS.VIN) {
      eventTrackingService.sendEvent({
        step: 'sell_your_car',
        custom1: 'Vehicle_Info',
      });
    }

    if (activeStep === STEPS.MILEAGE) {
      eventTrackingService.sendEvent({
        step: 'sell_your_car',
        custom2: 'Mileage',
      });
    }

    if (activeStep === STEPS.FLOOD_OR_FIRE_DAMAGE) {
      eventTrackingService.sendEvent({
        step: 'sell_your_car',
        custom3: 'Flood_Fire',
      });
    }

    if (activeStep === STEPS.FLOOD_OR_FIRE_DAMAGE) {
      if (!values.vinValid) {
        setLastAdditionalStep(STEPS.VIN_ADDITIONAL);
      }
      submitForm(values);
    } else if (activeStep === lastAdditionalStep) {
      instantOfferUpdate(values);
    } else if (activeStep === STEPS.TITLE_TYPE) {
      if (values.titleType === TITLE_TYPE_LIST.I_DO_NOT_HAVE_A_TITLE) {
        changeStep(STEPS.MISSING_OWNERSHIP_DOCUMENTS);
      } else if (values.titleType === TITLE_TYPE_LIST.CLEAN_TITLE) {
        changeStep(STEPS.CAR_PAID_OFF);
      } else {
        changeStep(STEPS.ZIP);
      }
    } else {
      changeStep(activeStep + 1);
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleNextForm,
  });

  function prevStep() {
    if (activeStep > 2) {
      // setActiveStep(activeStep === FINAL_STEP ? lastAdditionalStep : activeStep - 1);
      if (activeStep === STEPS.ACCEPT_OFFER) {
        setActiveStep(STEPS.FLOOD_OR_FIRE_DAMAGE);
      } else if (activeStep === STEPS.MISSING_OWNERSHIP_DOCUMENTS) {
        setActiveStep(STEPS.TITLE_TYPE);
      } else if (activeStep === STEPS.ZIP) {
        if (formik.values.titleType === TITLE_TYPE_LIST.CLEAN_TITLE) {
          setActiveStep(STEPS.CAR_PAID_OFF);
        } else {
          setActiveStep(STEPS.TITLE_TYPE);
        }
      } else {
        setActiveStep(activeStep - 1);
      }
    }
  }

  async function saveDraft() {
    const isInstantOfferCreated = Boolean(instantOffer?.ref);
    const payload = prepareFormValues(formik.values, isInstantOfferCreated);
    setIsDraftSubmitting(true);
    try {
      if (isInstantOfferCreated) {
        const data = await InstantOfferService.updateInstantOffer(instantOffer?.ref, payload);
        setInstantOffer(data?.instantOffer);
      } else {
        await InstantOfferService.saveDraft(payload);
      }
      enqueueSnackbar(
        <div>
          {intl.formatMessage(
            { id: 'sellYourCarPage.instantOffer.draftSaved' },
            { strong: (chunks) => <strong className="d-b">{chunks}</strong> },
          )}
        </div>,
        {
          variant: 'success',
        },
      );
    } catch (error) {
      const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(errors, { variant: 'error' });
    }
    setIsDraftSubmitting(false);
  }

  useEffect(() => {
    formik.setTouched({});
    formik.setFieldValue('step', activeStep);
    if (activeStep === STEPS.MISSING_OWNERSHIP_DOCUMENTS) {
      return;
    }
    if (lastStep < activeStep) {
      setLastStep(activeStep);
    }
  }, [activeStep]);

  function restart() {
    const { firstName, lastName, email, phoneNumber } = formik.values;
    setActiveStep(STEPS.VIN);
    setLastStep(STEPS.VIN);
    setLastAdditionalStep(STEPS.PHOTOS_ADDITIONAL);
    setInitialValues({ ...INITIAL_VALUES });
    setTimeout(() => {
      formik.handleReset();
      formik.setFieldValue('firstName', firstName);
      formik.setFieldValue('lastName', lastName);
      formik.setFieldValue('email', email);
      formik.setFieldValue('phoneNumber', phoneNumber);
      setInstantOffer(null);
    }, 400);
  }

  return {
    prevStep,
    changeStep,
    saveDraft,
    restart,
    setInstantOffer,
    activeStep,
    lastStep,
    totalSteps: STEPS.FLOOD_OR_FIRE_DAMAGE,
    formik,
    isSubmitting,
    isDraftSubmitting,
    instantOffer,
  };
}

export { STEPS };
export default useInstantOffer;
