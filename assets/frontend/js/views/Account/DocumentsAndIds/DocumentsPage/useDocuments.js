import { useQuery, useMutation } from 'react-query';
import get from 'lodash/get';
import CustomerService from 'frontend/js/api/CustomerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function useDocuments() {
  const { isAuthenticated } = useCustomerHelper();

  const { isLoading, data } = useQuery('customer-documents-data', () => CustomerService.getCustomerDocuments(), {
    enabled: isAuthenticated,
  });

  const { mutateAsync } = useMutation((payload) => CustomerService.generateDocumentEnvelope(payload));
  const documents = get(data, 'documents');
  const signedPurchases = get(data, 'signedPurchases');
  const unsignedPurchases = get(data, 'unsignedPurchases');

  return {
    documents,
    signedPurchases,
    unsignedPurchases,
    isLoading: isLoading && !data,
    generateDocumentEnvelope: mutateAsync,
  };
}

export default useDocuments;
