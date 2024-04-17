import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow } from '@material-ui/core';
import get from 'lodash/get';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import Select from 'backend/js/components/Form/Select';
import RouterService from 'backend/js/api/RouterService';
import CustomerService from 'backend/js/api/CustomerService';
import NumberService from 'backend/js/lib/utils/NumberService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import useStyles from './useStyles';

function CustomerDetails({ formik, customer, payments, invoices, onUnpaidChange, onPaymentChange }) {
  const classes = useStyles();
  const status = CustomerService.STATUSES[customer.status];
  const buyerPowerAmount = customer.blAmount - customer.blUsedAmount;

  return (
    <div className={classes.root}>
      <div className={classes.title}>Customer Details</div>
      <Table>
        <TableBody>
          <TableRow className={classes.hide} />
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              <a
                href={RouterService.getRoute('customerNotes', null, { id: customer.id })}
                title="Go to Customer Mini Profile"
              >
                <strong>
                  {customer.firstName} {customer.lastName}
                </strong>
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>
              <strong>
                {[customer.address, customer.city, get(customer, 'state.code', ''), customer.zip]
                  .filter(Boolean)
                  .join(', ') || '-'}
              </strong>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>{customer.phoneNumber || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{customer.email || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Membership</TableCell>
            <TableCell>{get(customer, 'membershipType.name', '-')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Expiration date</TableCell>
            <TableCell>
              {customer.membershipValidity ? DateTimeService.formatFromISOString(customer.membershipValidity) : '-'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Deposit</TableCell>
            <TableCell>{NumberService.formatUsCurrency(buyerPowerAmount, true)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>{status || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bidder#</TableCell>
            <TableCell>{get(customer, 'bidder.id', '-')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Transaction fee</TableCell>
            <TableCell>
              ${get(customer, 'membershipType.transFeeMin', '-')} or &lt;{' '}
              {get(customer, 'membershipType.transFeePerc', '-')}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unpaid invoices</TableCell>
            <TableCell>
              <Select
                id="invoiceId"
                name="invoiceId"
                placeholder=""
                className="react-select-hollow"
                value={formik.values.invoiceId}
                error={formik.errors.invoiceId}
                onBlur={formik.setFieldTouched}
                onChange={(_, value) => {
                  onUnpaidChange(value || []);
                }}
                options={invoices}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.label}
                isSearchable
                isMulti
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wire</TableCell>
            <TableCell>
              <Select
                id="paymentId"
                name="paymentId"
                placeholder=""
                className="react-select-hollow"
                value={formik.values.paymentId}
                touched={formik.touched.paymentId}
                error={formik.errors.paymentId}
                onBlur={formik.setFieldTouched}
                onChange={(_, value) => {
                  onPaymentChange(parseInt(value, 10));
                }}
                options={payments}
                onChangeAttribute="id"
                formatOptionLabel={(option) => option.label}
                isSearchable
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

CustomerDetails.propTypes = {
  formik: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  customer: PropTypes.object.isRequired,
  payments: PropTypes.array.isRequired,
  invoices: PropTypes.array.isRequired,
  onUnpaidChange: PropTypes.func.isRequired,
  onPaymentChange: PropTypes.func.isRequired,
};

export default CustomerDetails;
