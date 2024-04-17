import { useLayoutEffect, useRef } from 'react';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

function useHideFooter() {
  const showFooterBack = useRef();

  useComponentWillMount(() => {
    showFooterBack.current = ViewportService.hideFooter();
  });

  useLayoutEffect(() => () => showFooterBack.current?.(), []);
}

export default useHideFooter;
