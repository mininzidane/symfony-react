/* eslint-disable prefer-destructuring */
import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';
import Context from './context';

function OrderedSuspenseProvider({ children, onStart, onDone, order }) {
  const listenersRef = useRef({});
  const doneRef = useRef([]);
  const queueRef = useRef(order);

  useComponentWillMount(onStart);

  const on = useCallback((block, clb) => {
    if (!block) {
      return;
    }

    const queue = queueRef.current;

    if (!queue.includes(block)) {
      clb();
      return;
    }

    const listeners = listenersRef.current[block] || [];
    listeners.push(clb);

    listenersRef.current[block] = listeners;
  }, []);

  const off = useCallback((block, clb) => {
    if (!block) {
      return;
    }

    listenersRef.current[block] = listenersRef.current[block]?.filter((v) => v !== clb);
  }, []);

  const handleLoad = useCallback((block) => {
    const done = doneRef.current;
    const queue = queueRef.current;
    const listeners = listenersRef.current;

    done.push(block);

    if (!queue.includes(block)) {
      listeners[block]?.forEach((listener) => listener());
      return;
    }

    let first = queue[0];
    while (done.includes(first)) {
      listeners[first]?.forEach((listener) => listener());
      queue.splice(0, 1);
      first = queue[0];
    }

    if (!queue.length) {
      onDone();
    }
  }, []);

  const state = useMemo(
    () => ({
      loaded: handleLoad,
      on,
      off,
    }),
    [],
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}

OrderedSuspenseProvider.defaultProps = {
  order: [],
  children: null,
  onStart: () => {},
  onDone: () => {},
};

OrderedSuspenseProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  order: PropTypes.arrayOf(PropTypes.string),
  onStart: PropTypes.func,
  onDone: PropTypes.func,
};

export default OrderedSuspenseProvider;
