import { useState } from 'react';

const defaultResults = {
  currentPage: 1,
  data: [],
  lastPage: 0,
  size: 100,
  total: 0,
};

function usePaginatedResults(initialResults = defaultResults) {
  const [results, setInternalResults] = useState(initialResults);

  function validateServerResultsFormat(data) {
    return Boolean(
      data.currentPage > 0 &&
        Array.isArray(data.data) &&
        data.lastPage >= 0 &&
        data.size >= 0 &&
        data.total !== undefined,
    );
  }

  function setResults(serverResults) {
    if (validateServerResultsFormat(serverResults)) {
      setInternalResults(serverResults);
    }
  }

  function resetResults() {
    setInternalResults(initialResults);
  }

  return { results, setResults, resetResults };
}

export default usePaginatedResults;
