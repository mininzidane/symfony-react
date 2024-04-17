import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CancelPurchaseBtn from 'frontend/js/views/Shared/RelistModal/CancelPurchaseButton';
import useRelistAvailable from 'frontend/js/views/Shared/RelistModal/useRelistAvailable';
import DocumentToSign from 'frontend/js/components/ThemedTable/InvoiceCells/_components/DocumentToSign';
import DownloadInvoiceBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/DownloadInvoiceBtn';
import DownloadShippingInvoiceBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/DownloadShippingInvoiceBtn';
import DownloadInvoicePopoverBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Popovers/DownloadInvoiceBtn';
import InvoicePaymentBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/InvoicePaymentBtn';
import useShippingActions from 'frontend/js/components/ThemedTable/LotsWonCells/_components/useShippingActions';
import TrackMyOrderBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/TrackMyOrderBtn';
import PlaceOrderPopoverBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Popovers/PlaceOrderBtn';
import CustomOrderPopoverBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Popovers/CustomOrderBtn';
import useStyles from './useStyles';

function ActionsSections() {
  const classes = useStyles();
  const { invoice, shippingOrder: currentShippingOrder } = useLotWonContext();
  const { displayCustomOrder, displayPlaceOrder, displayTrackMyOrder } = useShippingActions();
  const { id, userPadUploadDisabled } = useCustomerHelper();

  if (!invoice) {
    return null;
  }

  const { isLoading, isSubmittedCustomQuote, errorMsg, shippingOrder } = currentShippingOrder;
  const { paid, lot, lotPurchase, amountApplied, dueDate, balanceRemaining, token, customer } = invoice;

  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const isLotPurchase = Boolean(lotPurchase);
  const isUserPurchase = id === customer.id;
  const hasAppliedAmount = parseFloat(amountApplied, 10) > 0;
  const shippingOrderToken = shippingOrder && shippingOrder.token;
  const isBosSigned = isLotPurchase && lotPurchase.bosSigned;

  const isRelistAvailable = useRelistAvailable(lotPurchase, invoice);

  return (
    <div className={classes.root}>
      <div>
        {isLotPurchase && !isBosSigned && paid && !userPadUploadDisabled ? (
          <DocumentToSign lotPurchase={lotPurchase} size="md" />
        ) : (
          <>
            {isBalanceRemaining ? (
              <>
                {isLotPurchase && lotPurchase.ccAllowed && isUserPurchase ? (
                  <InvoicePaymentBtn token={token} size="md" />
                ) : (
                  <DownloadInvoicePopoverBtn
                    token={isLotPurchase ? token : shippingOrderToken}
                    isLotPurchase={isLotPurchase}
                    dueDate={dueDate}
                    size="md"
                  />
                )}
              </>
            ) : (
              <>
                {hasAppliedAmount && (
                  <>
                    {isLotPurchase ? (
                      <DownloadInvoiceBtn token={token} isLotPurchase={isLotPurchase} size="md" />
                    ) : (
                      <>{shippingOrder && <DownloadShippingInvoiceBtn token={shippingOrderToken} size="md" />}</>
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
          </>
        )}
      </div>
      <>
        {lot && displayPlaceOrder && <PlaceOrderPopoverBtn lot={lot} token={lotPurchase?.token} size="md" />}
        {lot && displayCustomOrder && <CustomOrderPopoverBtn lot={lot} size="md" />}
        {displayTrackMyOrder && (
          <TrackMyOrderBtn
            token={shippingOrderToken || ''}
            vin={lot?.vin || lotPurchase?.vehicleVin || shippingOrder?.lot?.vin}
            size="md"
          />
        )}
      </>

      {!isLoading && (
        <>
          {isSubmittedCustomQuote && (
            <div className="text-green">
              <FormattedMessage id="shipping.status.yourCustomQuoteRequestHasBeenSubmitted" />
            </div>
          )}
          {errorMsg && <div className="text-red">{errorMsg}</div>}
        </>
      )}
    </div>
  );
}

export default ActionsSections;
