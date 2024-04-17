import get from 'lodash/get';

class BootstrapService {
  FEATURE = {
    APPLEPAY: 'applePay',
    GOOGLEPAY: 'googlePay',
    PAYPAL: 'payPal',
    SECURE3D: 'secure3d',
    GOOGLEADS: 'googleAds',
  };

  constructor() {
    this.abmApp = window.abmApp || {};
  }

  getAppValue(appKey, defaultValue) {
    return get(this.abmApp, appKey, defaultValue);
  }

  hasFeatureEnabled(feature) {
    const featureEnabled = this.getAppValue(`features.${feature}`, false);

    return Boolean(featureEnabled) === true;
  }
}

export default new BootstrapService();
