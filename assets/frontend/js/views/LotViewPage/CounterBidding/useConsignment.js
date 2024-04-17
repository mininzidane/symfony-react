import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import ConsignmentService from 'frontend/js/api/ConsignmentService';

function useConsignment(copartLot) {
  const { data: response, isLoading } = useQuery(
    ['consignment-details', copartLot],
    () => ConsignmentService.getConsignmentDetails(copartLot),
    { cacheTime: 0 },
  );

  const [consignment, setConsignment] = useState(response?.data);

  function updateConsignment(values) {
    setConsignment((prevConsignment) => ({
      ...prevConsignment,
      ...values,
    }));
  }

  useEffect(() => {
    setConsignment(response?.data);
  }, [response]);

  return { consignment, isLoading, updateConsignment };
}

export default useConsignment;
