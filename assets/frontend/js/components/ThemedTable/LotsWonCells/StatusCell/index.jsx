/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import ShippingCoverageModalLazy from 'frontend/js/views/Shared/ShippingCoverageModal/lazy';
import TrackingService from 'frontend/js/api/TrackingService';
import useShippingActions from '../_components/useShippingActions';
import TrackMyOrderBtn from '../_components/Buttons/TrackMyOrderBtn';
import useStyles from './useStyles';

function StatusCell({ hasTrackMyOrderButton }) {
  const classes = useStyles();
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();
  const { shippingOrder } = currentShippingOrder;
  const { displayTrackMyOrder } = useShippingActions();
  const { lot, lotPurchase } = invoice;
  const [isShippingCoverageModalOpen, setShippingCoverageModalOpen] = useState(false);

  const { STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP } = TrackingService;

  const isAvailableInsuranceEdit =
    shippingOrder?.internationalType &&
    [STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP].includes(shippingOrder.shippingStatus || shippingOrder.ehStatus);

  return (
    <>
      <div>{shippingOrder?.ehStatus || '–'}</div>

      {hasTrackMyOrderButton && displayTrackMyOrder && (
        <div>
          <TrackMyOrderBtn
            token={shippingOrder?.token || ''}
            vin={lotPurchase?.vehicleVin || lot?.vin || shippingOrder?.lot?.vin || ''}
            isInline
            isRegularCase
            className={classes.btn}
          />
        </div>
      )}

      {isAvailableInsuranceEdit && (
        <>
          <ButtonOutlined
            onClick={() => setShippingCoverageModalOpen(true)}
            size="sm"
            label={<FormattedMessage id="trackMyOrderPage.label.orderInsurance" />}
            isRegularCase
            isThinBorder
            isTargetBlank
            className={classes.btn}
          />

          <ShippingCoverageModalLazy
            title={<FormattedMessage id="trackingPage.label.shippingCoverage" />}
            isOpen={isShippingCoverageModalOpen}
            onClose={() => setShippingCoverageModalOpen(false)}
            shippingOrder={shippingOrder}
          />
        </>
      )}
    </>
  );
}

StatusCell.propTypes = {
  hasTrackMyOrderButton: PropTypes.bool,
};

StatusCell.defaultProps = {
  hasTrackMyOrderButton: false,
};

export { StatusCell };
