import { useRef } from 'react';

function useBillingInformationForm() {
  const formRef = useRef(null);

  function setForm(form) {
    formRef.current = form;
  }

  function submitForm() {
    return new Promise((resolve, reject) => {
      const form = formRef.current;

      if (!form) {
        resolve();
      }

      form
        .submitForm()
        .then(form.validateForm)
        .then((errors) => {
          const isValid = Object.keys(errors).length === 0;

          if (isValid) {
            resolve(form.values);
          } else {
            reject(errors);
          }
        })
        .catch(() => {
          reject();
        });
    });
  }

  function setFieldsError(errors) {
    const form = formRef.current;
    if (!form) {
      return;
    }
    Object.keys(errors).forEach((key) => {
      form.setFieldError(key, errors[key]);
      form.setFieldTouched(key, true, false);
    });
  }

  return [submitForm, setForm, setFieldsError];
}

export default useBillingInformationForm;
