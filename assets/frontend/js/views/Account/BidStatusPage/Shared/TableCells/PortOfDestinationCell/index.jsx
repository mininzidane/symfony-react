/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import RouterService from 'frontend/js/api/RouterService';
import ShippingCoverageModalLazy from 'frontend/js/views/Shared/ShippingCoverageModal/lazy';
import TrackingService from 'frontend/js/api/TrackingService';
import useStyles from './useStyles';

function PortOfDestinationCell({ portOfDestination, vin, shippingOrderToken, className, shippingOrder }) {
  const classes = useStyles();
  const [isShippingCoverageModalOpen, setShippingCoverageModalOpen] = useState(false);

  const { STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP } = TrackingService;

  const isAvailableInsuranceEdit =
    shippingOrder?.internationalType &&
    [STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP].includes(shippingOrder.shippingStatus || shippingOrder.ehStatus);

  return (
    <div className={classnames(classes.root, className)}>
      {portOfDestination && <>{portOfDestination}</>}
      {shippingOrderToken && vin && (
        <ButtonOutlined
          href={RouterService.getRoute('shippingTracking', null, false, {
            emailOrToken: shippingOrderToken,
            vin,
          })}
          size="sm"
          label={<FormattedMessage id="trackMyOrderPage.trackMyOrder" />}
          isRegularCase
          isThinBorder
          isTargetBlank
        />
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
          />
          <ShippingCoverageModalLazy
            title={<FormattedMessage id="trackingPage.label.shippingCoverage" />}
            isOpen={isShippingCoverageModalOpen}
            onClose={() => setShippingCoverageModalOpen(false)}
            shippingOrder={shippingOrder}
          />
        </>
      )}
    </div>
  );
}

export default PortOfDestinationCell;
