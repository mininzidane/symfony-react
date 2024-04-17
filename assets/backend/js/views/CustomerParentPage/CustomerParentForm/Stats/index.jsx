import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import { TableBody, TableRow } from '@material-ui/core';
import TableCell from 'backend/js/components/Table/TableCell';
import Table from 'backend/js/components/Table/Table';
import NumberService from 'backend/js/lib/utils/NumberService';
import TableHead from 'backend/js/components/Table/TableHead';
import Button from 'backend/js/components/Button';
import DatePicker from 'backend/js/components/DatePicker';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';

function Stats({ customerParent }) {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  const [date, setDate] = useState(null);
  const customerParentService = new CustomerParentService();

  useEffect(() => {
    if (!date) {
      return;
    }
    customerParentService
      .getStats(customerParent.id, { date: DateTimeService.format(date) })
      .then(({ stats: data }) => {
        setStats((values) => [values[0], data]);
      });
  }, [date]);

  function loadStats() {
    if (loading) {
      return;
    }
    setLoading(true);
    customerParentService
      .getStats(customerParent.id)
      .then(({ stats: data }) => {
        setStats([data]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getRiskColor() {
    if (!stats?.risk?.valueOfPaidCars && !stats?.risk?.valueOfCarsInTransit) {
      return '';
    }
    if (stats?.risk?.valueOfPaidCars > stats?.risk?.valueOfCarsInTransit) {
      return 'green';
    }
    return 'red';
  }

  return (
    <>
      <h2>Stats</h2>
      {Object.values(stats).length === 0 ? (
        <Button onClick={loadStats} isLoading={loading} label="Load" />
      ) : (
        <>
          <DatePicker
            placeholder="Date"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
            className="mb-10"
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowspan="2" />
                <TableCell colspan="2">Current</TableCell>
                {(stats[1] || null) && <TableCell colspan="2">{DateTimeService.format(date)}</TableCell>}
              </TableRow>
              <TableRow>
                {stats.map(() => (
                  <>
                    <TableCell>Count</TableCell>
                    <TableCell>Amount</TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span title="All vehicles prepaid to auction (excl. transaction fees) which have unpaid invoices by customer">
                    Prepaid cars in US
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.prepaidCarsInUs?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.prepaidCarsInUs?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All paid vehicles by customer, which are still in the US">Paid cars in US</span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.paidCarsInUs?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.paidCarsInUs?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All paid vehicles by customer, which are already left US and sailing">
                    Paid cars in transit
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.paidCarsInTransit?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.paidCarsInTransit?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All unpaid invoices for shipping and paid to driver for all cars with active status">
                    Prepaid ground shipping
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.pprepaidGroundShipping?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.prepaidGroundShipping?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All unpaid invoices for shipping and paid to warehouse for all cars with active status">
                    Prepaid ocean shipping
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.prepaidOceanShipping?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.prepaidOceanShipping?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All unpaid invoices for shipping and paid to warehouse for all cars with active status">
                    Total prepaid shipping
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.totalPrepaidShipping?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.totalPrepaidShipping?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All paid invoices for shipping for vehicles with active status">Paid shipping</span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.paidShipping?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.paidShipping?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All unpaid invoices for shipping for vehicles with active status">
                    Shipping due prior delivery
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.shippingDuePriorDelivery?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.shippingDuePriorDelivery?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="All unpaid invoices for shipping for vehicles, which already delivered to country of destination">
                    Shipping due after delivery
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <>
                    <TableCell>{stat?.shippingDueAfterDelivery?.count || 0}</TableCell>
                    <TableCell>{NumberService.formatUsCurrency(stat?.shippingDueAfterDelivery?.amount || 0)}</TableCell>
                  </>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="Paid cars in US x 160% vs Paid cars in transit x 80%">Risk</span>:
                </TableCell>
                {stats.map((stat) => (
                  <TableCell colSpan={2}>
                    <span title="Value of paid cars">
                      {NumberService.formatUsCurrency(stat?.risk?.valueOfPaidCars || 0)}
                    </span>
                    &nbsp;/&nbsp;
                    <span style={{ color: getRiskColor() }} title="Value of cars in transit">
                      {NumberService.formatUsCurrency(stat?.risk?.valueOfCarsInTransit || 0)}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell>
                  <span title="Sum of all prepaid vehicles in the US and all prepaid invoices to drivers and warehouses">
                    Current Investment
                  </span>
                </TableCell>
                {stats.map((stat) => (
                  <TableCell colSpan={2}>
                    {NumberService.formatUsCurrency(
                      parseFloat(stat?.prepaidCarsInUs?.amount || 0, 10) +
                        parseFloat(stat?.totalPrepaidShipping?.amount || 0),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

Stats.propTypes = {
  customerParent: PropTypes.object.isRequired,
};

Stats.defaultProps = {};

export default Stats;
