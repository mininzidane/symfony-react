import React, { useEffect, useState, Suspense } from 'react';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';

const AuthModal = React.lazy(() => import('frontend/js/views/Shared/Auth/AuthModal'));

function Modal() {
  const ga = new GoogleAnalyticsService();

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterNowOpen, setIsRegisterNowOpen] = useState(true);
  const [isDefaultTitles, setIsDefaultTitles] = useState(false);

  function handleOpen(e) {
    setIsDefaultTitles(false);

    if (e && e.detail) {
      if (e.detail.tab && e.detail.tab === 'signIn') {
        setIsRegisterNowOpen(false);
      }

      if (e.detail.tab && e.detail.tab === 'register') {
        setIsRegisterNowOpen(true);
      }

      if (e.detail.isDefaultTitles) {
        setIsDefaultTitles(true);
      }
    }

    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleRegistrationSuccess() {
    ga.sendEvent('submit', 'sendform', 'registration');

    RouterService.reload();
  }

  function handleSignInSuccess() {
    RouterService.reload();
  }

  useEffect(() => {
    if (RouterService.getQueryParam('registration_modal')) {
      setIsOpen(true);
      setIsDefaultTitles(true);
    }

    window.addEventListener('openAuthModal', handleOpen);

    return () => window.removeEventListener('openAuthModal', handleOpen);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AuthModal
        onRegistrationSuccess={handleRegistrationSuccess}
        onSignInSuccess={handleSignInSuccess}
        isOpen
        onClose={handleClose}
        isRegisterNowOpen={isRegisterNowOpen}
        isDefaultTitles={isDefaultTitles}
      />
    </Suspense>
  );
}

export default Modal;
