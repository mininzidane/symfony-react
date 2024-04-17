import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import PaymentService from 'frontend/js/api/PaymentService';
import ApplePayService from 'frontend/js/api/ApplePayService';
import GooglePayService from 'frontend/js/api/GooglePayService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';

function buildPath(product) {
  switch (product) {
    case PaymentService.PRODUCT.INVOICE: {
      const { token } = RouterService.match('invoicePayment');
      return `invoice/${token}`;
    }
    case PaymentService.PRODUCT.SHIPPING: {
      const { token } = RouterService.match('shippingPayment');
      return `invoice?shippingOrder=${token}`;
    }
    case PaymentService.PRODUCT.DEPOSIT: {
      const amount = RouterService.getQueryParam('amount');
      const maxPossibleBid = RouterService.getQueryParam('maxPossibleBid');
      return `invoice?depositIncrease=${amount}${maxPossibleBid ? `&maxPossibleBid=${maxPossibleBid}` : ''}`;
    }
    case PaymentService.PRODUCT.MEMBERSHIP: {
      const { plan } = RouterService.match('membershipPayment');
      return `invoice?newMembershipPlan=${plan}`;
    }
    case PaymentService.PRODUCT.CV_REPORT: {
      return `invoice?newCvReport=1`;
    }
    case PaymentService.PRODUCT.PURCHASE_WITH_SHIPPING: {
      const { token } = RouterService.match('invoicePayment');
      return `invoice/${token}/?purchaseWithShipping=1`;
    }
    default: {
      return 'invoice';
    }
  }
}

function removePaymentMethod(method, supportedMethods) {
  const paymentIndex = supportedMethods.indexOf(method);
  supportedMethods.splice(paymentIndex, 1);
}

async function checkApplePayAvailability(supportedMethods) {
  const isApplePaySupported = await ApplePayService.isApplePaySupported();
  if (!isApplePaySupported) {
    removePaymentMethod(PaymentService.METHOD.APPLE_PAY, supportedMethods);
  }
}

async function checkPayPalAvailability(supportedMethods) {
  if (!BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.PAYPAL)) {
    removePaymentMethod(PaymentService.METHOD.PAYPAL, supportedMethods);
  }
}

async function checkGooglePayAvailability(supportedMethods) {
  let isEnabled;
  try {
    await GooglePayService.init();
    isEnabled = await GooglePayService.isGooglePaySupported();
  } catch (e) {
    isEnabled = false;
  }

  if (!isEnabled) {
    removePaymentMethod(PaymentService.METHOD.GOOGLE_PAY, supportedMethods);
  }
}

async function checkZelleAvailability(supportedMethods) {
  const isZelleEnabledForBuyerPower = BootstrapService.isFeatureEnabled(
    BootstrapService.FEATURE.CHECKOUT_DEPOSIT_ZELLE,
  );
  const isZelleEnabledForMembership = BootstrapService.isFeatureEnabled(
    BootstrapService.FEATURE.CHECKOUT_MEMBERSHIP_ZELLE,
  );
  const buyerPowerCondition = RouterService.test('buyerPowerPayment') && !isZelleEnabledForBuyerPower;
  const membershipCondition = RouterService.test('membershipPayment') && !isZelleEnabledForMembership;

  if (buyerPowerCondition || membershipCondition) {
    removePaymentMethod(PaymentService.METHOD.ZELLE, supportedMethods);
  }
}

async function adjustPaymentMethods({ allowedPaymentMethods }) {
  if (!allowedPaymentMethods) {
    return allowedPaymentMethods;
  }

  const supportedMethods = allowedPaymentMethods.slice();
  if (supportedMethods.includes(PaymentService.METHOD.APPLE_PAY)) {
    await checkApplePayAvailability(supportedMethods);
  }

  if (supportedMethods.includes(PaymentService.METHOD.PAYPAL)) {
    await checkPayPalAvailability(supportedMethods);
  }

  if (supportedMethods.includes(PaymentService.METHOD.GOOGLE_PAY)) {
    await checkGooglePayAvailability(supportedMethods);
  }

  if (supportedMethods.includes(PaymentService.METHOD.ZELLE)) {
    await checkZelleAvailability(supportedMethods);
  }

  return supportedMethods;
}

function useInvoiceDetails(product) {
  const [invoiceDetails, setInvoiceDetails] = useState({});

  const path = buildPath(product);

  const { data } = useQuery(['invoice-details-data', path], () => PaymentService.getInvoiceDetails(path), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    (async () => {
      if (data) {
        const { googlePayConfig, applePayMerchantId, payPalClientId } = data;
        if (googlePayConfig) {
          window.googlePayConfig = googlePayConfig;
        }
        if (applePayMerchantId) {
          window.applePayMerchantId = applePayMerchantId;
        }
        if (payPalClientId) {
          window.payPalClientId = payPalClientId;
        }
        const allowedPaymentMethods = await adjustPaymentMethods(data);
        // Bank Wire Transfer option is always last
        allowedPaymentMethods.sort((_, b) => (b === PaymentService.METHOD.WIRE_TRANSFER ? -1 : 0));
        setInvoiceDetails({ ...data, allowedPaymentMethods });
      }
    })();
  }, [data]);

  return invoiceDetails;
}

export default useInvoiceDetails;
