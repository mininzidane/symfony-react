import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';
import HowToPayButton from './HowToPayButton';
import InvoiceDownloadLink from './InvoiceDownloadLink';
import BalanceValue from './BalanceValue';
import LotPurchase from './LotPurchase';
import PaidOnlabel from './PaidOnlabel';
import InvoicePaymentButton from './InvoicePaymentButton';
import ShippingPaymentButton from './ShippingPaymentButton';
import HowToPayModal from './HowToPayModal';
import useStyles from './useStyles';

function PurchasesTable({ data }) {
  const classes = useStyles();
  const { formatFromISOString } = DateTimeService;
  const { formatCurrency } = NumberService;
  const [howToPayModalData, setHowToPayModalData] = useState(null);
  const [purchases, setPurchases] = useState([]);

  function composeDeposits() {
    const purchasesArray = data.map((purchase) => {
      const {
        created,
        memo,
        subtotal,
        amountApplied,
        balanceRemaining,
        paidInFull,
        token,
        lotPurchase,
        shippingOrder,
        dueDate,
      } = purchase;

      function renderCta() {
        if (lotPurchase) {
          return (
            <>
              {lotPurchase.ccAllowed ? (
                <InvoicePaymentButton token={token} />
              ) : (
                <HowToPayButton onClick={() => setHowToPayModalData({ balanceRemaining, dueDate })} token={token} />
              )}
            </>
          );
        }

        if (shippingOrder) {
          return <ShippingPaymentButton token={shippingOrder.token} />;
        }

        return null;
      }

      return [
        { content: <span className={classes.contentText}>{formatFromISOString(created)}</span> },
        {
          content: lotPurchase ? (
            <LotPurchase lotPurchase={lotPurchase} />
          ) : (
            memo && <span className={classes.contentText}>{memo}</span>
          ),
        },
        {
          content: <InvoiceDownloadLink subtotal={formatCurrency(subtotal, 'USD', true)} token={token} />,
          align: 'right',
        },
        {
          content: <span className={classes.contentText}>{formatCurrency(amountApplied, 'USD', true)}</span>,
          align: 'right',
        },
        {
          content: <BalanceValue value={balanceRemaining} />,
          align: 'right',
        },
        {
          content: paidInFull ? <PaidOnlabel date={paidInFull} /> : renderCta(),
          align: 'right',
          style: { paddingTop: paidInFull ? 20 : 15, paddingBottom: paidInFull ? 20 : 15 },
          mobileStyle: { paddingTop: 10, paddingBottom: 10 },
        },
      ];
    });

    setPurchases(purchasesArray);
  }

  useEffect(() => {
    composeDeposits();
  }, [data]);

  return (
    <div>
      <AdaptiveTable
        headData={[
          { label: <FormattedMessage id="depositsPage.transactions.thead.date" />, style: { width: 140 } },
          {
            label: <FormattedMessage id="depositsPage.transactions.thead.description" />,
          },
          { label: <FormattedMessage id="depositsPage.transactions.thead.invoice" />, align: 'right' },
          { label: <FormattedMessage id="shared.label.paid" />, align: 'right' },
          { label: <FormattedMessage id="depositsPage.transactions.thead.balance" />, align: 'right' },
          {},
        ]}
        bodyData={purchases}
      />

      <HowToPayModal
        isOpen={Boolean(howToPayModalData)}
        onClose={() => setHowToPayModalData(null)}
        data={howToPayModalData}
      />
    </div>
  );
}

PurchasesTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default PurchasesTable;
