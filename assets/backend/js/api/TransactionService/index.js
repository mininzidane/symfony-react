import BaseApiService from '../BaseApiService';

class TransactionService extends BaseApiService {
  applyTransaction(transaction, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/transaction/${transaction}/apply`), payload).then(
      (data) => data,
    );
  }

  unapplyTransactions(tokens) {
    return this.post(this.buildProtectedRequestPath(`api/v1/transaction/unapply`), { tokens }).then((data) => data);
  }

  refund(customerId, token, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer/${customerId}/refunds/${token}`), payload).then(
      ({ data }) => data,
    );
  }

  getPaidTransactions(token, excludeBidders, page) {
    return this.get(
      this.buildProtectedRequestPath(`api/v1/transaction/${token}/paid?excludeBidders=${excludeBidders}&page=${page}`),
    ).then((data) => data.data);
  }
}

export default TransactionService;
