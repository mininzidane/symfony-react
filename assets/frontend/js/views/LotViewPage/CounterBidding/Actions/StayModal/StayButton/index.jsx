import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const StayModal = React.lazy(() => import('..'));

function RerunButton({ className, consignment, updateConsignment }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonOutlined
        className={className}
        onClick={() => setIsOpen(true)}
        label={<FormattedMessage id="shared.cta.stay" />}
        isBackgroundWhite
        isThinBorder
        isNowrap
      />
      <SuspenseWrap fallback={null} init={isOpen}>
        <StayModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={<FormattedMessage id="consignment.stayModal.title" />}
          consignment={consignment}
          updateConsignment={updateConsignment}
        />
      </SuspenseWrap>
    </>
  );
}

RerunButton.propTypes = {
  className: PropTypes.string,
  updateConsignment: PropTypes.func,
  consignment: PropTypes.object.isRequired,
};

RerunButton.defaultProps = {
  className: '',
  updateConsignment: () => {},
};

export default RerunButton;
