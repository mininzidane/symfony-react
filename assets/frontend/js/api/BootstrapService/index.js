import get from 'lodash/get';

class BootstrapService {
  FEATURE = {
    APPLEPAY: 'applePay',
    GOOGLEPAY: 'googlePay',
    PAYPAL: 'payPal',
    SECURE3D: 'secure3d',
    GOOGLEADS: 'googleAds',
    CHECKOUT_DEPOSIT_ZELLE: 'checkoutDepositZelle',
    CHECKOUT_MEMBERSHIP_ZELLE: 'checkoutMembershipZelle',
  };

  constructor() {
    this.abmApp = window.abmApp || {};
  }

  getAppValue(appKey, defaultValue) {
    return get(this.abmApp, appKey, defaultValue);
  }

  isFeatureEnabled(feature) {
    const featureEnabled = this.getAppValue(`features.${feature}`, false);

    return Boolean(featureEnabled) === true;
  }

  isAdEnabled(placement) {
    const placements = this.getAppValue('features.googleAdsPlacements', []);

    return placements.includes(placement);
  }

  getAvailableAuctions() {
    return this.getAppValue('availableAuctions', []);
  }

  isAvailableAuction(auction) {
    const auctions = this.getAppValue('availableAuctions', []);

    return auctions.includes(auction);
  }

  getShippingPreferredDestinationCountry() {
    return this.getAppValue('shippingPreferredDestinationCountry', null);
  }

  getShippingPreferredDestination() {
    return this.getAppValue('shippingPreferredDestination', null);
  }

  update(data) {
    if (!data) {
      return;
    }

    window.abmApp = data;
    this.abmApp = data;
  }
}

export default new BootstrapService();
