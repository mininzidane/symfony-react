import { useState } from 'react';

function useServerError() {
  const [errorMsg, setErrorMsg] = useState('');
  const defaultErrorMessage = 'An unknown error occurred.';

  function resetError() {
    setErrorMsg('');
  }

  function extractAndSetErrorMsg(serverError) {
    try {
      const {
        response: {
          data: { errors },
        },
      } = serverError;

      const messages = Object.values(errors).join(' ');
      setErrorMsg(messages);
    } catch (e) {
      setErrorMsg(defaultErrorMessage);
    }
  }

  return { errorMsg, setErrorMsg, resetError, extractAndSetErrorMsg };
}

export default useServerError;
