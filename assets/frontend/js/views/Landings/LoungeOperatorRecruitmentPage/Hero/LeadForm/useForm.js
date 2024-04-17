import { useState } from 'react';
import { useFormik } from 'formik';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import validationSchema from './validationSchema';

function useForm({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const {
    firstName: customerFirstName,
    lastName: customerLastName,
    phoneNumber: customerPhoneNumber,
    email: customerEmail,
    countryId: customerCountryId,
  } = useCustomerHelper();

  function prevStep() {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  }

  function nextStep() {
    setActiveStep(activeStep + 1);
  }

  function handleNextForm(values) {
    setFormValues((val) => ({ ...val, ...values }));
    nextStep();
  }

  function handleSubmitForm(values) {
    const payload = { ...formValues, ...values };
    onSubmit(payload);
  }

  const forms = [
    useFormik({
      initialValues: {
        firstName: customerFirstName || '',
        lastName: customerLastName || '',
        phoneNumber: customerPhoneNumber || '',
        email: customerEmail || '',
        country: customerCountryId || '',
      },
      enableReinitialize: true,
      validationSchema: validationSchema[0],
      onSubmit: handleNextForm,
    }),
    useFormik({
      initialValues: {
        businessName: '',
        website: '',
        annualVolume: '',
        isCarsImporter: '1',
      },
      enableReinitialize: true,
      validationSchema: validationSchema[1],
      onSubmit: handleNextForm,
    }),
    useFormik({
      initialValues: {
        hasOffice: '1',
        officeAddress: '',
        officePhotos: [],
      },
      enableReinitialize: true,
      validationSchema: validationSchema[2],
      onSubmit: handleNextForm,
    }),
    useFormik({
      initialValues: {
        hasStaffing: '1',
        staffMembersInfo: '',
        additionalInfo: '',
      },
      enableReinitialize: true,
      validationSchema: validationSchema[3],
      onSubmit: handleSubmitForm,
    }),
  ];

  return {
    prevStep,
    activeStep,
    formik: forms[activeStep - 1],
  };
}

export default useForm;
