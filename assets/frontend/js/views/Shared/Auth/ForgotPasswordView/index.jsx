import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import Success from './Success';

function ForgotPasswordView({ onSignInClick }) {
  const [sendedEmail, setSendedEmail] = useState('');
  const [showSuccessState, setShowSuccessState] = useState(false);

  if (showSuccessState) {
    return <Success sendedEmail={sendedEmail} onSignInClick={onSignInClick} />;
  }

  return (
    <Form setShowSuccessState={setShowSuccessState} setSendedEmail={setSendedEmail} onSignInClick={onSignInClick} />
  );
}

ForgotPasswordView.propTypes = {
  onSignInClick: PropTypes.func,
};

ForgotPasswordView.defaultProps = {
  onSignInClick: () => {},
};

export default ForgotPasswordView;
