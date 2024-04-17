import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Table from 'backend/js/components/Table/Table';
import { Checkbox, TableBody, TableFooter, TableHead, TableRow } from '@material-ui/core';
import TableCell from 'backend/js/components/Table/TableCell';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import RouterService from 'backend/js/api/RouterService';
import PopupWindowLink from 'backend/js/components/PopupWindowLink';
import SubmitButton from 'backend/js/components/SubmitButton';
import TransactionService from 'backend/js/api/TransactionService';
import IBox from '../../../../components/IBox';

function PaidInvoicesTable({ transactionToken, excludeBidders }) {
  const [transactions, setTransactions] = useState([]);
  const [checked, setChecked] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const transactionService = new TransactionService();

  async function loadAllTransactionPages() {
    let page = 1;
    let totalPages = 1;
    const updatedTransactions = [];

    do {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { data, lastPage } = await transactionService.getPaidTransactions(transactionToken, excludeBidders, page);
        if (data && data.length) {
          updatedTransactions.push(...data);
        }

        if (page === 1) {
          totalPages = lastPage;
        }

        page += 1;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Unable to load page', e);
      }
    } while (page <= totalPages);

    setTransactions(updatedTransactions);
  }

  useEffect(() => {
    (async () => {
      await loadAllTransactionPages();
      setPageLoading(false);
    })();
  }, []);

  if (pageLoading) {
    return <>Loading Paid Transactions</>;
  }

  if (!transactions) {
    return null;
  }

  function onChangeCheckbox(isChecked, token) {
    if (isChecked) {
      setChecked((items) => [...items, token]);
      return;
    }

    setChecked((items) => items.filter((item) => item !== token));
  }

  async function unApply() {
    setError(null);
    if (checked.length === 0) {
      setError('Please check invoices');
      return;
    }

    setLoading(true);
    try {
      await transactionService.unapplyTransactions(checked);
      setTransactions((items) => items.filter((item) => !checked.includes(item.token)));
      setChecked([]);
    } catch (e) {
      const serverError = get(e, 'response.data.errors.error', 'Undefined error');
      setError(serverError);
    }

    setLoading(false);
  }

  function toggleCheckAll(value) {
    if (value) {
      setChecked(transactions.map((item) => item.token));
    } else {
      setChecked([]);
    }
  }

  return (
    <IBox title="Paid Invoices">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Inv #</TableCell>
            <TableCell>Inv Date</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Applied</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell style={{ width: '170px' }}>
              {/* eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */}
              <label>
                <Checkbox onChange={(e) => toggleCheckAll(e.target.checked)} checked={checked.length > 0} /> Select All
              </label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={`${transaction.invoiceItem.invoice.token}_${transaction.invoiceItem.id}`}>
              <TableCell>
                <>
                  <a
                    href={RouterService.getRoute('invoiceView', null, { token: transaction.invoiceItem.invoice.token })}
                  >
                    {transaction.invoiceItem.invoice.token}
                  </a>
                  &nbsp;
                  <PopupWindowLink
                    label={<i className="fa fa-file-text-o" />}
                    url={RouterService.getRoute('invoiceTextView', null, {
                      token: transaction.invoiceItem.invoice.token,
                    })}
                    title="View text version"
                    width={700}
                    height={800}
                  />
                </>
              </TableCell>
              <TableCell>
                <>{DateTimeService.formatFromISOString(transaction.invoiceItem.invoice.txnDate)}</>
              </TableCell>
              <TableCell>
                {transaction.invoiceItem.invoice.memo}
                <br />
                <span className="text-muted">{transaction.invoiceItem.productService.name}</span>
              </TableCell>
              <TableCell>
                <small>{DateTimeService.formatFromISOString(transaction.processed, 'MM/dd/yyyy H:mmaaa')}</small>
                <br />
                {transaction.processedBy && (
                  <b>{`${transaction.processedBy.firstName} ${transaction.processedBy.lastName}`}</b>
                )}
              </TableCell>
              <TableCell>
                <div className="pull-right">
                  <b>{NumberService.formatUsCurrency(transaction.amount, true)}</b>
                </div>
              </TableCell>
              <TableCell>
                <Checkbox
                  onChange={(e) => onChangeCheckbox(e.target.checked, e.target.value)}
                  checked={checked.includes(transaction.token)}
                  value={transaction.token}
                />
                <a
                  href={RouterService.getRoute('transactionUnapply', null, { token: transaction.token })}
                  className="btn btn-primary btn-outline require-confirmation"
                  data-confirm-message="Do you want to delete? This action can not be undone."
                >
                  <i className="fa fa-trash" /> Unapply
                </a>
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
                    onClick={unApply}
                    disabled={loading}
                    isLoading={loading}
                    label={
                      <>
                        <i className="fa fa-trash" /> Unapply
                      </>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </IBox>
  );
}

PaidInvoicesTable.propTypes = {
  transactionToken: PropTypes.string.isRequired,
  excludeBidders: PropTypes.bool,
};

PaidInvoicesTable.defaultProps = {
  excludeBidders: false,
};

export default PaidInvoicesTable;
