import React from 'react';
import classnames from 'classnames';
import { TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Table from 'backend/js/components/Table/Table';
import TableCell from 'backend/js/components/Table/TableCell';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';
import MemberTooltip from 'backend/js/views/_Shared/Tooltips/MemberTooltip';
import LotDescriptionTooltip from 'backend/js/views/_Shared/Tooltips/LotDescriptionTooltip';
import CurrentBidTooltip from 'backend/js/views/_Shared/Tooltips/CurrentBidTooltip';
import MaxBidTooltip from 'backend/js/views/_Shared/Tooltips/MaxBidTooltip';
import CounterbidNotesTooltip from 'backend/js/views/_Shared/Tooltips/CounterbidNotesTooltip';
import CustomerFull from 'backend/js/views/_Shared/Micro/CustomerFull';
import SellerTooltip from 'backend/js/views/_Shared/Tooltips/SellerTooltip';
import RBATooltip from 'backend/js/views/_Shared/Tooltips/RBATooltip';
import SalesHistoryTooltip from 'backend/js/views/_Shared/Tooltips/SalesHistoryTooltip';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import LotDescription from 'backend/js/views/_Shared/Micro/LotDescription';
import BidInformation from 'backend/js/views/Bid/CounterBid/BidsTable/BidInformation';
import SaleHistory from 'backend/js/views/Bid/CounterBid/BidsTable/SaleHistory';
import LatestActivity from 'backend/js/views/Bid/CounterBid/BidsTable/LatestActivity';
import ShippingInformation from 'backend/js/views/Bid/CounterBid/BidsTable/ShippingInformation';
import BidService from '../../../../api/BidService';
import useStyles from './useStyles';

function BidsTable() {
  const { initialized, loading, loadError, bids, enableRefresh, disableRefresh } = useCounterBidContext();
  const classes = useStyles();

  if (!initialized && loading) {
    return <div>loading</div>;
  }

  if (initialized && loadError) {
    return <div className="text text-danger">An error occurred while loading counter bids.</div>;
  }

  function getBidClassList(bid) {
    const { status, lot } = bid;
    const bidClasses = [classes.row, status.replace(/\s/g, '-')];

    if (lot && lot.saleDate) {
      const today = DateTimeService.format(new Date());
      const saleDate = DateTimeService.formatFromISOString(lot.saleDate);
      if (today === saleDate) {
        bidClasses.push('current-sale-date');
      }
    }

    return bidClasses.join(' ');
  }

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className="bid-details">
        <TableHead>
          <TableRow>
            <TableCell>
              <MemberTooltip />
            </TableCell>
            <TableCell>
              <LotDescriptionTooltip />
              <br />
              <SellerTooltip />
              <br />
              <RBATooltip />
            </TableCell>
            <TableCell>
              <SalesHistoryTooltip />
            </TableCell>
            <TableCell>
              <CurrentBidTooltip />
              <br />
              <MaxBidTooltip />
            </TableCell>
            <TableCell>
              <CounterbidNotesTooltip />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid) => (
            <TableRow key={`bid-${bid.id}`} className={getBidClassList(bid)}>
              <TableCell className="customer">
                <CustomerFull
                  customer={bid.customer}
                  bid={bid}
                  category={BidService.CATEGORY_TEMPLATE}
                  showLocalTime
                  showLocale
                  onModalOpen={disableRefresh}
                  onModalClose={enableRefresh}
                />
              </TableCell>
              <TableCell>
                <LotDescription lot={bid.lot} customer={bid.customer} />
                <ShippingInformation bid={bid} />
              </TableCell>
              <TableCell>
                <SaleHistory lot={bid.lot} />
              </TableCell>
              <TableCell className={classes.bidInfo}>
                <BidInformation bid={bid} />
              </TableCell>
              <TableCell className={classnames('lot-notes', classes.activity)}>
                <LatestActivity bid={bid} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BidsTable;
