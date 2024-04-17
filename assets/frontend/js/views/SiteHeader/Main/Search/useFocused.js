import { useState, useEffect } from 'react';

function useFocused() {
  const [isInputFocused, setInputFocused] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);

  useEffect(() => {
    if (isInputFocused) {
      setHasBeenFocused(true);
    }
  }, [isInputFocused]);

  return { isInputFocused, setInputFocused, hasBeenFocused, setHasBeenFocused };
}

export default useFocused;
