/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Amount from 'frontend/js/components/Amount';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CancelPurchaseBtn from 'frontend/js/views/Shared/RelistModal/CancelPurchaseButton';
import useRelistAvailable from 'frontend/js/views/Shared/RelistModal/useRelistAvailable';
import DocumentToSign from 'frontend/js/components/ThemedTable/InvoiceCells/_components/DocumentToSign';
import DownloadInvoiceBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/DownloadInvoiceBtn';
import DownloadInvoicePopoverBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Popovers/DownloadInvoiceBtn';
import InvoicePaymentBtn from 'frontend/js/components/ThemedTable/LotsWonCells/_components/Buttons/InvoicePaymentBtn';
import useStyles from './useStyles';

function PurchaseDueCell({ className, invoice, hasCurrency, isCompact }) {
  const classes = useStyles();
  const { id, isB2BBroker, userPadUploadDisabled } = useCustomerHelper();

  if (!invoice) {
    return null;
  }

  const { paid, lotPurchase, amountApplied, dueDate, balanceRemaining, token, customer } = invoice;
  const isBalanceRemaining = balanceRemaining && parseFloat(balanceRemaining, 10) > 0;
  const isLotPurchase = Boolean(lotPurchase);
  const isUserPurchase = id === customer.id;
  const hasAppliedAmount = parseFloat(amountApplied, 10) > 0;
  const isBosSigned = isLotPurchase && lotPurchase.bosSigned;

  const isRelistAvailable = useRelistAvailable(lotPurchase, invoice);

  return (
    <div className={classnames(classes.root, className)}>
      <Amount
        value={paid ? 0 : parseFloat(balanceRemaining, 10)}
        hasCurrency={hasCurrency}
        className={classes.amount}
      />

      {isLotPurchase && (
        <>
          {!isBosSigned && paid && !userPadUploadDisabled ? (
            <div className={classes.cta}>
              <DocumentToSign lotPurchase={lotPurchase} isRegularCase />
            </div>
          ) : (
            <div>
              {isBalanceRemaining && (
                <div className="mb-5">
                  {isUserPurchase || isB2BBroker ? (
                    <InvoicePaymentBtn token={token} isRegularCase />
                  ) : (
                    <DownloadInvoicePopoverBtn
                      token={token}
                      isLotPurchase={isLotPurchase}
                      dueDate={dueDate}
                      isRegularCase
                    />
                  )}
                </div>
              )}

              {hasAppliedAmount && (
                <DownloadInvoiceBtn token={token} isLotPurchase={isLotPurchase} isRegularCase isCompact={isCompact} />
              )}

              {isRelistAvailable && (
                <div className={classes.cancelPurchase}>
                  <CancelPurchaseBtn lotPurchase={lotPurchase} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

PurchaseDueCell.propTypes = {
  className: PropTypes.string,
  hasCurrency: PropTypes.bool,
  isCompact: PropTypes.bool,
};

PurchaseDueCell.defaultProps = {
  className: '',
  hasCurrency: true,
  isCompact: false,
};

export default PurchaseDueCell;
