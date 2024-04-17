import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function ABMInvoiceDetails({ invoice, comparison }) {
  const classes = useStyles();

  if (!invoice.items.length) {
    return null;
  }

  function getAmountClass(itemId) {
    const found = comparison.find((item) => item.invoiceItemId === itemId);
    const classList = [];
    if (found) {
      classList.push(classes.amount);
      classList.push(found.isEqual ? classes.amount_equal : classes['amount_not-equal']);
    }
    return classList.join(' ');
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>Invoice AutoBidMaster #{invoice.token}</div>
      <Table>
        <TableBody>
          {invoice.items.map(({ txnDate, productService, subtotal, description, id }, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className={getAmountClass(id)}>{NumberService.formatUsCurrency(subtotal, true)}</div>
              </TableCell>
              <TableCell>{productService.name}</TableCell>
              {productService.objectKey === 'StorageFee' && description ? (
                <TableCell>{description}</TableCell>
              ) : (
                <TableCell>{DateTimeService.formatFromISOString(txnDate)}</TableCell>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{NumberService.formatUsCurrency(invoice.amount, true)}</TableCell>
            <TableCell>
              <span className={classes.total}>TOTAL</span>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{NumberService.formatUsCurrency(invoice.amountApplied, true)}</TableCell>
            <TableCell>
              <span className={classes.total}>PAID</span>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{NumberService.formatUsCurrency(invoice.balanceRemaining, true)}</TableCell>
            <TableCell>
              <span className={classes.total}>NET DUE</span>
            </TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

ABMInvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
  comparison: PropTypes.array.isRequired,
};

export default ABMInvoiceDetails;
