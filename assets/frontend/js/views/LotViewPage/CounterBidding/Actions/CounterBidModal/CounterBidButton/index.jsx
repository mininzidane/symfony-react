import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const CounterBidModal = React.lazy(() => import('..'));

function CounterBidButton({ className, consignment, updateConsignment }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        label={<FormattedMessage id="shared.cta.counterBid" />}
        className={className}
        isNowrap
      />
      <SuspenseWrap fallback={null} init={isOpen}>
        <CounterBidModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={<FormattedMessage id="consignment.counterBidModal.title" />}
          consignment={consignment}
          updateConsignment={updateConsignment}
        />
      </SuspenseWrap>
    </>
  );
}

CounterBidButton.propTypes = {
  className: PropTypes.string,
  updateConsignment: PropTypes.func,
  consignment: PropTypes.object.isRequired,
};

CounterBidButton.defaultProps = {
  className: '',
  updateConsignment: () => {},
};

export default CounterBidButton;
