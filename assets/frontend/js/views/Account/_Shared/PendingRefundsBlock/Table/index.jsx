import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import AdaptiveTable from 'frontend/js/components/Table/AdaptiveTable';

function PendingRefundsTable({ data }) {
  const { formatFromISOString } = DateTimeService;
  const { formatCurrency } = NumberService;
  const [refunds, setRefunds] = useState([]);

  function composePendingRefunds() {
    const refundsArray = data.map((refund) => {
      const { actualAmount, requested, transaction, memo } = refund;
      const { vector } = transaction;

      return [
        { content: formatFromISOString(requested) },
        { content: vector },
        { content: formatCurrency(actualAmount), align: 'right' },
        { content: memo },
      ];
    });

    setRefunds(refundsArray);
  }

  useEffect(() => {
    composePendingRefunds();
  }, [data]);

  return (
    <AdaptiveTable
      headData={[
        {
          label: <FormattedMessage id="depositsPage.transactions.thead.dateRequested" />,
          style: { width: 160 },
        },
        {
          label: <FormattedMessage id="depositsPage.transactions.thead.transactionType" />,
          style: { width: 200 },
        },
        {
          label: <FormattedMessage id="depositsPage.transactions.thead.amount" />,
          align: 'right',
          style: { width: 100 },
        },
        { label: <FormattedMessage id="depositsPage.transactions.thead.notes" /> },
      ]}
      bodyData={refunds}
    />
  );
}

PendingRefundsTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default PendingRefundsTable;
