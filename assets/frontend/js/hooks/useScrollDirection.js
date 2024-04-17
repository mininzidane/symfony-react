import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';
const MENU_SHIFT_SIZE = 40;

const useScrollDirection = ({ thresholdPixels, off = false } = {}) => {
  const [scrollDir, setScrollDir] = useState(SCROLL_UP);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const { scrollY } = window;
      const headerPosTop = document.getElementById('header-panel').getBoundingClientRect().top;

      // Prevent shift if not scrolled enough
      if (scrollY <= MENU_SHIFT_SIZE) {
        setScrollDir(SCROLL_UP);
        lastScrollY = scrollY;
        ticking = false;
        return;
      }

      if (headerPosTop > 0) {
        lastScrollY = scrollY;
        ticking = false;
        return;
      }

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    if (!off) {
      window.addEventListener('scroll', onScroll);
    } else {
      setScrollDir(SCROLL_UP);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [thresholdPixels, off]);

  return { scrollDir, SCROLL_UP, SCROLL_DOWN };
};

export default useScrollDirection;
