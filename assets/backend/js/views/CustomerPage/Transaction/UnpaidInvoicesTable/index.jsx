import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table from 'backend/js/components/Table/Table';
import { TableBody, TableFooter, TableHead, TableRow } from '@material-ui/core';
import TableCell from 'backend/js/components/Table/TableCell';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import RouterService from 'backend/js/api/RouterService';
import PopupWindowLink from 'backend/js/components/PopupWindowLink';
import SubmitButton from 'backend/js/components/SubmitButton';
import AmountCheckbox from 'backend/js/views/CustomerPage/Transaction/AmountCheckbox';
import TransactionService from 'backend/js/api/TransactionService';

const PROCESSING_BATCH_SIZE = 2;

function UnpaidTable({ transaction, invoices }) {
  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyDisabled, setApplyDisabled] = useState(false);
  const transactionService = new TransactionService();
  const transactionTotal = transaction.groupRemainingBalance || parseFloat(transaction.amount);

  function getAvailableAmountByInvoice(invoiceToken) {
    if (!checked.length) {
      return transactionTotal;
    }

    const appliedToOther = checked.reduce((acc, cur) => {
      if (cur.invoice.token === invoiceToken) {
        return acc;
      }

      return acc + cur.amount;
    }, 0);

    return Math.max(transactionTotal - appliedToOther, 0);
  }

  function calculateTotalAmount() {
    if (checked.length === 0) {
      return 0.0;
    }

    let sum = 0;
    checked.forEach((item) => {
      sum += item.amount;
    });

    return parseFloat(sum);
  }

  function onChangeCheckbox(isChecked, invoice, amount) {
    if (isChecked) {
      setChecked((items) => [...items, { invoice, amount }]);
      return;
    }

    setChecked((items) => items.filter((item) => item.invoice.token !== invoice.token));
  }

  function onChangeAmount(amount, invoice) {
    setChecked((items) => {
      items.forEach((item) => {
        if (item.invoice.token === invoice.token) {
          item.amount = parseFloat(amount);
        }
      });

      return [...items];
    });
  }

  async function onApply() {
    setError(null);
    const total = calculateTotalAmount();
    if (total <= 0) {
      setError('The total amount must be more 0');
      return;
    }

    if (total > transactionTotal) {
      setError('The total amount exceeds the allowable on transaction');
      return;
    }

    setLoading(true);
    const items = checked.filter((item) => item.amount > 0);
    const params = items.map((item) => ({ invoice: item.invoice.token, amount: item.amount }));

    try {
      for (let i = 0; i < params.length; i += PROCESSING_BATCH_SIZE) {
        const batch = params.slice(i, i + PROCESSING_BATCH_SIZE);
        // eslint-disable-next-line no-await-in-loop
        await transactionService.applyTransaction(transaction.token, batch);
      }

      window.location.reload();
      setApplyDisabled(true);
    } catch (e) {
      const serverError = get(e, 'response.data.errors.error', 'Error, please reload the page and apply again.');
      setError(serverError);
      setApplyDisabled(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    setError(null);
  }, [checked]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Inv #</TableCell>
          <TableCell>Inv Date</TableCell>
          <TableCell>Memo</TableCell>
          <TableCell>Invoice amount</TableCell>
          <TableCell>Invoice due</TableCell>
          <TableCell>Amount to apply</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.token}>
            <TableCell>
              <>
                <a href={RouterService.getRoute('invoiceView', null, { token: invoice.token })}>{invoice.token}</a>
                &nbsp;
                <PopupWindowLink
                  label={<i className="fa fa-file-text-o" />}
                  url={RouterService.getRoute('invoiceTextView', null, { token: invoice.token })}
                  title="View text version"
                  width={700}
                  height={800}
                />
              </>
            </TableCell>
            <TableCell>
              <>{DateTimeService.formatFromISOString(invoice.txnDate)}</>
            </TableCell>
            <TableCell>
              <div className="text-muted">{invoice.memo}</div>
            </TableCell>
            <TableCell>{NumberService.formatUsCurrency(invoice.subtotal, true)}</TableCell>
            <TableCell>
              <div className="text-danger">
                <b>{NumberService.formatUsCurrency(invoice.balanceRemaining, true)}</b>
              </div>
            </TableCell>
            <TableCell>
              <AmountCheckbox
                invoice={invoice}
                availableAmount={getAvailableAmountByInvoice(invoice.token)}
                onChangeAmount={onChangeAmount}
                onChangeCheckbox={onChangeCheckbox}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {Object.values(checked).length > 0 && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan="5">
              <>
                {error && (
                  <div className="pull-right has-error">
                    <div className="help-block">{error}</div>
                  </div>
                )}
              </>
            </TableCell>
            <TableCell>
              <div className="pull-right">
                <SubmitButton
                  className="btn btn-primary btn-outline"
                  onClick={onApply}
                  disabled={loading || applyDisabled}
                  isLoading={loading}
                  label={
                    <>
                      <i className="fa fa-check" /> Apply
                    </>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

UnpaidTable.propTypes = {
  transaction: PropTypes.object.isRequired,
  invoices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UnpaidTable;
