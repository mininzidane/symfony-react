import BaseApiService from '../BaseApiService';

class PaymentService extends BaseApiService {
  ibanDetails(value) {
    return this.get(this.buildRequestPath(`payment/iban-details/${value}`, true)).then(({ data }) => data);
  }
}

PaymentService.METHOD = {
  CREDIT_CARD: 'Credit Card',
  WIRE_TRANSFER: 'Wire Transfer',
  APPLE_PAY: 'ApplePay',
  GOOGLE_PAY: 'GooglePay',
  PAYPAL: 'PayPal',
  ZELLE: 'Zelle',
  MONEYGRAM: 'MoneyGram',
  ACH: 'ACH',
  CHECK_BY_FEDEX: 'Check by FedEx',
};

PaymentService.REFUNDABLE_METHODS = [
  PaymentService.METHOD.CREDIT_CARD,
  PaymentService.METHOD.APPLE_PAY,
  PaymentService.METHOD.GOOGLE_PAY,
];

export default PaymentService;
