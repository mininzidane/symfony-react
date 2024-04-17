import { useContext } from 'react';
import BidderFromContext from './BidderFormContext';

function useBidderFormContext() {
  return useContext(BidderFromContext);
}

export default useBidderFormContext;
