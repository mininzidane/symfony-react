import { useEffect } from 'react';
import ScriptLoadService from 'frontend/js/lib/utils/ScriptLoadService';

const useScript = (url, onload = () => {}) => {
  useEffect(() => {
    if (!url) {
      return () => {};
    }

    ScriptLoadService.add({ url, callback: onload });

    return () => {
      ScriptLoadService.remove({ url, callback: onload });
    };
  }, [url]);
};

export default useScript;
