import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import BidderFormContext from './BidderFormContext';
import useBidderForm from './helpers/useForm';

const BidderFormContextProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [submitForm, setForm, setFieldsError] = useBidderForm();
  const [isFormShown, setIsFormShown] = useState(false);

  function handleSetIsFormShown(isShown) {
    setIsFormShown(isShown);
    setErrMessage('');
    setError(false);
    ScrollService.scrollToTop();
  }

  return (
    <BidderFormContext.Provider
      value={{
        content: {
          isFormShown,
          setIsFormShown: handleSetIsFormShown,
        },
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
        onSuccess: (data) => {
          setResult({ data });
          handleSetIsFormShown(false);
        },
      }}
    >
      {children}
    </BidderFormContext.Provider>
  );
};

BidderFormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BidderFormContextProvider;
