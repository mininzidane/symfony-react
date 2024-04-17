import { useRef } from 'react';

function useBidderForm() {
  const formRef = useRef(null);
  const docFormRef = useRef(null);

  function setForm(form, key) {
    if (key === 'doc') {
      docFormRef.current = form;
    } else {
      formRef.current = form;
    }
  }

  function submitForm() {
    return new Promise((resolve, reject) => {
      const form = formRef.current;
      const docForm = docFormRef.current;

      if (!form || !docForm) {
        resolve();
      }

      form
        .submitForm()
        .then(form.validateForm)
        .then((errors) => {
          const isValid = Object.keys(errors).length === 0;

          docForm
            .submitForm()
            .then(docForm.validateForm)
            .then((errorsDoc) => {
              const isValidDoc = Object.keys(errorsDoc).length === 0;

              if (isValid && isValidDoc) {
                resolve({ values: form.values, files: docForm.values });
              } else {
                reject();
              }
            })
            .catch(() => {
              reject();
            });
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

export default useBidderForm;
