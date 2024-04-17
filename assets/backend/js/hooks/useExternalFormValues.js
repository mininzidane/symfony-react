import { useState } from 'react';

function useExternalFormValues(initialFormValues = {}) {
  const [formValues, setInternalValues] = useState(initialFormValues);

  function setFormValue(name, value) {
    const updatedValues = { ...formValues, [name]: value };
    setInternalValues(updatedValues);
  }

  function setFormValues(updatedFields = {}) {
    const updatedValues = { ...formValues, ...updatedFields };
    setInternalValues(updatedValues);
  }

  return { formValues, setFormValue, setFormValues };
}

export default useExternalFormValues;
