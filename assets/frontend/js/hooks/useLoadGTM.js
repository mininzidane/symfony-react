import { useEffect } from 'react';
import useDelayedLoadPermission from 'frontend/js/hooks/useDelayedLoad';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';

function useLoadGTM() {
  const delayedLoadingAllowed = useDelayedLoadPermission([DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED]);

  useEffect(() => {
    if (!delayedLoadingAllowed) {
      return;
    }

    window?.loadGTM();
  }, [delayedLoadingAllowed]);
}

export default useLoadGTM;
