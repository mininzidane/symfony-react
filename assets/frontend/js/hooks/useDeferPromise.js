/* eslint-disable prefer-destructuring */
import { useMemo } from 'react';

function useDeferPromise() {
  return useMemo(() => {
    let resolve;
    let reject;
    const promise = new Promise((...args) => {
      resolve = args[0];
      reject = args[1];
    });

    return { promise, resolve, reject };
  }, []);
}

export default useDeferPromise;
