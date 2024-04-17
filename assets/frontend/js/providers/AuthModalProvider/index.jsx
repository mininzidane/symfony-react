import React from 'react';
import PropTypes from 'prop-types';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Modal from './Modal';

function AuthModalProvider({ children }) {
  const { isAuthenticated } = useCustomerHelper();

  return (
    <>
      {!isAuthenticated && <Modal />}
      {children}
    </>
  );
}

AuthModalProvider.defaultProps = {
  children: null,
};

AuthModalProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthModalProvider;
