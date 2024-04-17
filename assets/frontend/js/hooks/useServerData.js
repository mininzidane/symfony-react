import { useEffect, useState } from 'react';
import useLoading from './useLoading';

function useServerData(initialState = null, fetch, args = [], formatFn = (v) => v) {
  const [isLoading, setIsLoading] = useLoading(true);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(...args)
      .then((result) => {
        if (isMounted) {
          setData(formatFn(result));
          setError(null);
        }
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, args);

  return { data, setData, isLoading, setIsLoading, error, setError };
}

export default useServerData;
