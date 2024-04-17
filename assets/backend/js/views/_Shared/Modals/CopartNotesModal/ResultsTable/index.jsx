import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import TableCell from 'backend/js/components/Table/TableCell';
import TableHeadSortableCell from 'backend/js/components/Table/TableHeadSortableCell';

function ResultsTable({ results, sort, order, onSort }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadSortableCell id="date" onSort={onSort} sortField={sort} sortOrder={order} style={{ width: 114 }}>
              Created Date
            </TableHeadSortableCell>
            <TableHeadSortableCell id="text" onSort={onSort} sortField={sort} sortOrder={order}>
              Note Text
            </TableHeadSortableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{DateTimeService.formatFromISOString(result.date.date, 'MM/dd/yyyy h:mm aaa')}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: result.text }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ResultsTable.propTypes = {
  results: PropTypes.array,
  onSort: PropTypes.func,
  sort: PropTypes.string,
  order: PropTypes.string,
};

ResultsTable.defaultProps = {
  results: [],
  sort: undefined,
  order: 'asc',
  onSort: () => null,
};

export default ResultsTable;
