// eslint-disable-next-line react/prop-types
import React from 'react';
import PropTypes from 'prop-types';
import useDelayedLoadPermission from 'frontend/js/hooks/useDelayedLoad';
import Wrap from './Wrap';

function DelayedLoadSuspense({ children, actions, ...props }) {
  const delayedLoadingAllowed = useDelayedLoadPermission(actions);

  return (
    <Wrap init={delayedLoadingAllowed} {...props}>
      {children}
    </Wrap>
  );
}

DelayedLoadSuspense.defaultProps = {
  actions: [],
};

DelayedLoadSuspense.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.string),
};

export default DelayedLoadSuspense;
