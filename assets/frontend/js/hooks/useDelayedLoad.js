import { useEffect, useState } from 'react';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';

function useDelayedLoadPermission(actions) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const callback = () => setAllowed(true);

    DelayedLoadService.onPermissionGranted(callback, actions);

    return () => {
      DelayedLoadService.offPermissionGranted(callback);
    };
  }, []);

  return allowed;
}

export default useDelayedLoadPermission;
