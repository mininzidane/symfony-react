import { useContext } from 'react';
import CounterBidContext from './CounterBidContext';

function useCounterBidContext() {
  return useContext(CounterBidContext);
}

export default useCounterBidContext;
