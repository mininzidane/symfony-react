import React, { useState, Suspense, useMemo, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import useDeferPromise from 'frontend/js/hooks/useDeferPromise';

function SuspenseWrap({ children, init, fallback, isDataReady, preload, ...props }) {
  const [render, setRender] = useState(init);

  const { promise, resolve } = useDeferPromise();
  // To keep fallback until data is loaded
  const StubLazyComponent = useMemo(() => {
    if (isDataReady) {
      return () => null;
    }

    return React.lazy(() => promise.then(() => ({ default: () => null })));
  }, []);

  useLayoutEffect(() => {
    if (init && !render) {
      setRender(true);
    }
  }, [init]);

  useLayoutEffect(() => {
    if (!render) {
      return;
    }

    // Preloading the component while waiting for API call to finish.
    // Preload is available when using ReactService.lazyWithPreload with single child or using custom preload function/prop
    if (!isDataReady) {
      children?.type?.silentPreload?.();

      preload();
    } else {
      // Resolve StubLazyComponent
      resolve();
    }
  }, [render, isDataReady]);

  if (!render) {
    return null;
  }

  // Don't render children until data is ready! Don't touch this!
  return (
    <Suspense fallback={fallback} {...props}>
      {isDataReady && children}

      <StubLazyComponent />
    </Suspense>
  );
}

SuspenseWrap.defaultProps = {
  fallback: null,
  init: true,
  isDataReady: true,
  preload: () => {},
};

SuspenseWrap.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  init: PropTypes.bool,
  isDataReady: PropTypes.bool,
  preload: PropTypes.func,
};

export default SuspenseWrap;
