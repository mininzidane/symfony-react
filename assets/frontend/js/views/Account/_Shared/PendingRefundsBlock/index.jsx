import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import TransactionsService from 'frontend/js/api/TransactionsService';
import Table from './Table';

function PendingRefundsBlock({ className, loader, noResults }) {
  const transactionsService = new TransactionsService();
  const { isLoading, data } = useQuery('pending-refunds-data', () => transactionsService.getPendingRefunds());

  if (isLoading && !data) {
    return loader;
  }

  if (!get(data, 'refunds.length')) {
    return noResults;
  }

  return (
    <div className={className}>
      <Table data={data.refunds} />
    </div>
  );
}

PendingRefundsBlock.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.node.isRequired,
  noResults: PropTypes.node.isRequired,
};

PendingRefundsBlock.defaultProps = {
  className: '',
};

export default PendingRefundsBlock;
