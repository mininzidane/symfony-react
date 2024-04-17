import { useCallback, useEffect, useRef } from 'react';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';

const LAST_VISITED_LOT_KEY = 'ABM::lastVisitedLotId';

function useLastVisitedLot(skip) {
  const lastVisitedLotId = useRef(SessionStorageService.get(LAST_VISITED_LOT_KEY)).current;
  const ref = useRef();

  useEffect(() => {
    if (skip) {
      return;
    }

    SessionStorageService.delete(LAST_VISITED_LOT_KEY);

    if (lastVisitedLotId) {
      ScrollService.scrollIntoViewById(lastVisitedLotId);
    }
  }, [skip]);

  const handleClick = useCallback((event) => {
    const $el = event.target.closest('a');

    if (!$el || !$el.href) {
      return;
    }

    const url = new URL($el.href);
    const match = RouterService.match('lot', url.pathname);

    if (match?.id) {
      SessionStorageService.set(LAST_VISITED_LOT_KEY, Number(match?.id));
    }
  }, []);

  useEventListener('click', handleClick, ref.current);

  return { lastVisitedLotId, ref };
}

export default useLastVisitedLot;
