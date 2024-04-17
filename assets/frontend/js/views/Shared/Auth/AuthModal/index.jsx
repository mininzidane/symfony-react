import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ButtonCross from 'frontend/js/components/ButtonCross';
import LoginView from 'frontend/js/views/Shared/Auth/LoginView';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import ForgotPasswordView from 'frontend/js/views/Shared/Auth/ForgotPasswordView';
import Description from 'frontend/js/views/Shared/Auth/Description';

import useStyles from './useStyles';

function RegistrationModal({
  isOpen,
  onClose,
  onRegistrationSuccess,
  onSignInSuccess,
  isRegisterNowOpen,
  isDefaultTitles,
}) {
  const classes = useStyles();
  const intl = useIntl();
  const [isRegisterNowOpened, setIsRegisterNowOpened] = useState(isRegisterNowOpen);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const translations = {
    loginViewTitle: isDefaultTitles
      ? intl.formatMessage({ id: 'authComponents.signInView.title' })
      : intl.formatMessage({ id: 'authComponents.shared.title' }),
    loginViewSubtitle: isDefaultTitles ? '' : intl.formatMessage({ id: 'authComponents.shared.subtitle' }),
    registerViewTitle: isDefaultTitles
      ? intl.formatMessage({ id: 'authComponents.registerNowView.title' })
      : intl.formatMessage({ id: 'authComponents.shared.title' }),
    registerViewSubtitle: isDefaultTitles ? '' : intl.formatMessage({ id: 'authComponents.shared.subtitle' }),
  };

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} width={isRegisterNowOpened ? 850 : 500} className={classes.modal}>
      <div className={classes.root}>
        <ButtonCross isThin className={classes.cross} size={12} onClick={onClose} alt="Close modal window" />

        {isRegisterNowOpened && (
          <div className={classes.description}>
            <Description />
          </div>
        )}

        <div className={classes.form}>
          {isForgotPasswordOpen && (
            <ForgotPasswordView
              onSignInClick={() => {
                setIsRegisterNowOpened(false);
                setIsForgotPasswordOpen(false);
              }}
            />
          )}

          {!isForgotPasswordOpen && !isRegisterNowOpened && (
            <LoginView
              onSuccess={onSignInSuccess}
              onRegisterNowClick={(e) => {
                setIsRegisterNowOpened(true);
                e.preventDefault();
              }}
              onForgotPasswordClick={(e) => {
                setIsForgotPasswordOpen(true);
                e.preventDefault();
              }}
              title={translations.loginViewTitle}
              subtitle={translations.loginViewSubtitle}
            />
          )}

          {!isForgotPasswordOpen && isRegisterNowOpened && (
            <RegisterView
              onSuccess={onRegistrationSuccess}
              onSignInClick={(e) => {
                setIsRegisterNowOpened(false);
                e.preventDefault();
              }}
              title={translations.registerViewTitle}
              subtitle={translations.registerViewSubtitle}
            />
          )}
        </div>
      </div>
    </ModalWindow>
  );
}

RegistrationModal.defaultProps = {
  onClose: () => {},
};

RegistrationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onRegistrationSuccess: PropTypes.func.isRequired,
  onSignInSuccess: PropTypes.func.isRequired,
  isRegisterNowOpen: PropTypes.bool.isRequired,
  isDefaultTitles: PropTypes.bool.isRequired,
};
export default RegistrationModal;
