import BaseApiService from '../BaseApiService';

class InvoiceService extends BaseApiService {
  getInvoice(invoice) {
    return this.get(this.buildProtectedRequestPath(`api/v1/invoice/${invoice}`)).then((data) => data);
  }
}

export default InvoiceService;
