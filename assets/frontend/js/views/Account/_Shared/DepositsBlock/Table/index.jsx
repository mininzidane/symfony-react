import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
import ReleaseDepositButton from './ReleaseDepositButton';
import ReleaseConfirmModal from './ReleaseConfirmModal';
import TableRowGroup from './TableRowGroup';
import ListCard from './ListCard';
import useStyles from './useStyles';

function DepositsTable({ data, onReleaseSuccess }) {
  const classes = useStyles();
  const { formatFromISOString } = DateTimeService;
  const { formatCurrency } = NumberService;
  const { isAboveSm } = useBreakpoint();
  const [transactions, setTransactions] = useState([]);
  const cellCount = 5;
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [releaseRequestType, setReleaseRequestType] = useState('');
  const [releaseRequestBankFeed, setReleaseRequestBankFeed] = useState(null);
  const [releaseRequestAmount, setReleaseRequestAmount] = useState('');
  const [releaseRequestCreditCard, setReleaseRequestCreditCard] = useState('');
  const [releaseRequestToken, setReleaseRequestToken] = useState('');
  const [isReleaseRequest, setIsReleaseRequest] = useState(false);
  const [isButtonsLocked, setButtonsLocked] = useState(false);

  function openConfirmModal(token, refundType, amount, bankFeed, creditCard, isRelease) {
    setReleaseRequestToken(token);
    setReleaseRequestType(refundType);
    setReleaseRequestAmount(amount);
    setReleaseRequestCreditCard(creditCard);
    setReleaseRequestBankFeed(bankFeed);
    setIsReleaseRequest(isRelease);
    setConfirmModalOpen(true);
  }

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
    { style: { width: 200, paddingLeft: 25 } },
  ];

  const mobileHeadData = [
    { label: <FormattedMessage id="depositsPage.transactions.thead.transactionDate" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.transactionType" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.comments" /> },
    { label: <FormattedMessage id="depositsPage.transactions.thead.creditAmount" /> },
    {},
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

      if (subTransactionsArray.length) {
        subTransactionsArray.push([{ content: formatCurrency(balance), align: 'right' }]);
      }
    }

    return subTransactionsArray;
  }

  function composeTransactions() {
    const transactionsArray = data.map((transaction) => {
      const { masterTransaction, balance, transactions: subTransactions, refundIsAllowed } = transaction;
      const { vectorLabel, txnDate, type, refundType, token: masterToken, bankFeed, memo } = masterTransaction;

      return [
        { content: formatFromISOString(txnDate) },
        { content: vectorLabel },
        { content: memo || <TransactionType type={type} />, style: { wordBreak: 'break-all' } },
        { content: formatCurrency(balance), align: 'right' },
        {
          content: refundIsAllowed && (
            <ReleaseDepositButton
              onClick={openConfirmModal}
              setButtonsLocked={setButtonsLocked}
              refundType={refundType}
              token={masterToken}
              amount={balance}
              bankFeed={bankFeed}
              creditCard={vectorLabel}
            />
          ),
          align: 'right',
          style: { paddingTop: 15, paddingBottom: 15 },
          mobileStyle: { paddingTop: 10, paddingBottom: 10 },
        },
        { content: composeSubTransactions(subTransactions, balance, masterToken) },
      ];
    });

    setTransactions(transactionsArray);
  }

  function calcAppliedAmount(rowData) {
    return rowData[cellCount].content.reduce(
      (acc, cur) => acc + (cur[3] ? parseFloat(cur[3].content.replace(/[^0-9]/g, '')) : 0),
      0,
    );
  }

  useEffect(() => {
    composeTransactions();
  }, [data]);

  return (
    <div className={classnames({ [classes.buttonsLocked]: isButtonsLocked })}>
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
                <TableRowGroup
                  cellCount={cellCount}
                  rowData={transactions[rowIndex]}
                  appliedAmount={calcAppliedAmount(transactions[rowIndex])}
                  key={rowIndex}
                />
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
              appliedAmount={calcAppliedAmount(transactions[cardIndex])}
              cardData={transactions[cardIndex] || []}
              key={cardIndex}
            />
          ))}
        </div>
      )}

      <ReleaseConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        bankFeed={releaseRequestBankFeed}
        refundType={releaseRequestType}
        amount={releaseRequestAmount}
        creditCard={releaseRequestCreditCard}
        token={releaseRequestToken}
        isRelease={isReleaseRequest}
        onReleaseSuccess={onReleaseSuccess}
      />
    </div>
  );
}

DepositsTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  onReleaseSuccess: PropTypes.func.isRequired,
};

export default DepositsTable;
