/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ShippingCoverageModalLazy from 'frontend/js/views/Shared/ShippingCoverageModal/lazy';
import TrackingService from 'frontend/js/api/TrackingService';
import RouterService from 'frontend/js/api/RouterService';
import { B2bShippingCell } from 'frontend/js/components/ThemedTable/LotsWonCells';
import PurchaseDueCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/PurchaseDueCell';
import ValueCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/ValueCell';
import useStyles from './useStyles';

function ActionsSection({ invoice, shippingOrderToken, vin, portOfDestination, shippingOrder }) {
  const classes = useStyles();

  const [isShippingCoverageModalOpen, setShippingCoverageModalOpen] = useState(false);

  const { STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP } = TrackingService;

  const isAvailableInsuranceEdit =
    shippingOrder?.internationalType &&
    [STATUS_AWAITING_PAYMENT, STATUS_AWAITING_PICKUP].includes(shippingOrder.shippingStatus || shippingOrder.ehStatus);

  return (
    <div className={classes.root}>
      <div className={classes.cardActionSection}>
        <span>
          <FormattedMessage id="lotsWonPage.shippingDue" />:
        </span>
        <B2bShippingCell hasShippingActions />
      </div>
      <div className={classes.divider} />

      <div className={classes.cardActionSection}>
        <span>
          <FormattedMessage id="shared.label.purchaseDue" />:
        </span>
        <PurchaseDueCell invoice={invoice} hasCurrency={false} isCompact />
      </div>

      {shippingOrderToken && vin && (
        <>
          <div className={classes.divider} />
          <div className={classes.trackSection}>
            <div>
              <FormattedMessage id="shared.label.portOfDestination" />:
            </div>

            <div>
              <strong>
                <ValueCell value={portOfDestination} />
              </strong>
              <ButtonOutlined
                href={RouterService.getRoute('shippingTracking', null, false, {
                  emailOrToken: shippingOrderToken,
                  vin,
                })}
                size="sm"
                label={<FormattedMessage id="trackMyOrderPage.trackMyOrder" />}
                isRegularCase
                isThinBorder
              />
              {isAvailableInsuranceEdit && (
                <>
                  <ButtonOutlined
                    onClick={() => setShippingCoverageModalOpen(true)}
                    size="sm"
                    label={<FormattedMessage id="trackMyOrderPage.label.orderInsurance" />}
                    isRegularCase
                    isThinBorder
                    isTargetBlank
                    className="mt-5"
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
          </div>
        </>
      )}
    </div>
  );
}

export default ActionsSection;
