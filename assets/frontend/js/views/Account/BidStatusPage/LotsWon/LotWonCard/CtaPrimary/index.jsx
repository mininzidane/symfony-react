import React from 'react';
import classnames from 'classnames';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import DownloadInvoice from './DownloadInvoice';
import AmountLabel from './AmountLabel';
import useStyles from './useStyles';

function CtaPrimary() {
  const classes = useStyles();
  const { invoice } = useLotWonContext();
  const { formatFromISOString } = DateTimeService;
  const { getRoute } = RouterService;
  const { formatCurrency } = NumberService;
  const { lotPurchase, amountApplied, dueDate, balanceRemaining, token, shippingOrder, customer } = invoice;
  const isLotPurchase = Boolean(lotPurchase);
  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const hasAppliedAmount = parseFloat(amountApplied, 10) > 0;
  const { id, brokerDisplayOnlyLotPurchase } = useCustomerHelper();
  const isUserPurchase = id === customer.id;

  let lpQuery = null;
  if (isLotPurchase && brokerDisplayOnlyLotPurchase) {
    lpQuery = { displayLpOnly: true };
  }

  function handleEventTracking() {
    const eventTrackingService = new EventTrackingService();
    eventTrackingService.sendEvent({ name: 'pay_now_button_click', step: 'abm_shipping' });
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        {invoice && (
          <>
            {isBalanceRemaining ? (
              <>
                <AmountLabel />

                <div className={classes.card}>
                  {isLotPurchase && lotPurchase.ccAllowed && isUserPurchase ? (
                    <Button
                      href={getRoute('invoicePayment', null, false, { token })}
                      label={<FormattedMessage id="shared.cta.payNow" />}
                      onClick={handleEventTracking}
                      size="sm"
                    />
                  ) : (
                    <DownloadInvoice
                      token={isLotPurchase ? token : shippingOrder && shippingOrder.token}
                      isLotPurchase={isLotPurchase}
                      dueDate={dueDate}
                    />
                  )}
                </div>

                {hasAppliedAmount ? (
                  <div className={classnames(classes.ctaStatus, 'is-red')}>
                    <FormattedMessage
                      id="shared.label.partiallyPaidAmount"
                      values={{ amount: formatCurrency(amountApplied, 'USD', true) }}
                    />
                  </div>
                ) : (
                  <div className={classnames(classes.ctaStatus, 'is-red')}>
                    <FormattedMessage id="shared.label.notPaid" />
                  </div>
                )}
              </>
            ) : (
              <>
                {hasAppliedAmount && (
                  <>
                    <AmountLabel />

                    <div className={classes.card}>
                      {isLotPurchase ? (
                        <ButtonOutlined
                          label={<FormattedMessage id="shared.cta.downloadReceipt" />}
                          href={getRoute('invoiceView', lpQuery, false, { token })}
                          size="sm"
                          isTargetBlank
                          isThinBorder
                        />
                      ) : (
                        <>
                          {shippingOrder && (
                            <ButtonOutlined
                              label={<FormattedMessage id="shared.cta.downloadReceipt" />}
                              href={getRoute('shippingInvoice', null, false, { token: shippingOrder.token })}
                              size="sm"
                              isTargetBlank
                              isThinBorder
                            />
                          )}
                        </>
                      )}
                    </div>

                    <div className={classnames(classes.ctaStatus, 'is-gray')}>
                      <FormattedMessage
                        id="shared.label.paidAmountOnDate"
                        values={{
                          amount: `${formatCurrency(amountApplied, 'USD', true)} USD`,
                          date: formatFromISOString(invoice.paidInFull),
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CtaPrimary;
