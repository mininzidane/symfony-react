import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import PaginationContext from 'frontend/js/context/PaginationContext';
import TransactionsService from 'frontend/js/api/TransactionsService';

function usePurchases() {
  const { currentPage: page, setTotal, setItemsPerPage, setCurrentPage } = useContext(PaginationContext);
  const transactionsService = new TransactionsService();
  const { data, isLoading } = useQuery(['purchase-data', page], () => transactionsService.getPurchases(page));

  const purchases = get(data, 'invoices.items', []);
  const currentPage = get(data, 'invoices.pagination.current_page', 1);
  const itemsPerPage = get(data, 'invoices.pagination.per_page', 25);
  const total = get(data, 'invoices.pagination.total_items', 1);

  useEffect(() => {
    if (data) {
      setCurrentPage(currentPage);
      setItemsPerPage(itemsPerPage);
      setTotal(total);
    }
  }, [data]);

  return [purchases, !data && isLoading];
}

export default usePurchases;
