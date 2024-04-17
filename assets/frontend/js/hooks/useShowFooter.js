import { useLayoutEffect } from 'react';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

function useShowFooter() {
  useLayoutEffect(() => {
    ViewportService.showFooter();
  }, []);
}

export default useShowFooter;
