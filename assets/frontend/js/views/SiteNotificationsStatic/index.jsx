import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';

import useStyles from './useStyles';
import SecurityDepositNotification from './SecurityDepositNotification';

// used for static notifications under header without close option
function SiteNotifications() {
  const REVEAL_DELAY_TIMEOUT = 500;
  const classes = useStyles();
  const [isRevealed, setRevealed] = useState(false);
  const [isSecurityDepositShown, setSecurityDepositShown] = useState(false);
  const { isSimpleLayout } = window;

  function dispatchSiteNotificationsEvent(isShown) {
    window.dispatchEvent(new CustomEvent('SiteNotifications', { detail: { isShown } }));
  }

  useEffect(() => {
    dispatchSiteNotificationsEvent(isSecurityDepositShown);
  }, [isSecurityDepositShown]);

  // Reveal after timeout to let header assets load
  useEffect(() => {
    setTimeout(() => {
      setRevealed(true);
    }, REVEAL_DELAY_TIMEOUT);
  }, []);

  if (isSimpleLayout || !isRevealed) {
    return null;
  }

  return (
    <div className={classNames(classes.root, 'NOTIFICATION')}>
      <SecurityDepositNotification onShow={() => setSecurityDepositShown(true)} />
    </div>
  );
}

const $el = document.getElementById('static-site-notifications');

if ($el) {
  ReactDOM.render(
    <ThemeProvider>
      <TranslationProvider>
        <SiteNotifications />
      </TranslationProvider>
    </ThemeProvider>,
    $el,
  );
}

export default SiteNotifications;
