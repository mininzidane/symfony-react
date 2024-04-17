// eslint-disable-next-line react/prop-types
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';

const Fallback = ({ onUnmount, onWillMount, children }) => {
  useEffect(
    () => () => {
      onUnmount();
    },
    [],
  );

  useComponentWillMount(onWillMount);

  return children;
};

Fallback.defaultProps = {
  onWillMount: () => {},
  onUnmount: () => {},
  children: null,
};

Fallback.propTypes = {
  onWillMount: PropTypes.func,
  onUnmount: PropTypes.func,
  children: PropTypes.node,
};

export default Fallback;
