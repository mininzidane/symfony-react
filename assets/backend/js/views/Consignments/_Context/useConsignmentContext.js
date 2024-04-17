import { useContext } from 'react';
import ConsignmentContext from './ConsignmentContext';

function useConsignmentContext() {
  return useContext(ConsignmentContext);
}

export default useConsignmentContext;
