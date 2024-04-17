import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import ButtonCross from 'frontend/js/components/ButtonCross';
import RouterService from 'frontend/js/api/RouterService';
import WalletSvg from './img/wallet.svg';
import useStyles from './useStyles';

function BuyerPowerNotification({ data, token, hideNotification }) {
  const classes = useStyles();
  const [isRevealed, setIsRevealed] = useState(false);

  function handleClose() {
    setIsRevealed(false);
    setTimeout(() => hideNotification(token), 300);
  }

  function onClick() {
    setIsRevealed(false);
    hideNotification(token);
    RouterService.redirect('buyerPower');
  }

  useEffect(() => {
    const NOTIFICATION_REVEAL_TIMEOUT = 1000;
    setTimeout(() => setIsRevealed(true), NOTIFICATION_REVEAL_TIMEOUT);
  }, []);

  const { amount } = data;

  return (
    <div className={classnames(classes.root, 'NOTIFICATION', 'customer-notification', { 'is-revealed': isRevealed })}>
      <ButtonCross size={10} isThin color="white" className={classes.closeButton} onClick={handleClose} />
      <div className={classes.icon}>
        <img src={WalletSvg} alt="Wallet" />
      </div>
      <div className={classes.title}>
        <FormattedMessage id="customerNotifications.youBuyerPowerHasBeenIncreased" />
        <div>+{NumberService.formatCurrency(amount)} USD</div>
      </div>

      <div className={classes.ctaContainer}>
        <ButtonOutlined
          label={<FormattedMessage id="shared.cta.viewNow" />}
          onClick={onClick}
          color="white"
          size="sm"
          isThinBorder
          isRegularCase
          isSquared
        />
        <button type="button" className={classes.dontShowCta} onClick={handleClose}>
          <FormattedMessage id="videoGuidesNotification.dontShowAgain" />
        </button>
      </div>
    </div>
  );
}

BuyerPowerNotification.propTypes = {
  data: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  hideNotification: PropTypes.func.isRequired,
};

export default BuyerPowerNotification;
