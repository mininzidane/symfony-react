import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const InvoiceService = {
  getInvoices(path) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`invoices?${path}`, true)).then(
      ({ data }) => data,
    );
  },
  isInvoicePaymentAvailable(token) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`invoice/${token}/payment-availability`, true),
    ).then(({ data }) => data);
  },
};

export default InvoiceService;
