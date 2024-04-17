import React, { useState, useMemo, useLayoutEffect } from 'react';
import useTimeout from 'frontend/js/hooks/useTimeout';

function defer(component, delay = { initial: 0, rerender: 0 }) {
  function DeferredComponent(props) {
    const [state, setState] = useState(props);
    const [render, setRender] = useState(!delay?.initial);

    useLayoutEffect(() => {
      if (props[defer.skip]) {
        setState(props);
      }
    }, [props]);

    useTimeout(() => setRender(true), delay?.initial, []);
    useTimeout(
      () => {
        if (!props[defer.skip]) {
          setState(props);
        }
      },
      delay?.rerender,
      [props],
    );

    return useMemo(() => {
      if (!render) {
        return null;
      }

      return React.createElement(component, state);
    }, [render, state]);
  }

  return DeferredComponent;
}

defer.skip = 'skip-defer';

export default defer;
