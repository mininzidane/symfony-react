// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';
import useComponentWillMount from 'frontend/js/hooks/useComponentWillMount';
import useHideFooter from 'frontend/js/hooks/useHideFooter';

const HiddenFooterFallback = ({ onUnmount, onWillMount, children }) => {
  useComponentWillMount(onWillMount);

  useHideFooter();
  useLayoutEffect(() => () => onUnmount(), []);

  return children;
};

HiddenFooterFallback.defaultProps = {
  onWillMount: () => {},
  onUnmount: () => {},
  children: null,
};

HiddenFooterFallback.propTypes = {
  onWillMount: PropTypes.func,
  onUnmount: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default HiddenFooterFallback;
