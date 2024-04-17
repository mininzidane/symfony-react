import get from 'lodash/get';
import { useQuery } from 'react-query';
import RouterService from 'frontend/js/api/RouterService';
import InvoiceService from 'frontend/js/api/InvoiceService';

function usePaymentsDue({ sort, size }) {
  const params = { sort: sort.field, order: sort.order, size, filter: 'customer_dashboard' };
  const path = RouterService.serializeQueryParams(params);

  const { data, isLoading } = useQuery(['invoices-data', path], () => InvoiceService.getInvoices(path), {
    keepPreviousData: true,
  });

  const invoices = get(data, 'invoices', []);
  const total = get(data, 'total');

  return { loading: isLoading, isInitialLoad: !data && isLoading, invoices, total };
}

export default usePaymentsDue;
