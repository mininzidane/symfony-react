import { useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';

function useInfiniteScroll({ containerRef, onChangePage, page, maxPage = 1 }) {
  const handleThrottleScroll = useCallback(
    throttle(() => {
      const $container = containerRef.current;
      if ($container && $container.scrollTop < $container.clientHeight / 2) {
        $container?.removeEventListener('scroll', handleThrottleScroll);
        onChangePage(page + 1);
      }
    }, 100),
    [onChangePage, page],
  );

  useEffect(() => {
    if (page < maxPage) {
      containerRef.current?.addEventListener('scroll', handleThrottleScroll);
    } else if (page >= maxPage) {
      containerRef.current?.removeEventListener('scroll', handleThrottleScroll);
    }
    return () => containerRef.current?.removeEventListener('scroll', handleThrottleScroll);
  }, [page, maxPage, handleThrottleScroll]);
}

export default useInfiniteScroll;
