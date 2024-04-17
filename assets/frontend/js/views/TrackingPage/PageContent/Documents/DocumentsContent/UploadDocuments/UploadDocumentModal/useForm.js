import { useState, useRef } from 'react';

function useForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidForm, setIsValidForm] = useState(false);
  const [submitError, setSubmitError] = useState(null);
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

  return {
    isSubmitting,
    isValidForm,
    submitError,
    setSubmitError,
    setIsValidForm,
    setForm,
    setIsSubmitting,
    submitForm,
  };
}

export default useForm;
