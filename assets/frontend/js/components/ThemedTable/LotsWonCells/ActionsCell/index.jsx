/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Amount from 'frontend/js/components/Amount';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CancelPurchaseBtn from 'frontend/js/views/Shared/RelistModal/CancelPurchaseButton';
import useRelistAvailable from 'frontend/js/views/Shared/RelistModal/useRelistAvailable';
import DocumentToSign from 'frontend/js/components/ThemedTable/InvoiceCells/_components/DocumentToSign';
import DownloadInvoiceBtn from '../_components/Buttons/DownloadInvoiceBtn';
import DownloadShippingInvoiceBtn from '../_components/Buttons/DownloadShippingInvoiceBtn';
import DownloadInvoicePopoverBtn from '../_components/Popovers/DownloadInvoiceBtn';
import InvoicePaymentBtn from '../_components/Buttons/InvoicePaymentBtn';
import useShippingActions from '../_components/useShippingActions';
import TrackMyOrderBtn from '../_components/Buttons/TrackMyOrderBtn';
import PlaceOrderPopoverBtn from '../_components/Popovers/PlaceOrderBtn';
import CustomOrderPopoverBtn from '../_components/Popovers/CustomOrderBtn';
import useStyles from './useStyles';

const ActionsCellStyles = { style: { paddingRight: 12, paddingLeft: 8 } };

function ActionsCell({ className, hasShippingActions, hasTotalAmountDue }) {
  const classes = useStyles();
  const { amount, invoice, shippingOrder: currentShippingOrder, isCombineShippingWithLotPurchase } = useLotWonContext();
  const { displayCustomOrder, displayPlaceOrder, displayTrackMyOrder } = useShippingActions();
  const { id, userPadUploadDisabled } = useCustomerHelper();

  if (!invoice) {
    return null;
  }
  const { shippingOrder } = currentShippingOrder;
  const { paid, lot, lotPurchase, amountApplied, dueDate, balanceRemaining, token, customer } = invoice;

  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const isLotPurchase = Boolean(lotPurchase);
  const isUserPurchase = id === customer.id;
  const hasAppliedAmount = parseFloat(amountApplied, 10) > 0;
  const shippingOrderToken = shippingOrder && shippingOrder.token;
  const isBosSigned = isLotPurchase && lotPurchase.bosSigned;

  const isRelistAvailable = useRelistAvailable(lotPurchase, invoice);

  return (
    <div className={classnames(classes.root, className)}>
      {hasTotalAmountDue && <Amount value={paid ? 0 : parseFloat(amount, 10)} hasCurrency className={classes.amount} />}

      {isLotPurchase && !isBosSigned && paid && !userPadUploadDisabled ? (
        <div className={classes.cta}>
          <DocumentToSign lotPurchase={lotPurchase} isRegularCase />
        </div>
      ) : (
        <div className={classes.cta}>
          {isBalanceRemaining ? (
            <>
              {(Boolean(shippingOrderToken) || isLotPurchase) && isUserPurchase ? (
                <InvoicePaymentBtn
                  token={token}
                  isCombineShippingWithLotPurchase={isCombineShippingWithLotPurchase}
                  isRegularCase
                />
              ) : (
                <DownloadInvoicePopoverBtn
                  token={isLotPurchase ? token : shippingOrderToken}
                  isLotPurchase={isLotPurchase}
                  dueDate={dueDate}
                  isRegularCase
                />
              )}
            </>
          ) : (
            <>
              {hasAppliedAmount && (
                <>
                  {isLotPurchase ? (
                    <DownloadInvoiceBtn token={token} isLotPurchase={isLotPurchase} isRegularCase />
                  ) : (
                    <>{shippingOrder && <DownloadShippingInvoiceBtn token={shippingOrderToken} isRegularCase />}</>
                  )}
                </>
              )}
            </>
          )}
          {isRelistAvailable && (
            <div className={classes.cancelPurchase}>
              <CancelPurchaseBtn lotPurchase={lotPurchase} />
            </div>
          )}
        </div>
      )}

      {hasShippingActions && (
        <>
          {lot && displayPlaceOrder && <PlaceOrderPopoverBtn lot={lot} token={lotPurchase?.token} isRegularCase />}
          {lot && displayCustomOrder && <CustomOrderPopoverBtn lot={lot} isRegularCase />}
          {displayTrackMyOrder && (
            <TrackMyOrderBtn
              token={shippingOrderToken || ''}
              vin={lot?.vin || lotPurchase?.vehicleVin || shippingOrder?.lot?.vin}
              isRegularCase
            />
          )}
        </>
      )}
    </div>
  );
}

ActionsCell.propTypes = {
  className: PropTypes.string,
  hasShippingActions: PropTypes.bool,
  hasTotalAmountDue: PropTypes.bool,
};

ActionsCell.defaultProps = {
  className: '',
  hasShippingActions: false,
  hasTotalAmountDue: false,
};

export { ActionsCell, ActionsCellStyles };
