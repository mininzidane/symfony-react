import { useEffect, useState } from 'react';

function useDocumentScroll(callback) {
  const [, setScrollPosition] = useState(0);
  let prevScroll = 0;

  function handleDocumentScroll() {
    const { scrollTop: nextScroll } = document.documentElement || document.body;

    setScrollPosition((previousPosition) => {
      prevScroll = previousPosition;
      return nextScroll;
    });

    callback({ prevScroll, nextScroll });
  }

  useEffect(() => {
    window.addEventListener('scroll', handleDocumentScroll);

    return () => window.removeEventListener('scroll', handleDocumentScroll);
  }, []);
}

export default useDocumentScroll;
