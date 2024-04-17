import { useEffect } from 'react';

function useAdSlotsCleaner(locationPathname) {
  useEffect(() => {
    if (window.googletag && window.googletag.cmd) {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots();
      });
    }
  }, [locationPathname]);
}

export default useAdSlotsCleaner;
