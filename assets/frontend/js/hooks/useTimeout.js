import { useEffect } from 'react';

function useTimeout(clb, delay, deps) {
  useEffect(() => {
    const id = setTimeout(clb, delay);

    return () => {
      clearTimeout(id);
    };
  }, deps);
}

export default useTimeout;
