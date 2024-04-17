import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import IBox from 'backend/js/components/IBox';
import UnpaidTable from './UnpaidInvoicesTable';
import PaidInvoicesTable from './PaidInvoicesTable';

function UnpaidInvoices({ transaction, invoices }) {
  if (invoices.length === 0) {
    return null;
  }

  return (
    <IBox title="Unpaid Invoices">
      <UnpaidTable invoices={invoices} transaction={transaction} />
    </IBox>
  );
}

UnpaidInvoices.propTypes = {
  transaction: PropTypes.object.isRequired,
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const $unpaidInvoices = document.getElementById('customer-unpaid-invoices');
if ($unpaidInvoices) {
  const transaction = JSON.parse($unpaidInvoices.getAttribute('data-transaction'));
  const invoices = JSON.parse($unpaidInvoices.getAttribute('data-invoices'));
  ReactDOM.render(<UnpaidInvoices transaction={transaction} invoices={invoices} />, $unpaidInvoices);
}

const $paidInvoices = document.getElementById('customer-paid-invoices');
if ($paidInvoices) {
  const token = $paidInvoices.getAttribute('data-transaction');
  const excludeBidders = Boolean($paidInvoices.getAttribute('data-exclude-bidders'));
  ReactDOM.render(<PaidInvoicesTable transactionToken={token} excludeBidders={excludeBidders} />, $paidInvoices);
}
