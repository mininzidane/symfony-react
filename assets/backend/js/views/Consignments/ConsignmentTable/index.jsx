import React from 'react';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import TableHeadSortableCell from 'backend/js/components/Table/TableHeadSortableCell';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import Pagination from 'backend/js/components/Pagination';
import useConsignmentContext from '../_Context/useConsignmentContext';
import ConsignmentRow from './ConsignmentRow';
import useStyles from './useStyles';

function ConsignmentTable() {
  const classes = useStyles();
  const { initialized, loading, loadError, consignments, updateConsignment, pagination, queryParams, sorting } =
    useConsignmentContext();
  const { maxPagesCount, itemsPerPage, currentPage, total, setCurrentPage } = pagination || {};
  const { onSort, sort, order } = sorting;

  if (!initialized && loading) {
    return <div>loading</div>;
  }

  if (initialized && loadError) {
    return <div className="text text-danger">An error occurred while loading consignments.</div>;
  }

  if (!consignments.length) {
    return <div className={classes.emptyState}>Not found</div>;
  }

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className="bid-details">
          <TableHead>
            <TableRow>
              {queryParams?.sale_type !== 'SYC' && <TableCell>Member</TableCell>}
              <TableCell>Consignment Agreement</TableCell>
              <TableCell>New Lot</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Copart Location</TableCell>
              <TableCell>Copart Status</TableCell>
              <TableHeadSortableCell id="auctionDate" onSort={onSort} sortField={sort} sortOrder={order}>
                Sale Date
              </TableHeadSortableCell>
              <TableHeadSortableCell id="rerun" onSort={onSort} sortField={sort} sortOrder={order}>
                # of Reruns
              </TableHeadSortableCell>
              <TableCell>Reserve</TableCell>
              <TableCell>Sell my car cost</TableCell>
              <TableCell>Difference</TableCell>
              <TableCell>High Bid</TableCell>
              <TableCell>Bidding/Counter bidding</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consignments.map((consignment) => (
              <ConsignmentRow
                key={`consignment-${consignment.id}`}
                consignment={consignment}
                updateConsignment={updateConsignment}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        onPageUpdate={setCurrentPage}
        maxNumberOfPages={maxPagesCount}
        currentPage={currentPage}
        numResults={total}
        pageSize={itemsPerPage}
      />
    </>
  );
}

export default ConsignmentTable;
