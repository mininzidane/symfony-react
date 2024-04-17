import BaseApiService from 'frontend/js/api/BaseApiService';

class TransactionsService extends BaseApiService {
  getTransactionStatus(token) {
    return this.get(this.buildRequestPath(`deposits/${token}/transaction-status`, true)).then(({ data }) => data);
  }

  refund(token, payload) {
    return this.post(this.buildRequestPath(`deposits/${token}/refund`, true), payload).then(({ data }) => data);
  }

  getDeposits() {
    return this.get(this.buildRequestPath('deposits', true)).then(({ data }) => data);
  }

  getClosedTransactions(page) {
    return this.get(this.buildRequestPath(`closed-transactions?page=${page}`, true)).then(({ data }) => data);
  }

  getPendingRefunds() {
    return this.get(this.buildRequestPath('refunds', true)).then(({ data }) => data);
  }

  getPurchases(page) {
    return this.get(this.buildRequestPath(`purchases?page=${page}`, true)).then(({ data }) => data);
  }
}

TransactionsService.TYPES = {
  AUTHORIZATION_HOLD: 'Authorization Hold',
  HOLD_RELEASED: 'Hold Released',
  TRANSACTION_COMPLETED: 'Transaction Completed',
};

export default TransactionsService;
