import { useContext } from 'react';
import BidContext from './BidContext';

function useBidContext() {
  return useContext(BidContext);
}

export default useBidContext;
