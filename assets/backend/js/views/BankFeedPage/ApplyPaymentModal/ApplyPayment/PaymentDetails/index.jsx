import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import RadioButton from 'backend/js/components/Form/RadioButton';
import Input from 'backend/js/components/Form/Input';
import DatePicker from 'backend/js/components/DatePicker';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function PaymentDetails({ formik, payment, invoiceId, invoiceDue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Payment Details</div>
      <Table>
        <TableBody>
          <TableRow className={classes.hide} />
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              <strong>{payment.senderName || '-'}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>
              <strong>{payment.senderAddress || '-'}</strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bank</TableCell>
            <TableCell>{payment.senderBankName || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment Date</TableCell>
            <TableCell>{payment.releasedAt || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment Method</TableCell>
            <TableCell>{payment.vector || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Amount received</TableCell>
            <TableCell>{NumberService.formatUsCurrency(payment.creditAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Invoice Due</TableCell>
            <TableCell>{invoiceDue}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Invoice #</TableCell>
            <TableCell>
              <strong>{invoiceId}</strong>
            </TableCell>
          </TableRow>
          {Boolean(formik.values.invoiceId) && (
            <TableRow>
              <TableCell>Amount Towards Invoice</TableCell>
              <TableCell>
                <Input
                  id="amountTowardsInvoice"
                  name="amountTowardsInvoice"
                  mask="currency"
                  value={formik.values.amountTowardsInvoice}
                  error={formik.errors.amountTowardsInvoice}
                  touched={formik.touched.amountTowardsInvoice}
                  onBlur={formik.setFieldTouched}
                  onChange={formik.setFieldValue}
                />
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Payment Applied On</TableCell>
            <TableCell>
              <DatePicker
                placeholder="Payment Applied On"
                value={formik.values.paymentAppliedDate}
                onChange={(value) => {
                  formik.setFieldValue('paymentAppliedDate', value);
                }}
                onBlur={() => formik.setFieldTouched('paymentAppliedDate', true)}
              />
              {formik.errors.paymentAppliedDate && (
                <div className="text-danger">{formik.errors.paymentAppliedDate}</div>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email changes notification to member?</TableCell>
            <TableCell>
              <RadioButton
                id="emailNotification1"
                label="Yes"
                name="emailNotification"
                value="1"
                isChecked={formik.values.emailNotification === '1'}
                onChange={formik.setFieldValue}
              />
              <RadioButton
                id="emailNotification2"
                label="No"
                name="emailNotification"
                value="0"
                isChecked={formik.values.emailNotification === '0'}
                onChange={formik.setFieldValue}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

PaymentDetails.defaultProps = {
  invoiceId: '',
  invoiceDue: '',
};

PaymentDetails.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  invoiceId: PropTypes.string,
  invoiceDue: PropTypes.string,
  payment: PropTypes.object.isRequired,
};

export default PaymentDetails;
