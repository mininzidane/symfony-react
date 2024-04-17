import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Fade({ children, isOpen, duration, easing, isAlwaysMounted, onUnmount }) {
  const [isMounted, setIsMounted] = useState(isOpen || false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let req;

    if (isOpen) {
      setIsMounted(true);
      req = requestAnimationFrame(() => setIsRevealed(true));
    } else {
      setIsRevealed(false);
    }

    return () => window.cancelAnimationFrame(req);
  }, [isOpen]);

  const style = {
    ...(children.props.style || {}),
    ...(isAlwaysMounted && { visibility: isMounted ? 'visible' : 'hidden' }),
    opacity: isRevealed ? 1 : 0,
    transition: `opacity ${duration}ms ${easing} 0ms`,
  };

  return isMounted || isAlwaysMounted
    ? React.cloneElement(children, {
        style,
        onTransitionEnd: () => {
          if (!isRevealed) {
            setIsMounted(false);
            onUnmount();
          }
        },
      })
    : null;
}

Fade.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onUnmount: PropTypes.func,
  duration: PropTypes.number,
  easing: PropTypes.string,
  isAlwaysMounted: PropTypes.bool,
};

Fade.defaultProps = {
  duration: 225,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  isAlwaysMounted: false,
  onUnmount: () => {},
};

export default Fade;
