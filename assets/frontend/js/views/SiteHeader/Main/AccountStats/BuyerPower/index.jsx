import React, { useEffect } from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useToolbarBuyerPower from 'frontend/js/hooks/useToolbarBuyerPower';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import t from 'frontend/js/api/TranslatorService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import WalletIcon from './WalletIcon';
import useStyles from '../useStyles';

function BuyerPower() {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();

  const { buyerPowerAmount, isBadgeShown } = useToolbarBuyerPower();
  const eventTrackingService = new EventTrackingService();
  const { getRoute } = RouterService;
  const { formatCurrency } = NumberService;

  const handleClick = () => {
    eventTrackingService.sendEvent({ name: 'buyer_power_icon_click', step: 'abm_signed_up_user' });
  };

  useEffect(() => {
    LocalStorageService.get();
  }, []);

  return (
    <a
      href={getRoute('buyerPower')}
      className={classnames(classes.link, classes.section)}
      aria-label={t('header.buyer_power')}
      onClick={handleClick}
    >
      <div className={classes.icon}>
        <WalletIcon />

        {isBadgeShown && <div className={classes.badge}>!</div>}
      </div>

      {isAboveLg && (
        <div className={classes.linkText}>
          <div className={classes.caption}>{t('header.buyer_power')}</div>
          <div className={classes.value}>
            {formatCurrency(buyerPowerAmount < 0 ? 0 : buyerPowerAmount, 'USD', true)}
          </div>
        </div>
      )}
    </a>
  );
}

export default BuyerPower;
