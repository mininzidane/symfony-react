import React from 'react';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import get from 'lodash/get';
import RouterService from 'backend/js/api/RouterService';
import CopyButton from 'backend/js/components/CopyButton';
import Table from '../../../components/Table/Table';
import PaginatedResponse from '../../../lib/propshapes/PaginatedResponse';
import DateTimeService from '../../../lib/utils/DateTimeService';
import TableCell from '../../../components/Table/TableCell';
import useStyles from './useStyles';

function ResultsTable({ results }) {
  const { formatFromISOString } = DateTimeService;
  const classes = useStyles();

  function getNumberOfBids(result) {
    const bids = result.bids || [];

    return bids.length;
  }

  function getLastBidDate(result) {
    const bids = result.bids || [];
    if (bids && bids.length) {
      const lastBid = bids[bids.length - 1];
      if (lastBid && lastBid.addedAt) {
        return formatFromISOString(lastBid.addedAt);
      }
    }

    return '';
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Membership</TableCell>
            <TableCell>Lots Won</TableCell>
            <TableCell>Shipping</TableCell>
            <TableCell>Last Visited</TableCell>
            <TableCell>Bid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.data.map((result) => (
            <TableRow key={result.id}>
              <TableCell>
                <div className={classes.customerTableCell}>
                  customer{' '}
                  <a
                    href={RouterService.getRoute('customerNotes', null, { id: result.id })}
                    title="Go to Customer Mini Profile"
                  >
                    {result.firstName} {result.lastName}
                  </a>{' '}
                  <span className="label label-warning m-r-xs">{result.notesCount}</span>
                  {result.scheduleA && <span className="label label-info m-r-xs">Schedule A</span>}
                  {result.scheduleA2C && <span className="label label-info m-r-xs">Schedule A to C</span>}
                  <br />
                  <span className="membership-type"> {get(result, 'membershipType.name', '')}</span>
                  <br />
                  {result.membershipValidity && (
                    <>
                      <span>until {formatFromISOString(result.membershipValidity)}</span>
                    </>
                  )}
                  <div className="ws-n">
                    <a href={`mailto:${result.email}`}>{result.email}</a>
                    <CopyButton value={result.email} />
                  </div>
                  {result.phoneNumber}
                </div>
              </TableCell>
              <TableCell>{get(result, 'country.name', '')}</TableCell>
              <TableCell>{get(result, 'state.name', '')}</TableCell>
              <TableCell>{get(result, 'membershipType.name', '')}</TableCell>
              <TableCell>
                <a href={RouterService.getRoute('customerInvoices', null, { id: result.id })}>
                  {' '}
                  {result && result.lotPurchases ? <>{result.lotPurchases.length}</> : <>0</>}{' '}
                </a>{' '}
              </TableCell>
              <TableCell>
                <a href={RouterService.getRoute('customerShippingOrders', null, { id: result.id })}>
                  {' '}
                  {result && result.shippingOrderCount ? <>{result.shippingOrderCount}</> : <>0</>}{' '}
                </a>{' '}
              </TableCell>
              <TableCell>{result.lastVisit && <span>{formatFromISOString(result.lastVisit)}</span>}</TableCell>
              <TableCell>
                <>
                  <div>Number of bids: {getNumberOfBids(result)}</div>
                  <div>Last Bid Date: {getLastBidDate(result)}</div>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ResultsTable.propTypes = {
  results: PaginatedResponse.isRequired,
};

export default ResultsTable;
