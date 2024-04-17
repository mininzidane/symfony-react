import { useEffect } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';

function setScrollRestorationToManual() {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

function usePreventScrollRestoration() {
  useEffect(setScrollRestorationToManual, []);

  useEventListener('popstate', setScrollRestorationToManual);
}

export default usePreventScrollRestoration;
