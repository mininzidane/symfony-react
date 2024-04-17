import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import ButtonLink from 'backend/js/components/ButtonLink';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import TableCell from 'backend/js/components/Table/TableCell';
import TableHeadSortableCell from 'backend/js/components/Table/TableHeadSortableCell';

function ResultsTable({ results, sort, order, onSort }) {
  if (!results) {
    return null;
  }

  if (results.noHistoryExists) {
    return 'No History Exists';
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRun = results?.runs[currentIndex] || null;

  return (
    <>
      <TableContainer className="m-t">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadSortableCell
                id="auctionDate"
                onSort={onSort}
                sortField={sort}
                sortOrder={order}
                style={{ width: 114 }}
                className="ta-c"
              >
                Auction Date
              </TableHeadSortableCell>
              <TableCell className="ta-c">High Bid Amount</TableCell>
              <TableCell className="ta-c">Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.runs?.map((result, index) => (
              <TableRow key={index}>
                <TableCell className="ta-c">
                  <ButtonLink
                    label={DateTimeService.formatFromISOString(result.saleDate.date, 'MM/dd/yyyy')}
                    onClick={() => setCurrentIndex(index)}
                  />
                </TableCell>
                <TableCell className="ta-r">
                  <span className="text-navy ta-r">{NumberService.formatCurrency(result.highBid)}</span>
                </TableCell>
                <TableCell>{result.resultStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentRun && (
        <>
          <div className="m-b">
            Auction Date:{' '}
            <strong className="mr-15">
              {DateTimeService.formatFromISOString(currentRun.saleDate.date, 'MM/dd/yyyy')}
            </strong>{' '}
            Sale Platform: <strong>{currentRun.salePlatform}</strong>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Odometer</TableCell>
                  <TableCell>Reserve Amount</TableCell>
                  <TableCell>High Bid Amount</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Item #</TableCell>
                  <TableCell># of Bidders</TableCell>
                  <TableCell># of Countries</TableCell>
                  <TableCell># of States</TableCell>
                  <TableCell># of Runs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="ta-r">{NumberService.formatNumber(currentRun.odometer)}</TableCell>
                  <TableCell className="ta-r">
                    {currentRun.btbaFlag ? 'BTBA' : NumberService.formatCurrency(currentRun.reserveAmount)}
                  </TableCell>
                  <TableCell className="ta-r">
                    <span className="text-navy">{NumberService.formatCurrency(currentRun.highBid)}</span>
                  </TableCell>
                  <TableCell>{currentRun.saleYardName}</TableCell>
                  <TableCell className="ta-c">{currentRun.itemNumber}</TableCell>
                  <TableCell className="ta-c">{currentRun.numberOfBidders}</TableCell>
                  <TableCell className="ta-c">{currentRun.numberOfCountries}</TableCell>
                  <TableCell className="ta-c">{currentRun.numberOfStates}</TableCell>
                  <TableCell className="ta-c">{currentRun.numberOfRuns}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="ta-c">Bid Date</TableCell>
                  <TableCell className="ta-c">Bid Time</TableCell>
                  <TableCell className="ta-c">Bid Amount</TableCell>
                  <TableCell className="ta-c">Auction (Bid Type)</TableCell>
                  <TableCell className="ta-c">State</TableCell>
                  <TableCell className="ta-c">Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRun.bids?.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="ta-c">
                      {DateTimeService.formatFromISOString(result.time.date, 'MM/dd/yyyy')}
                    </TableCell>
                    <TableCell className="ta-c">
                      {DateTimeService.formatFromISOString(result.time.date, 'h:mm aaa')}
                    </TableCell>
                    <TableCell className="ta-r">{NumberService.formatCurrency(result.amount)}</TableCell>
                    <TableCell>{result.action}</TableCell>
                    <TableCell className="ta-c">{result.stateCode}</TableCell>
                    <TableCell>{result.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

ResultsTable.propTypes = {
  results: PropTypes.object,
  onSort: PropTypes.func,
  sort: PropTypes.string,
  order: PropTypes.string,
};

ResultsTable.defaultProps = {
  results: null,
  sort: undefined,
  order: 'asc',
  onSort: () => null,
};

export default ResultsTable;
