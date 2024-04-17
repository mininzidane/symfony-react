import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import NumberService from 'backend/js/lib/utils/NumberService';
import TableCell from 'backend/js/components/Table/TableCell';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';

function ResultsTable({ results }) {
  if (!results) {
    return null;
  }

  const total = results.reduce((a, b) => a + b.amount, 0);

  return (
    <>
      <TableContainer className="m-t">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="ta-c">Date</TableCell>
              <TableCell className="ta-c">Description</TableCell>
              <TableCell className="ta-c">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result, index) => (
              <TableRow key={index}>
                <TableCell>{DateTimeService.formatFromISOString(result.date.date, 'MM/dd/yyyy')}</TableCell>
                <TableCell>{result.description}</TableCell>
                <TableCell className="ta-r">
                  <span className="ta-r">{NumberService.formatCurrency(result.amount / 100, 'USD', 2)}</span>
                </TableCell>
              </TableRow>
            ))}
            <TableRow key="total">
              <TableCell />
              <TableCell>
                <strong>TOTAL COPART CHARGES</strong>
              </TableCell>
              <TableCell className="ta-r">
                <strong className="ta-r">
                  <strong>{NumberService.formatCurrency(total / 100, 'USD', 2)}</strong>
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

ResultsTable.propTypes = {
  results: PropTypes.array,
};

ResultsTable.defaultProps = {
  results: null,
};

export default ResultsTable;
