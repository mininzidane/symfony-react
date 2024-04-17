import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import TableBody from 'frontend/js/components/Table/TableBody';
import TableRow from 'frontend/js/components/Table/TableRow';
import TableCell from 'frontend/js/components/Table/TableCell';
import Table from 'frontend/js/components/Table/Table';
import TableHead from 'frontend/js/components/Table/TableHead';
import TableContainer from 'frontend/js/components/Table/TableContainer';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import TransactionType from '../../TransactionType';
import TableRowGroup from './TableRowGroup';
import ListCard from './ListCard';

function ClosedTransactionsTable({ data }) {
  const { formatFromISOString } = DateTimeService;
  const { formatCurrency } = NumberService;
  const [transactions, setTransactions] = useState([]);
  const { isAboveSm } = useBreakpoint();
  const cellCount = 4;

  const headData = [
    { label: <FormattedMessage id="depositsPage.transactions.thead.date" />, style: { minWidth: 180, width: 180 } },
    {
      label: <FormattedMessage id="depositsPage.transactions.thead.description" />,
      style: { minWidth: 200, width: 200 },
    },
    { label: <FormattedMessage id="depositsPage.transactions.thead.notes" /> },
    {
      label: <FormattedMessage id="depositsPage.transactions.thead.amount" />,
      align: 'right',
      style: { paddingRight: 40 },
    },
  ];

  const mobileHeadData = [
    { label: <FormattedMessage id="depositsPage.transactions.thead.transactionDate" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.transactionType" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.comments" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.creditAmount" /> },
  ];

  function composeSubTransactions(subTransactionsData, balance, masterToken) {
    const subTransactionsArray = [];

    if (Array.isArray(subTransactionsData)) {
      subTransactionsData.forEach((subTransaction) => {
        const { amount, memo, txnDate, invoiceItem, token, type } = subTransaction;

        const invoiceMemo = invoiceItem && invoiceItem.invoice && invoiceItem.invoice.memo;
        const invoiceDescription = invoiceItem && invoiceItem.description;

        if (token !== masterToken) {
          subTransactionsArray.push([
            { content: formatFromISOString(txnDate), style: { width: 148 } },
            { content: memo || invoiceMemo || <TransactionType type={type} />, style: { width: '31.5%' } },
            { content: invoiceDescription },
            { content: formatCurrency(Math.abs(amount)), align: 'right' },
          ]);
        }
      });

      subTransactionsArray.push([{ content: formatCurrency(balance), align: 'right' }]);
    }

    return subTransactionsArray;
  }

  function composeTransactions() {
    const transactionsArray = data.map((transaction) => {
      const { masterTransaction, balance, transactions: subTransactions } = transaction;
      const { vectorLabel, txnDate, type, amount, token: masterToken } = masterTransaction;

      return [
        { content: formatFromISOString(txnDate) },
        { content: vectorLabel },
        { content: <TransactionType type={type} />, style: { wordBreak: 'break-all' } },
        { content: formatCurrency(amount), align: 'right', style: { paddingRight: 40 } },
        { content: composeSubTransactions(subTransactions, balance, masterToken) },
      ];
    });

    setTransactions(transactionsArray);
  }

  useEffect(() => {
    composeTransactions();
  }, [data]);

  return (
    <>
      {isAboveSm ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headData.map((cell, cellIndex) => (
                  <TableCell align={cell.align} style={cell.style} key={cellIndex}>
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody shadow>
              {transactions.map((row, rowIndex) => (
                <TableRowGroup cellCount={cellCount} rowData={transactions[rowIndex]} key={rowIndex} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          {transactions.map((card, cardIndex) => (
            <ListCard
              headData={mobileHeadData}
              cellCount={cellCount}
              cardData={transactions[cardIndex]}
              key={cardIndex}
            />
          ))}
        </div>
      )}
    </>
  );
}

ClosedTransactionsTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default ClosedTransactionsTable;
