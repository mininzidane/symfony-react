import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BillingInformationContext from './BillingInformationContext';
import useBillingInformationForm from './helpers/useForm';
import useCreditCards from './helpers/useCreditCards';
import useCreditCard from './helpers/useCreditCard';

const BillingInformationContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [cardToken, setCardToken] = useState('');
  const [allCreditCards, setAllCreditCards] = useState([]);
  const [view, setView] = useState('list'); // form, list
  const [getCreditCards, creditCards, isLoadingCreditCards] = useCreditCards();
  const [getCreditCard, creditCard, isLoadingCreditCard] = useCreditCard(cardToken);
  const [submitForm, setForm, setFieldsError] = useBillingInformationForm();

  function handleSetView(type, token = '') {
    setView(type);
    setCardToken(token);
    if (error) {
      setError(false);
      setErrMessage('');
    }
    window.scroll(0, 0);
  }

  useEffect(() => {
    if (view === 'list') {
      getCreditCards();
    }
  }, [view]);

  useEffect(() => {
    if (cardToken) {
      getCreditCard();
    }
  }, [cardToken]);

  useEffect(() => {
    setAllCreditCards(creditCards);
  }, [creditCards]);

  return (
    <BillingInformationContext.Provider
      value={{
        view,
        setView: handleSetView,
        paymentCards: {
          setAllCreditCards,
          creditCards: allCreditCards,
          isLoading: isLoadingCreditCards,
        },
        form: {
          cardToken,
          creditCard,
          isLoading: isLoadingCreditCard,
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
        onSuccess: () => handleSetView('list'),
      }}
    >
      {children}
    </BillingInformationContext.Provider>
  );
};

BillingInformationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BillingInformationContextProvider;
