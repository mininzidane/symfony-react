import RouterService from 'frontend/js/api/RouterService';

function getRouteType(TABS, DISABLED, EMPTY_TAB) {
  function isActive(routes) {
    return routes.some((routeName) => RouterService.test(routeName));
  }

  if (isActive(['watchlist', 'watchlistCompleted'])) {
    return TABS.watchlist;
  }

  if (isActive(['currentBids', 'lotsWon', 'lotsLost'])) {
    return TABS.bids;
  }

  if (isActive(['buyerPower'])) {
    return TABS.buyerPower;
  }

  if (window.location.pathname.includes('/myaccount/')) {
    return TABS.account;
  }

  if (
    isActive(['membershipPlans']) ||
    isActive(['lot']) ||
    isActive(['joinAuctions', 'joinAuctionsGermany']) ||
    isActive(['forgottenPassword'])
  ) {
    return DISABLED;
  }

  return EMPTY_TAB;
}

export default getRouteType;
