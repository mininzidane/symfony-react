import PaymentService from 'frontend/js/api/PaymentService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import get from 'lodash/get';

class ApplePayService {
  applePayEnabled = BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.APPLEPAY);

  merchantId = null;

  applePayVersion = 10;

  requireBillingAddress = false;

  defaultPaymentRequestParams = {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['amex', 'discover', 'masterCard', 'visa'],
    merchantCapabilities: ['supports3DS'],
  };

  defaultBillingRequirements = {
    requiredBillingContactFields: ['postalAddress'],
  };

  static buildBillingInformationPayload(paymentDetails) {
    const { billingContact } = paymentDetails;
    if (!billingContact) {
      return undefined;
    }

    const { addressLines, administrativeArea, countryCode, locality, postalCode } = billingContact;

    return {
      address: addressLines && addressLines.length ? addressLines[0] : '',
      city: locality,
      state: administrativeArea,
      country: countryCode,
      zip: postalCode,
    };
  }

  static buildPaymentPayload(payload, paymentDetails) {
    const { token } = paymentDetails;
    const billingInformation = ApplePayService.buildBillingInformationPayload(paymentDetails);

    return {
      ...payload,
      payment: {
        method: PaymentService.METHOD.APPLE_PAY,
      },
      tokenDetails: {
        ...token,
      },
      billingInformation,
    };
  }

  static formatFromInvoicesAndAmount(invoices = [], amount) {
    if (!invoices) {
      return {};
    }

    let invoiceMemo = '';
    invoices.map((invoice) => {
      invoiceMemo = get(invoice, 'memo');
      return get(invoice, 'items', [])
        .filter((item) => parseFloat(item.due) > 0)
        .map((item) => {
          const itemAmount = get(item, 'due');
          const label = get(item, 'productService.name', '');

          return {
            label,
            amount: parseFloat(itemAmount),
          };
        });
    });

    return {
      total: {
        label: invoiceMemo,
        amount,
      },
    };
  }

  setIsBillingRequired(isRequired = false) {
    this.requireBillingAddress = isRequired;

    return this;
  }

  async isApplePaySupported() {
    if (this.applePayEnabled && window.ApplePaySession) {
      try {
        const canMakePayments = await window.ApplePaySession.canMakePayments();
        const supportsVersion = window.ApplePaySession.supportsVersion(this.applePayVersion);

        return canMakePayments && supportsVersion;
      } catch (e) {
        if (window.Sentry) {
          window.Sentry.captureException(e);
        }
      }
    }

    return false;
  }

  getBillingRequirements() {
    if (!this.requireBillingAddress) {
      return {};
    }

    return this.defaultBillingRequirements;
  }

  buildApplePayRequest(invoices, amount) {
    const applePayload = ApplePayService.formatFromInvoicesAndAmount(invoices, amount);

    const billingRequirements = this.getBillingRequirements();

    return {
      merchantId: this.merchantId,
      ...this.defaultPaymentRequestParams,
      ...applePayload,
      ...billingRequirements,
    };
  }

  makeApplePayment(payload, invoices, amount, onSuccess, onError, requireBillingAddress = false) {
    this.merchantId = window.applePayMerchantId;
    this.setIsBillingRequired(requireBillingAddress);

    const applePayRequest = this.buildApplePayRequest(invoices, amount);
    const appleSession = new window.ApplePaySession(this.applePayVersion, applePayRequest);

    appleSession.oncancel = () => {
      onError();
    };

    /** Authorize session with server */
    appleSession.onvalidatemerchant = async (event) => {
      try {
        const validationUrl = event.validationURL;
        const { session } = await PaymentService.generateApplePaySession({
          validationUrl,
          merchantId: this.merchantId,
        });
        appleSession.completeMerchantValidation(session);
      } catch (e) {
        if (window.Sentry) {
          window.Sentry.captureException(e);
        }
      }
    };

    /** Authorize payment with gateway */
    appleSession.onpaymentauthorized = async (event) => {
      const { payment } = event;

      try {
        const paymentPayload = ApplePayService.buildPaymentPayload(payload, payment);
        const response = await PaymentService.authorizeTokenPayment(paymentPayload);
        appleSession.completePayment(window.ApplePaySession.STATUS_SUCCESS);
        onSuccess(response);
      } catch (e) {
        if (window.Sentry) {
          window.Sentry.captureException(e);
        }
        appleSession.abort();
      }
    };

    appleSession.begin();
  }
}

export default new ApplePayService();
