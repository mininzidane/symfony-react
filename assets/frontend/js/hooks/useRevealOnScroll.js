import { useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

function useRevealOnScroll() {
  const ref = useRef();
  const { isPartiallyInViewport } = ViewportService;

  function update() {
    const $elements = ref.current.querySelectorAll('[data-is-reveal-on-scroll]');
    $elements.forEach((el) => {
      if (isPartiallyInViewport(el, 150, 120)) {
        el.setAttribute('data-reveal-on-scroll-react', true);
        el.removeAttribute('data-is-reveal-on-scroll');
      }
    });
  }

  useEffect(() => {
    const throttleUpdate = throttle(update, 250);
    throttleUpdate();
    window.addEventListener('scroll', throttleUpdate);
    return () => {
      window.removeEventListener('scroll', throttleUpdate);
    };
  }, []);

  return ref;
}

export default useRevealOnScroll;
