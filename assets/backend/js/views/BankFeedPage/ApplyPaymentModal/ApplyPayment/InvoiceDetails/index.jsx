import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function InvoiceDetails({ invoice, comparison }) {
  const classes = useStyles();
  const totalAmount = invoice.items.reduce((acc, cur) => acc + (cur.amount > 0 ? Number(cur.amount) : 0), 0);
  const paid = invoice.items.reduce((acc, cur) => acc + (cur.amount < 0 ? Number(cur.amount) * -1 : 0), 0);

  function getAmountClass(index) {
    const found = comparison.find((item) => item.copartKey === index);
    const classList = [];
    if (found) {
      classList.push(classes.amount);
      classList.push(found.isEqual ? classes.amount_equal : classes['amount_not-equal']);
    }
    return classList.join(' ');
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>Copart Invoice</div>
      <Table>
        <TableBody>
          {!invoice.items.length ? (
            <TableRow>
              <TableCell className={classes.emptyState} colSpan="2">
                -
              </TableCell>
            </TableRow>
          ) : (
            <>
              {invoice.items.map(({ date, account, amount }, index) => (
                <TableRow key={index}>
                  <TableCell>{DateTimeService.formatFromISOString(date)}</TableCell>
                  <TableCell>{account}</TableCell>
                  <TableCell>
                    <div className={getAmountClass(index)}>{NumberService.formatUsCurrency(amount, true)}</div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <span className={classes.total}>TOTAL</span>
                </TableCell>
                <TableCell>{NumberService.formatUsCurrency(totalAmount, true)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <span className={classes.total}>PAID</span>
                </TableCell>
                <TableCell>{NumberService.formatUsCurrency(paid, true)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>
                  <span className={classes.total}>NET DUE</span>
                </TableCell>
                <TableCell>{NumberService.formatUsCurrency(invoice.due, true)}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
  comparison: PropTypes.array.isRequired,
};

export default InvoiceDetails;
