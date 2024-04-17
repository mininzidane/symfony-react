import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import TrackMyOrderBtn from '../Buttons/TrackMyOrderBtn';
import CancelOrderBtn from '../Buttons/CancelOrderBtn';
import useStyles from './useStyles';

function ShippingStatus({ className, isCancellable, isCancelled, isActiveOrder, isPaid, token, vehicle, vin }) {
  const intl = useIntl();
  const { shippingStatus, shippingOrder, isCombineShippingWithLotPurchase } = useLotWonContext();
  const { errorMsg, isLoading, isSubmitCancellation, isSubmittedCustomQuote } = shippingOrder;
  const hasTrackingCta = Boolean(token && vin && !isCombineShippingWithLotPurchase && !isCancelled);
  const classes = useStyles({ hasTrackingCta });
  const { isLoading: isLoadingStatus, getShippingOrderStatus, shippingSteps, currentStep } = shippingStatus;

  useEffect(() => {
    if (token && isPaid) {
      getShippingOrderStatus(token);
    }
  }, [token, isPaid]);

  return (
    <div className={classnames(className, classes.root)}>
      {isLoading || isLoadingStatus ? (
        <SpinnerWheel size={14} thickness={2} color="gray" />
      ) : (
        <>
          <div className={classes.trackingWrapper}>
            {isCancellable ? (
              <>
                {isSubmitCancellation && errorMsg ? (
                  <span className={classes.textRed}>{errorMsg}</span>
                ) : (
                  <span className={classes.textGray}>
                    {isCombineShippingWithLotPurchase
                      ? intl.formatMessage({ id: 'shipping.status.shippingHasBeenAddedToYourVehicleInvoice' })
                      : intl.formatMessage({ id: 'shipping.status.orderHasBeenPlaced' })}
                  </span>
                )}
                <CancelOrderBtn token={token} vehicle={vehicle} className={classes.cancelOrderCta} />
              </>
            ) : (
              <>
                {isPaid && shippingSteps && currentStep && <span className="text-green">{currentStep.text}</span>}
                {!isActiveOrder && (
                  <>
                    {isSubmittedCustomQuote ? (
                      <span className="text-green">
                        {intl.formatMessage({ id: 'shipping.status.yourCustomQuoteRequestHasBeenSubmitted' })}
                      </span>
                    ) : (
                      <span className={classes.textRed}>
                        {intl.formatMessage({ id: 'shipping.status.orderHasNotBeenPlaced' })}
                      </span>
                    )}
                  </>
                )}
                {isActiveOrder && !isPaid && !isCancelled && (
                  <span className={classes.textGray}>
                    {intl.formatMessage({ id: 'shipping.status.orderHasBeenPlacedAwaitingPayment' })}
                  </span>
                )}
              </>
            )}
          </div>

          {hasTrackingCta && (
            <div className={classes.trackingCtaWrapper}>
              <TrackMyOrderBtn token={token} vin={vin} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

ShippingStatus.propTypes = {
  className: PropTypes.string,
  isCancellable: PropTypes.bool,
  isCancelled: PropTypes.bool,
  isActiveOrder: PropTypes.bool,
  isPaid: PropTypes.bool,
  token: PropTypes.string,
  vehicle: PropTypes.string,
  vin: PropTypes.string,
};

ShippingStatus.defaultProps = {
  className: '',
  isCancellable: false,
  isCancelled: false,
  isActiveOrder: false,
  isPaid: false,
  token: '',
  vehicle: '',
  vin: '',
};

export default ShippingStatus;
