import { useState } from 'react';

function useServerError() {
  const [errorMsg, setErrorMsg] = useState('');
  const defaultErrorMessage = 'An unknown error occurred.';

  function resetError() {
    setErrorMsg('');
  }

  function extractErrors(serverError) {
    try {
      const {
        response: {
          data: { errors },
        },
      } = serverError;

      return Object.values(errors).join(' ');
    } catch (e) {
      return defaultErrorMessage;
    }
  }

  function extractAndSetErrorMsg(serverError) {
    const messages = extractErrors(serverError);
    setErrorMsg(messages);
  }

  return { errorMsg, setErrorMsg, resetError, extractErrors, extractAndSetErrorMsg };
}

export default useServerError;
