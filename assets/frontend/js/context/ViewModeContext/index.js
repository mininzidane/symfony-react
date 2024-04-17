/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, createContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

const ViewModeContext = createContext();

const OPTIONS = {
  GRID: 'grid',
  LIST: 'list',
};

function getInitialState(defaultView, localStorageKey) {
  const viewParam = RouterService.getQueryParam('view');
  return viewParam ?? LocalStorageService.get(localStorageKey) ?? defaultView;
}

function ViewModeProvider({ children, localStoragePrefix, defaultView }) {
  const localStorageKey = `ABM:${localStoragePrefix ? `${localStoragePrefix}ViewMode` : 'viewMode'}`;
  const [view, setView] = useState(() => getInitialState(defaultView, localStorageKey));
  const isGridView = view === OPTIONS.GRID;

  const updateView = useCallback((value) => {
    RouterService.addQueryParams({ view: value }, { replaceState: true });
    LocalStorageService.set(localStorageKey, value);
    setView(value);
  }, []);

  useEventListener('popstate', () => {
    setView(getInitialState(defaultView, localStorageKey));
  });

  return (
    <ViewModeContext.Provider value={{ viewModeOptions: OPTIONS, view, setView: updateView, isGridView }}>
      {children}
    </ViewModeContext.Provider>
  );
}

ViewModeProvider.propTypes = {
  localStoragePrefix: PropTypes.string,
  defaultView: PropTypes.string,
};

ViewModeProvider.defaultProps = {
  localStoragePrefix: '',
  defaultView: OPTIONS.LIST,
};

export { ViewModeProvider, OPTIONS as viewModeOptions };

export default ViewModeContext;
