import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from '../../../components/Table/Table';
import PaginatedResponse from '../../../lib/propshapes/PaginatedResponse';
import DateTimeService from '../../../lib/utils/DateTimeService';
import TableCell from '../../../components/Table/TableCell';
import NumberService from '../../../lib/utils/NumberService';
import TableHeadSortableCell from '../../../components/Table/TableHeadSortableCell';

function ResultsTable({ results, sort, order, onSort }) {
  const { formatFromISOString } = DateTimeService;
  const { formatCurrency } = NumberService;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadSortableCell id="year" onSort={onSort} sortField={sort} sortOrder={order}>
              Year
            </TableHeadSortableCell>
            <TableCell>Make and Model</TableCell>
            <TableCell>Title Type</TableCell>
            <TableCell>Primary Damage</TableCell>
            <TableCell>Sale Location</TableCell>
            <TableHeadSortableCell id="mileage" onSort={onSort} sortField={sort} sortOrder={order}>
              Mileage
            </TableHeadSortableCell>
            <TableHeadSortableCell id="bid" onSort={onSort} sortField={sort} sortOrder={order}>
              Bid
            </TableHeadSortableCell>
            <TableHeadSortableCell id="saleDate" onSort={onSort} sortField={sort} sortOrder={order}>
              Sale Date
            </TableHeadSortableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.data.map((result) => (
            <TableRow key={`${result.id}_${result.lotId}`}>
              <TableCell>{result.year}</TableCell>
              <TableCell>
                {result.make} {result.model}
              </TableCell>
              <TableCell>{result.titleCategoryLabel}</TableCell>
              <TableCell>{result.primaryDamage}</TableCell>
              <TableCell>{result.saleLocation?.name}</TableCell>
              <TableCell>{result.odometer}</TableCell>
              <TableCell>{formatCurrency(result.highBid)}</TableCell>
              <TableCell>{formatFromISOString(result.saleDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ResultsTable.propTypes = {
  results: PaginatedResponse.isRequired,
  onSort: PropTypes.func,
  sort: PropTypes.string,
  order: PropTypes.string,
};

ResultsTable.defaultProps = {
  sort: undefined,
  order: 'asc',
  onSort: () => null,
};

export default ResultsTable;
