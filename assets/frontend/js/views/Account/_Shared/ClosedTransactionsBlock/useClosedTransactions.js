import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import PaginationContext from 'frontend/js/context/PaginationContext';
import TransactionsService from 'frontend/js/api/TransactionsService';

function useClosedTransactions() {
  const { currentPage: page, setTotal, setItemsPerPage, setCurrentPage } = useContext(PaginationContext);
  const transactionsService = new TransactionsService();
  const { data, isLoading } = useQuery(['closed-transactions-data', page], () =>
    transactionsService.getClosedTransactions(page),
  );

  const closedTransactions = get(data, 'transactionGroups.items', []);
  const currentPage = get(data, 'transactionGroups.pagination.current_page', 1);
  const itemsPerPage = get(data, 'transactionGroups.pagination.per_page', 25);
  const total = get(data, 'transactionGroups.pagination.total_items', 1);

  useEffect(() => {
    if (data) {
      setCurrentPage(currentPage);
      setItemsPerPage(itemsPerPage);
      setTotal(total);
    }
  }, [data]);

  return [closedTransactions, !data && isLoading];
}

export default useClosedTransactions;
