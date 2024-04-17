/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';

function useCi360playState() {
  const [isPlaying, setIsPlaying] = useState(true);

  function stopPlaying() {
    setIsPlaying(false);
  }

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const instance = window.CI360 && window.CI360._viewers && window.CI360._viewers[0];
    if (instance) {
      if (isPlaying) {
        instance.play();
      } else {
        instance.stop();
      }
    }
  }, [isPlaying]);

  return { isPlaying, stopPlaying, togglePlaying };
}

export default useCi360playState;
