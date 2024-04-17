import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const ApproveModal = React.lazy(() => import('..'));

function ApproveButton({ className, consignment, updateConsignment }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        color="green"
        onClick={() => setIsOpen(true)}
        label={<FormattedMessage id="shared.cta.approve" />}
        className={className}
        isNowrap
      />
      <SuspenseWrap fallback={null} init={isOpen}>
        <ApproveModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={<FormattedMessage id="consignment.approveModal.title" />}
          consignment={consignment}
          updateConsignment={updateConsignment}
        />
      </SuspenseWrap>
    </>
  );
}

ApproveButton.propTypes = {
  className: PropTypes.string,
  updateConsignment: PropTypes.func,
  consignment: PropTypes.object.isRequired,
};

ApproveButton.defaultProps = {
  className: '',
  updateConsignment: () => {},
};

export default ApproveButton;
