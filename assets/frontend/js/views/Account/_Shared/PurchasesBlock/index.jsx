import React from 'react';
import PropTypes from 'prop-types';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import Pagination from 'frontend/js/components/Pagination';
import Table from './Table';
import usePurchases from './usePurchases';

function PurchasesBlock({ className, loader, noResults }) {
  const [purchases, loading] = usePurchases();

  if (loading) {
    return loader;
  }

  if (!purchases.length) {
    return noResults;
  }

  return (
    <div className={className}>
      <Table data={purchases} />
      <Pagination />
    </div>
  );
}

PurchasesBlock.propTypes = {
  className: PropTypes.string,
  loader: PropTypes.node.isRequired,
  noResults: PropTypes.node.isRequired,
};

PurchasesBlock.defaultProps = {
  className: '',
};

export default (props) => (
  <PaginationProvider>
    <PurchasesBlock {...props} />
  </PaginationProvider>
);
