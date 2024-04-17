import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';

import useStyles from './useStyles';
import GeneralNotification from './GeneralNotification';
import CA2CANotification from './CA2CANotification';
import AuctionsTextAlert from './AuctionsTextAlert';

function SiteNotifications() {
  const LOCAL_STORAGE_KEY = 'Abm::RemovedNotifications';
  const REVEAL_DELAY_TIMEOUT = 500;
  const classes = useStyles();
  const [isRevealed, setRevealed] = useState(false);
  const [isGeneralShown, setGeneralShown] = useState(false);
  const [isCA2CAShown, setCA2CAShown] = useState(false);
  const [isAuctionsTextAlertShown, setAuctionsTextAlertShown] = useState(false);
  const { isSimpleLayout } = window;

  function dispatchSiteNotificationsEvent(isShown) {
    window.dispatchEvent(new CustomEvent('SiteNotifications', { detail: { isShown } }));
  }

  useEffect(() => {
    const isAnyShown = isGeneralShown || isCA2CAShown || isAuctionsTextAlertShown;

    dispatchSiteNotificationsEvent(isAnyShown);
  }, [isGeneralShown, isAuctionsTextAlertShown]);

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
      <GeneralNotification onShow={() => setGeneralShown(true)} onHide={() => setGeneralShown(false)} />
      <CA2CANotification
        onShow={() => setCA2CAShown(true)}
        onHide={() => setCA2CAShown(false)}
        localStorageKey={LOCAL_STORAGE_KEY}
      />
      <AuctionsTextAlert
        onShow={() => setAuctionsTextAlertShown(true)}
        onHide={() => setAuctionsTextAlertShown(false)}
      />
    </div>
  );
}

const $el = document.getElementById('site-notifications');

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
