import { useEffect, useRef } from 'react';

function usePreviousNonNullish(value, reset = false) {
  const ref = useRef(value);

  if (reset) {
    ref.current = null;
  }

  useEffect(() => {
    if (reset) {
      return;
    }

    if (value !== null && value !== undefined) {
      ref.current = value;
    }
  });

  return ref.current;
}

export default usePreviousNonNullish;
