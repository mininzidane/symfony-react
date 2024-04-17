import React, { useState, memo } from 'react';
import classnames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import t from 'frontend/js/api/TranslatorService';
import RouterService from 'frontend/js/api/RouterService';
import useWatchlistCount from 'frontend/js/hooks/useWatchlistCount';
import useToolbarBuyerPower from 'frontend/js/hooks/useToolbarBuyerPower';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useToolbarWonLots from 'frontend/js/hooks/useToolbarWonLots';
import MenuOverlay from 'frontend/js/views/SiteHeader/BottomToolbar/AccountTabs/MenuOverlay';
import AccountMenu from '../../Main/AccountMenu';
import useStyles from '../useStyles';
import CustomTab from './CustomTab';
import StyledBadge from './StyledBadge';
import TooltipWonLots from './TooltipWonLots';
import BidsIcon from './img/ic_nav_bids.svg';
import BidsActiveIcon from './img/ic_nav_bids_active.svg';
import DepositIcon from './img/ic_nav_deposit.svg';
import DepositActiveIcon from './img/ic_nav_deposit_active.svg';
import WatchlistIcon from './img/ic_nav_watchlist.svg';
import WatchlistActiveIcon from './img/ic_nav_watchlist_active.svg';
import BuyerPowerMenu from './BuyerPowerMenu';
import MyBidsMenu from './MyBidsMenu';
import UserInitials from './UserInitials';
import getRouteType from './getRouteType';

function AccountTabs() {
  const DISABLED = 'disabled';
  const EMPTY_TAB = '';
  const TABS = {
    watchlist: 'watchlist',
    bids: 'bids',
    buyerPower: 'buyerPower',
    account: 'account',
  };
  const menus = [TABS.bids, TABS.buyerPower, TABS.account];
  const routeType = getRouteType(TABS, DISABLED, EMPTY_TAB);

  if (routeType === DISABLED) {
    return null;
  }

  const classes = useStyles();
  const [openedMenuId, setOpenedMenuId] = useState(null);

  const watchlistCount = useWatchlistCount();
  const { firstName, lastName, currentBidsCount, due } = useCustomerHelper();
  const { wonLots, saveDismissedLots, isBadgeShown: isBadgeShownMyBids } = useToolbarWonLots();
  const { isBadgeShown: isBadgeShownDeposit } = useToolbarBuyerPower();
  const currentBidsLabel = currentBidsCount > 99 ? '99+' : currentBidsCount;

  function closeMenu() {
    setOpenedMenuId(EMPTY_TAB);
  }

  function handleChange(_, tabValue) {
    if (tabValue === TABS.watchlist || (tabValue === TABS.buyerPower && parseFloat(due) === 0)) {
      setTimeout(() => RouterService.redirect(tabValue), 200);
      closeMenu();
      return;
    }

    const nextTabId = TABS[tabValue];
    const isNextTabWithMenu = menus.includes(nextTabId);

    if (nextTabId === openedMenuId || !isNextTabWithMenu) {
      closeMenu();
      return;
    }

    setOpenedMenuId(nextTabId);
  }

  const isBadgeShownWatchlist = watchlistCount > 0;
  const activeTab = openedMenuId || routeType || EMPTY_TAB;

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="Tabs"
        classes={{
          root: classes.root,
          indicator: classes.indicatorMui,
        }}
      >
        <CustomTab
          value="watchlist"
          label={t('header.watchlist')}
          icon={
            <StyledBadge badgeContent={watchlistCount} invisible={!isBadgeShownWatchlist} max={10}>
              <img src={activeTab === TABS.watchlist ? WatchlistActiveIcon : WatchlistIcon} alt="Watchlist" />
            </StyledBadge>
          }
        />
        <CustomTab
          value="bids"
          label={t('header.my_bids')}
          icon={
            <>
              <StyledBadge
                badgeContent={isBadgeShownMyBids ? '!' : currentBidsLabel}
                invisible={!isBadgeShownMyBids && !currentBidsCount}
              >
                <img src={activeTab === TABS.bids ? BidsActiveIcon : BidsIcon} alt="My Bids" />
              </StyledBadge>
            </>
          }
        />
        <CustomTab
          value="buyerPower"
          label={t('header.buyer_power')}
          icon={
            <StyledBadge badgeContent="!" invisible={!isBadgeShownDeposit && parseFloat(due) === 0}>
              <img src={activeTab === TABS.buyerPower ? DepositActiveIcon : DepositIcon} alt="Deposit" />
            </StyledBadge>
          }
        />
        <CustomTab
          value="account"
          label={t('header.my_account')}
          icon={<UserInitials isActive={activeTab === TABS.account} firstName={firstName} lastName={lastName} />}
        />
        <div className={classnames(classes.indicator, `tab-${activeTab}`)} />
      </Tabs>

      <TooltipWonLots wonLots={wonLots} saveDismissedLots={saveDismissedLots} />

      <MyBidsMenu isOpen={openedMenuId === TABS.bids} />
      <BuyerPowerMenu isOpen={openedMenuId === TABS.buyerPower} />
      <AccountMenu isOpen={openedMenuId === TABS.account} />

      <MenuOverlay isOpen={openedMenuId} onClick={closeMenu} />
    </>
  );
}

export default memo(AccountTabs);
