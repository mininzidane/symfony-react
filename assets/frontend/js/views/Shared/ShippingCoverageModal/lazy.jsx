import React from 'react';
import PropTypes from 'prop-types';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const ShippingCoverageModal = React.lazy(() => import('./index'));

function ShippingCoverageModalLazy(props) {
  const { isOpen } = props;

  return (
    <SuspenseWrap fallback={null} init={isOpen}>
      <ShippingCoverageModal {...props} />
    </SuspenseWrap>
  );
}

ShippingCoverageModalLazy.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  shippingOrder: PropTypes.object.isRequired,
};

export default ShippingCoverageModalLazy;
