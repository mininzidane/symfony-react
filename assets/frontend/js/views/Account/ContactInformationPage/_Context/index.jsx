import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContactInformationContext from './ContactInformationContext';
import useContactInformationForm from './helpers/useForm';

const ContactInformationContextProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [submitForm, setForm, setFieldsError] = useContactInformationForm();

  return (
    <ContactInformationContext.Provider
      value={{
        form: {
          submit: submitForm,
          set: setForm,
        },
        error: {
          message: errMessage,
          setFields: setFieldsError,
          shown: error,
          show: (message) => {
            setErrMessage(message || '');
            setError(true);
          },
          hide: () => {
            setErrMessage('');
            setError(false);
          },
        },
        result,
        onSuccess: (data) => setResult({ data }),
      }}
    >
      {children}
    </ContactInformationContext.Provider>
  );
};

ContactInformationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContactInformationContextProvider;
