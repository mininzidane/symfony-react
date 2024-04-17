import { useQuery } from 'react-query';
import CustomerService from 'backend/js/api/CustomerService';

function useNotes(customerId, category, params, opts = {}) {
  const { data, isLoading } = useQuery(
    ['notes-data', customerId, category, params],
    () => new CustomerService().getNotesGroupList(customerId, category, params),
    opts,
  );

  return [data?.notes || [], isLoading];
}

export default useNotes;
