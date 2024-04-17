import React from 'react';
import PropTypes from 'prop-types';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import Pagination from 'frontend/js/components/Pagination';
import Table from './Table';
import useClosedTransactions from './useClosedTransactions';

function ClosedTransactionsBlock({ className, loader, noResults }) {
  const [closedTransactions, loading] = useClosedTransactions();

  if (loading) {
    return loader;
  }

  if (!closedTransactions.length) {
    return noResults;
  }

  return (
    <div className={className}>
      <Table data={closedTransactions} />
      <Pagination />
    </div>
  );
}

ClosedTransactionsBlock.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.node.isRequired,
  noResults: PropTypes.node.isRequired,
};

ClosedTransactionsBlock.defaultProps = {
  className: '',
};

export default (props) => (
  <PaginationProvider>
    <ClosedTransactionsBlock {...props} />
  </PaginationProvider>
);
