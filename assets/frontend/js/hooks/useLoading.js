import { useState } from 'react';

function useLoading(initialLoadingState = false) {
  const [isLoading, setIsLoading] = useState(initialLoadingState);

  function toggleLoading() {
    setIsLoading(!isLoading);
  }

  return [isLoading, setIsLoading, toggleLoading];
}

export default useLoading;
