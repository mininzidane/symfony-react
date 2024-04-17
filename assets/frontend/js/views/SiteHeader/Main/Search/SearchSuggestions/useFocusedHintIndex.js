import { useState } from 'react';

function useFocusedHintIndex() {
  const INITIAL_INDEX = -1;
  const [focusedHintIndex, setFocusedHintIndex] = useState(INITIAL_INDEX);

  function resetFocusedHintIndex() {
    setFocusedHintIndex(INITIAL_INDEX);
  }

  function updateFocusedHintIndex(hintsArray, shift) {
    const maxIndex = hintsArray.length - 1;
    let nextFocusedHintIndex = focusedHintIndex + shift;

    if (nextFocusedHintIndex > maxIndex) {
      nextFocusedHintIndex = 0;
    }

    if (nextFocusedHintIndex < 0) {
      nextFocusedHintIndex = maxIndex;
    }

    setFocusedHintIndex(nextFocusedHintIndex);
    return nextFocusedHintIndex;
  }

  return { focusedHintIndex, resetFocusedHintIndex, updateFocusedHintIndex };
}

export default useFocusedHintIndex;
