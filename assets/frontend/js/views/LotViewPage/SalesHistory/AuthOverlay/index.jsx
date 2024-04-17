import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SalesHistorySvg from './img/sales-history.svg';
import SalesHistoryDesktopPng from './img/sales-history-desktop.png';
import SalesHistoryMobilePng from './img/sales-history-mobile.png';
import useStyles from './useStyles';

function AuthOverlay() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  function handleClick() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  return (
    <div className={classes.root}>
      <img className={classes.image} src={isBelowSm ? SalesHistoryMobilePng : SalesHistoryDesktopPng} alt="Demo" />

      <div className={classes.overlay}>
        <img src={SalesHistorySvg} alt="Sales history" />
        <div className={classes.message}>
          <FormattedMessage
            id="lotPage.salesHistory.authOverlayMessage"
            values={{
              button: (chunks) => (
                <button type="button" className={classes.button} onClick={handleClick}>
                  {chunks}
                </button>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;
