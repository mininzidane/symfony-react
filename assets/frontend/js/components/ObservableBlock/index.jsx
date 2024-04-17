import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Observer from './Observer';

function ObservableBlock({ content, placeholder, hideOnLeave }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useLayoutEffect(() => {
    let handle;

    Observer.observe(ref.current, (isIntersecting) => {
      window.cancelIdleCallback(handle);

      handle = window.requestIdleCallback(
        () => {
          if (isIntersecting || hideOnLeave) {
            setIsVisible(isIntersecting);
          }
        },
        { timeout: 200 },
      );
    });

    return () => {
      window.cancelIdleCallback(handle);
      Observer.unobserve(ref.current);
    };
  }, []);

  return <div ref={ref}>{isVisible ? content : placeholder}</div>;
}

ObservableBlock.propTypes = {
  content: PropTypes.node.isRequired,
  placeholder: PropTypes.node,
  hideOnLeave: PropTypes.bool,
};

ObservableBlock.defaultProps = {
  hideOnLeave: false,
  placeholder: null,
};

export default ObservableBlock;
