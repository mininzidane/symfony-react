import { useEffect, useRef } from 'react';

function useEventListener(eventNames, handler, element = window) {
  if (!Array.isArray(eventNames)) {
    // eslint-disable-next-line no-param-reassign
    eventNames = [eventNames];
  }

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);

    eventNames.forEach((eventName) => element.addEventListener(eventName, eventListener));

    return () => {
      eventNames.forEach((eventName) => element.removeEventListener(eventName, eventListener));
    };
  }, [JSON.stringify(eventNames), element]);
}

export default useEventListener;
