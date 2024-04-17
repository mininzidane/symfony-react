import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const PaymentService = {
  METHOD: {
    CREDIT_CARD: 'Credit Card',
    WIRE_TRANSFER: 'Wire Transfer',
    APPLE_PAY: 'ApplePay',
    GOOGLE_PAY: 'GooglePay',
    PAYPAL: 'PayPal',
    ZELLE: 'Zelle',
    MONEYGRAM: 'MoneyGram',
    ACH: 'ACH',
    CHECK_BY_FEDEX: 'Check by FedEx',
  },

  PAYMENT_SYSTEM_ACCOUNT: {
    ZELLE: 'billpay@autobidmaster.com',
    MONEYGRAM: '17238',
  },

  PRODUCT: {
    MEMBERSHIP: 'membership',
    DEPOSIT: 'deposit',
    SHIPPING: 'shipping',
    INVOICE: 'invoice',
    CV_REPORT: 'cvReport',
    PURCHASE_WITH_SHIPPING: 'purchaseWithShipping',
  },

  PRODUCT_SERVICE: {
    SECURITY_DEPOSIT: 'SecurityDeposit',

    // Memberships
    MEMBERSHIP_AUTO_RENEWAL_BASIC: 'MembershipAutoRenewal#Basic',
    MEMBERSHIP_AUTO_RENEWAL_ADVANCED: 'MembershipAutoRenewal#Advanced',
    MEMBERSHIP_AUTO_RENEWAL_PREMIUM: 'MembershipAutoRenewal#Premium',
    MEMBERSHIP_UPGRADE_BASIC: 'MembershipUpgrade#Basic',
    MEMBERSHIP_UPGRADE_ADVANCED: 'MembershipUpgrade#Advanced',
    MEMBERSHIP_UPGRADE_PREMIUM: 'MembershipUpgrade#Premium',
    ADVANCED_TO_PREMIUM_UPGRADE: 'AdvancedToPremiumUpgrade',

    AUCTION_FINAL_BID: 'AuctionFinalBid',
    TRANSACTION_FEE: 'TransactionFee',
    DOCUMENTATION_FEE: 'DocumentationFee',
    STORAGE_FEE: 'StorageFee',
    LATE_PAYMENT_FEE: 'LatePaymentFee',
    OCEAN_SHIPPING_INSURANCE: 'OceanShippingInsurance',
    GROUND_TRANSPORTATION: 'GroundTransportation',
    OCEAN_TRANSPORTATION: 'OceanTransportation',

    // Copart Fees
    COPART_BUYER_FEE: 'CopartBuyerFee',
    VIRTUAL_BID_FEE: 'VirtualBidFee',
    INTERNET_BID_FEE: 'InternetBidFee',
    GATE_FEE: 'GateFee',
    COPART_MAILING_FEE: 'CopartMailingFee',
    HAX_MAT_COMPLIANCE_FEE: 'HazMatComplianceFee',
    GOVERNMENT_IMPOSED_TRANSACTION: 'GovernmentImposedTransaction',
    COPART_TITLE_PROCESSING_FEE: 'CopartTitleProcessingFee',
    COPART_BROKER_TRANSACTION_FEE: 'CopartBrokerTransactionFee',
  },

  dispatchDepositIncreasedEvent(payload) {
    if (payload.newMembershipPlan) {
      return;
    }

    window.dispatchEvent(new CustomEvent('depositIncreased'));
  },

  REFUNDABLE_METHODS: ['Credit Card', 'ApplePay', 'GooglePay'],

  checkEnrollment(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('secure-enrollment', true),
      payload,
    ).then(({ data }) => data);
  },

  cmpiLookup(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('cmpi-lookup', true), payload).then(
      ({ data }) => data,
    );
  },

  cmpiGenerate(amount) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`cmpi-generate?amount=${amount}`, true),
    ).then(({ data }) => data);
  },

  securePaymentGenerate(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`secure-payment-generate`, true),
      payload,
    ).then(({ data }) => data);
  },

  creditCardPayment(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('payment/credit-card', true),
      payload,
    ).then(({ data }) => {
      PaymentService.dispatchDepositIncreasedEvent(payload);
      return data;
    });
  },

  wireTransferPayment(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('payment/wire-transfer', true),
      payload,
    ).then(({ data }) => {
      PaymentService.dispatchDepositIncreasedEvent(payload);
      return data;
    });
  },

  createPayPalOrder(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('payment/paypal', true), payload).then(
      ({ data }) => data,
    );
  },

  deletePayPalOrder(params) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('payment/paypal/cancel', true),
      params,
    ).then(({ data }) => data);
  },

  approvePayPalOrder(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('payment/paypal/approve', true),
      payload,
    ).then(({ data }) => {
      PaymentService.dispatchDepositIncreasedEvent(payload);
      return data;
    });
  },

  coupon(code, includeActive = false, category) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(
        `coupons/${code}?includeActive=${includeActive}&category=${category}`,
        true,
      ),
    ).then(({ data }) => data);
  },

  applySystemCoupon(code) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`coupons/apply-system/${code}`, true),
    ).then(({ data }) => data);
  },

  generateApplePaySession(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`payment/apple-pay/session`, true),
      payload,
    ).then(({ data }) => data);
  },

  authorizeTokenPayment(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`payment/token-pay`, true),
      payload,
    ).then(({ data }) => {
      PaymentService.dispatchDepositIncreasedEvent(payload);
      return data;
    });
  },

  ibanDetails(value) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`payment/iban-details/${value}`, true),
    ).then(({ data }) => data);
  },

  purchaseCvReport(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('payment/cv-report', true),
      payload,
    ).then(({ data }) => data);
  },

  getInvoiceDetails(path) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(path, true)).then(({ data }) => data);
  },

  logPayment(paymentType, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`payment-confirmation/log/${paymentType}`, true),
      payload,
    ).then(({ data }) => data);
  },
};

export default PaymentService;
