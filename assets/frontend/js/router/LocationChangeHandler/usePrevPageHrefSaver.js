import { useRef } from 'react';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';
import useLocationChangeListener from 'frontend/js/hooks/useLocationChangeListener';
import { matchPath } from 'frontend/js/router/utils';

function usePrevPageHrefSaver() {
  const history = useRef({ current: window.location.href, previous: null });

  useLocationChangeListener(() => {
    history.current.previous = history.current.current;
    history.current.current = window.location.href;
  });

  return () => {
    const { previous } = history.current;
    if (!previous) {
      return;
    }

    const { pathname } = new URL(previous);
    const match = matchPath(pathname);
    if (!match?.config?.skipHrefSaving) {
      SessionStorageService.set('ABM::prevPageHref', previous);
    }
  };
}

export default usePrevPageHrefSaver;
