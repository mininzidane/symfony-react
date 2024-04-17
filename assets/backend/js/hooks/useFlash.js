import { useState } from 'react';

const defaultFlash = {
  message: '',
  type: null,
};

const typeSuccess = 'success';
const typeInfo = 'info';
const typeError = 'error';

const validTypes = [typeSuccess, typeInfo, typeError];

function useFlash(initialFlash = defaultFlash) {
  const [flash, setInternalFlash] = useState(initialFlash);

  function setFlash(message = '', type = typeInfo) {
    let validType = type;
    if (!validTypes.includes(type)) {
      validType = typeInfo;
    }

    setInternalFlash({ message, type: validType });
  }

  function resetFlash() {
    setInternalFlash(defaultFlash);
  }

  return { flash, setFlash, resetFlash };
}

export default useFlash;
