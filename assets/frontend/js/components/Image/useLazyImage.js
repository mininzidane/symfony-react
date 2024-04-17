import { useEffect } from 'react';
import Observer from './Observer';

function useLazyImage({ ref, src, srcset, isLazy, isObserverDisabled }) {
  useEffect(() => {
    const el = ref.current;

    if (isLazy) {
      el.removeAttribute('src');
      el.removeAttribute('srcset');
      if (!isObserverDisabled) {
        Observer.observe(el);
      }
    }

    return () => Observer.unobserve(el);
  }, [src, srcset]);
}

export default useLazyImage;
