import { useState } from 'react';
import useEventListener from 'frontend/js/hooks/useEventListener';

function getSuggestionsMenuMaxHeight() {
  const $header = document.getElementById('site-header');
  const headerHeight = $header?.getBoundingClientRect().height;

  return window.visualViewport.height - (headerHeight || 0);
}

function useSuggestionsMaxHeight() {
  const [suggestionsMenuMaxHeight, setSuggestionsMenuMaxHeight] = useState(getSuggestionsMenuMaxHeight());

  useEventListener(
    'resize',
    () => {
      setSuggestionsMenuMaxHeight(getSuggestionsMenuMaxHeight());
    },
    window.visualViewport,
  );

  return suggestionsMenuMaxHeight;
}

export default useSuggestionsMaxHeight;
