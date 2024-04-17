import BootstrapService from 'frontend/js/api/BootstrapService';
import PaymentService from 'frontend/js/api/PaymentService';

class GooglePayService {
  initPromise;

  initialized = false;

  isSupported = false;

  requireBillingAddress = false;

  paymentsClient;

  environment = BootstrapService.getAppValue('environment') === 'PROD' ? 'PRODUCTION' : 'TEST';

  gPayUrl = 'https://pay.google.com/gp/p/js/pay.js';

  gPayConfig = {};

  googlePayEnabled = BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.GOOGLEPAY);

  buttons = [];

  baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
  };

  baseMerchantInfo = {
    merchantName: 'Example Merchant',
    merchantId: '12345678901234567890',
  };

  baseTransactionRequest = {
    totalPriceStatus: 'FINAL',
    currencyCode: 'USD',
    countryCode: 'US',
  };

  baseTokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {},
  };

  baseCardPaymentMethod = {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
    },
  };

  billingRequiredParams = {
    billingAddressRequired: true,
    billingAddressParameters: {
      format: 'FULL',
      phoneNumberRequired: true,
    },
  };

  static buildBillingInformationPayload(info) {
    if (!info || !info.billingAddress) {
      return undefined;
    }

    const billingAddress = info.billingAddress || {};
    const { address1, administrativeArea, countryCode, locality, phoneNumber, postalCode } = billingAddress;

    return {
      address: address1,
      city: locality,
      state: administrativeArea,
      country: countryCode,
      zip: postalCode,
      phoneNumber,
    };
  }

  static buildPaymentPayload(payload, paymentDetails) {
    const {
      paymentMethodData: { tokenizationData, info },
    } = paymentDetails;

    const billingInformation = GooglePayService.buildBillingInformationPayload(info);

    return {
      ...payload,
      payment: {
        method: PaymentService.METHOD.GOOGLE_PAY,
      },
      tokenDetails: tokenizationData,
      billingInformation,
    };
  }

  buildConfig() {
    try {
      const config = window.googlePayConfig;
      const decoded = window.atob(config);
      this.gPayConfig = JSON.parse(decoded);

      if (this.gPayConfig.parameters) {
        this.baseTokenizationSpecification = {
          ...this.baseTokenizationSpecification,
          parameters: {
            ...this.gPayConfig.parameters,
          },
        };
      }

      if (this.gPayConfig.merchantInfo) {
        this.baseMerchantInfo = {
          ...this.baseMerchantInfo,
          ...this.gPayConfig.merchantInfo,
        };
      }
    } catch (e) {
      if (window.Sentry) {
        window.Sentry.captureException(e);
      }
    }
  }

  setIsBillingRequired(isRequired = false) {
    this.requireBillingAddress = isRequired;

    return this;
  }

  initScript() {
    const script = document.createElement('script');
    script.src = this.gPayUrl;
    script.async = true;
    script.onload = this.onLoad.bind(this);
    document.body.appendChild(script);
  }

  onLoad() {
    try {
      this.paymentsClient = new window.google.payments.api.PaymentsClient({ environment: this.environment });
      this.initPromise.resolve({});
    } catch (e) {
      this.initPromise.reject(e);
    }

    this.initialized = true;
  }

  init() {
    const initPromise = new Promise((resolve, reject) => {
      this.initPromise = { resolve, reject };
    });

    if (this.initialized) {
      this.initPromise.resolve({});
    } else {
      this.initScript();
    }

    return initPromise;
  }

  async isGooglePaySupported() {
    if (!this.initialized || !this.googlePayEnabled) {
      return false;
    }

    const isReadyToPayRequest = {
      ...this.baseRequest,
      allowedPaymentMethods: [{ ...this.baseCardPaymentMethod }],
    };

    try {
      const { result } = await this.paymentsClient.isReadyToPay(isReadyToPayRequest);
      this.isSupported = result === true;
      return this.isSupported;
    } catch (e) {
      /** Ignore */
    }

    return false;
  }

  getTokenizationSpecification() {
    return {
      ...this.baseTokenizationSpecification,
    };
  }

  getCardPaymentMethod() {
    const baseCardPaymentMethod = {
      ...this.baseCardPaymentMethod,
    };

    if (this.requireBillingAddress) {
      Object.assign(baseCardPaymentMethod.parameters, this.billingRequiredParams);
    }

    return {
      tokenizationSpecification: this.getTokenizationSpecification(),
      ...baseCardPaymentMethod,
    };
  }

  createButton($el, onClick) {
    if (!this.isSupported) {
      return;
    }

    const $button = this.paymentsClient.createButton({ onClick });
    $el.appendChild($button);
    this.buttons.push($button);
  }

  destroyButtons($el) {
    if (!this.isSupported) {
      return;
    }

    try {
      this.buttons.forEach((item, index, object) => {
        $el.removeChild(item);
        object.splice(index, 1);
      });
    } catch (e) {
      /** Ignore */
    }
  }

  async makePayment(payload, amount, requireBillingAddress = false) {
    this.buildConfig();
    this.setIsBillingRequired(requireBillingAddress);

    const paymentDataRequest = { ...this.baseRequest };
    paymentDataRequest.allowedPaymentMethods = [this.getCardPaymentMethod()];
    paymentDataRequest.transactionInfo = {
      ...this.baseTransactionRequest,
      totalPrice: String(amount),
    };

    paymentDataRequest.merchantInfo = {
      ...this.baseMerchantInfo,
    };

    const paymentData = await this.paymentsClient.loadPaymentData(paymentDataRequest);
    const paymentPayload = GooglePayService.buildPaymentPayload(payload, paymentData);

    return PaymentService.authorizeTokenPayment(paymentPayload);
  }
}

export default new GooglePayService();
