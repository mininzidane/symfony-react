import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useQuery, useQueryClient } from 'react-query';
import PaymentService from 'frontend/js/api/PaymentService';
import TransactionsService from 'frontend/js/api/TransactionsService';
import Table from './Table';

function DepositsBlock({ onReleaseSuccess, className, loader, noResults }) {
  const transactionsService = new TransactionsService();
  const { isLoading, data } = useQuery('deposits-data', () => transactionsService.getDeposits());
  const queryClient = useQueryClient();

  function refetchPendingRefunds() {
    queryClient.invalidateQueries('pending-refunds-data', { refetchInactive: true });
  }

  function refetchClosedTransactions() {
    queryClient.invalidateQueries('closed-transactions-data', { refetchInactive: true });
  }

  function handleSuccessfulRelease(token, refundType) {
    const { deposits } = queryClient.getQueryData('deposits-data');
    queryClient.setQueryData('deposits-data', {
      deposits: deposits.filter((deposit) => deposit.masterTransaction.token !== token),
    });

    if (PaymentService.REFUNDABLE_METHODS.includes(refundType)) {
      refetchClosedTransactions();
    } else {
      refetchPendingRefunds();
    }

    onReleaseSuccess(refundType);
  }

  if (isLoading && !data) {
    return loader;
  }

  if (!get(data, 'deposits.length')) {
    return noResults;
  }

  return (
    <div className={className}>
      <Table onReleaseSuccess={handleSuccessfulRelease} data={data.deposits} />
    </div>
  );
}

DepositsBlock.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.node.isRequired,
  noResults: PropTypes.node.isRequired,
  onReleaseSuccess: PropTypes.func.isRequired,
};

DepositsBlock.defaultProps = {
  className: '',
};

export default DepositsBlock;
