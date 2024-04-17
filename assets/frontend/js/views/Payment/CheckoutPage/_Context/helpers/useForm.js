import { useRef } from 'react';

function useCheckoutForm() {
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
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  }

  return [submitForm, setForm];
}

export default useCheckoutForm;
