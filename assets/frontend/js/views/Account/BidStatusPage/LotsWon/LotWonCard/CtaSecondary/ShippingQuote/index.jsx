import React, { useContext, useEffect } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import PlaceOrderBtn from './Buttons/PlaceOrderBtn';
import CustomOrderBtn from './Buttons/CustomOrderBtn';
import NotActiveOrderDesc from './NotActiveOrderDesc';
import ActiveOrderDesc from './ActiveOrderDesc';
import ShippingStatus from './ShippingStatus';
import TrackMyOrderBtn from './Buttons/TrackMyOrderBtn';
import ShippingPayNowBtn from './Buttons/ShippingPayNowBtn';
import ShippingStatusBtn from './Buttons/ShippingStatusBtn';
import useStyles from './useStyles';
import DownloadInvoice from '../../CtaPrimary/DownloadInvoice';

function ShippingQuote() {
  const classes = useStyles();
  const { id: currentCustomerId } = useCustomerHelper();
  const { shippingQuote, updateFromShippingOrder, initShippingFromCustomer, customerDataInited } =
    useContext(ShippingQuoteContext);
  const { invoice, shippingOrder: currentShippingOrder, isCombineShippingWithLotPurchase } = useLotWonContext();
  const { lot, customer, lotPurchase } = invoice;
  const { shippingOrder, isActiveOrder, isCancelled } = currentShippingOrder;

  const isLotPurchase = Boolean(lotPurchase);
  const isUserPurchase = currentCustomerId === customer?.id;

  useEffect(() => {
    (async () => {
      if (shippingOrder) {
        if (!customerDataInited) {
          await initShippingFromCustomer(window.customer);
        }
        await updateFromShippingOrder(shippingOrder);
      }
    })();
  }, [shippingOrder]);

  if (!isLotPurchase) {
    return false;
  }

  const orderToken = shippingOrder && shippingOrder.token;
  const isPaid = shippingOrder && shippingOrder.paid;
  const isInvoice = shippingOrder && Boolean(shippingOrder.invoice);
  const isBalanceRemaining = isPaid && isInvoice && shippingOrder.invoice.balanceRemaining > 0;
  const displayCancelOrder = shippingOrder && isUserPurchase && shippingOrder.orderCancellable;
  const displayCustomOrder = !shippingQuote && !isActiveOrder;
  const displayPlaceOrder = shippingQuote && isUserPurchase && (!orderToken || (orderToken && isCancelled));
  const amount = isInvoice ? shippingOrder.invoice.amount : 0;
  const total =
    (!isPaid && isInvoice) || isBalanceRemaining ? parseFloat(shippingOrder.invoice.balanceRemaining, 10) : amount;

  return (
    <>
      {!isActiveOrder && (
        <>
          <NotActiveOrderDesc className={classes.desc} lot={lot} />
          {displayPlaceOrder && <PlaceOrderBtn className={classes.cta} lot={lot} token={lotPurchase.token} />}
          {displayCustomOrder && <CustomOrderBtn className={classes.cta} lot={lot} />}
        </>
      )}
      {isActiveOrder && (
        <>
          {isCombineShippingWithLotPurchase ? (
            <>
              <ActiveOrderDesc
                className={classes.desc}
                desc={
                  <>
                    <FormattedMessage id="shared.label.shippingTo" /> {shippingOrder.destination}
                  </>
                }
              />
              <div className={classes.cta}>
                <TrackMyOrderBtn token={orderToken || ''} vin={lot.vin} />
              </div>
            </>
          ) : (
            <>
              <ActiveOrderDesc
                className={classes.desc}
                desc={
                  isBalanceRemaining ? (
                    <FormattedMessage id="lotsWonPage.shippingDue" />
                  ) : (
                    <>
                      <FormattedMessage id="shared.label.shippingTo" /> {shippingOrder.destination}
                    </>
                  )
                }
                total={total}
              />
              {!isPaid || isBalanceRemaining ? (
                <>
                  {isUserPurchase ? (
                    <ShippingPayNowBtn className={classes.cta} token={orderToken} />
                  ) : (
                    <div className={classes.cta}>
                      <DownloadInvoice token={shippingOrder.token} dueDate={shippingOrder.invoice.dueDate} />
                    </div>
                  )}
                </>
              ) : (
                <ShippingStatusBtn className={classes.cta} vehicle={lot.description} />
              )}
            </>
          )}
        </>
      )}
      <ShippingStatus
        className={classes.status}
        isActiveOrder={isActiveOrder}
        isCancellable={displayCancelOrder}
        isCancelled={isCancelled}
        isPaid={isPaid}
        token={orderToken || ''}
        vehicle={lot.description}
        vin={lot.vin}
      />
    </>
  );
}

export default ShippingQuote;
