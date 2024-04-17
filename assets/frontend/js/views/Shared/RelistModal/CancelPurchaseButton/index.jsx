import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const RelistModal = React.lazy(() => import('frontend/js/views/Shared/RelistModal'));

function CancelPurchaseButton({ className, lotPurchase }) {
  if (!lotPurchase) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const ymm = `${lotPurchase.vehicleYear} ${lotPurchase.vehicleMake} ${lotPurchase.vehicleModel}`;

  return (
    <>
      <ButtonLink
        onClick={handleOpen}
        label={<FormattedMessage id="relistModal.dontLikeThisVehicle" />}
        className={className}
        isDashed
      />
      <SuspenseWrap fallback={null} init={isOpen}>
        <RelistModal
          isOpen={isOpen}
          onClose={handleClose}
          lotPurchaseToken={lotPurchase.token}
          title={<FormattedMessage id="relistModal.relistYMM" values={{ ymm }} />}
        />
      </SuspenseWrap>
    </>
  );
}

CancelPurchaseButton.propTypes = {
  className: PropTypes.string,
  lotPurchase: PropTypes.object,
};

CancelPurchaseButton.defaultProps = {
  className: '',
  lotPurchase: null,
};

export default CancelPurchaseButton;
