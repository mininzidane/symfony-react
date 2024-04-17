import React, { Suspense, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Fallback from '../Fallback';
import Context from './context';

const OrderedSuspenseWrapper = ({ block, children, fallback }) => {
  const { loaded, on, off } = useContext(Context);
  const refLoaded = useRef(true);
  const ref = useRef();

  useEffect(() => {
    const handleShow = () => {
      const $el = ref.current;
      if (!$el) {
        return;
      }

      $el.style.display = 'contents';
      off(block, handleShow);
    };

    on(block, handleShow);

    return () => {
      off(block, handleShow);
    };
  }, []);

  useLayoutEffect(() => {
    if (refLoaded.current) {
      loaded(block);
    }
  }, []);

  return (
    <div ref={ref} style={{ display: 'none' }}>
      <Suspense
        fallback={
          <Fallback
            onWillMount={() => {
              refLoaded.current = false;
            }}
            onUnmount={() => {
              refLoaded.current = true;
              loaded(block);
            }}
          >
            {fallback}
          </Fallback>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

OrderedSuspenseWrapper.defaultProps = {
  children: null,
  fallback: null,
};

OrderedSuspenseWrapper.propTypes = {
  block: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  fallback: PropTypes.node,
};

export default OrderedSuspenseWrapper;
