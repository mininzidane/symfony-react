import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import { withStyles } from '@material-ui/core/styles';
import Table from 'frontend/js/components/Table/Table';
import TableHead from 'frontend/js/components/Table/TableHead';
import TableRow from 'frontend/js/components/Table/TableRow';
import TableCell from 'frontend/js/components/Table/TableCell';
import TableBody from 'frontend/js/components/Table/TableBody';
import TableContainer from 'frontend/js/components/Table/TableContainer';
import Date from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/Date';
import Seller from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/Seller';
import Value from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/Value';
import FinalBid from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/FinalBid';
import LotId from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/LotId';
import Status from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/Values/Status';
import NumberService from 'frontend/js/lib/utils/NumberService';

const StyledTableHead = withStyles(() => ({
  root: {
    '& tr': {
      borderBottom: '1px solid #E3E3E3 !important',
    },
  },
}))(TableHead);

const StyledTableRow = withStyles(() => ({
  root: {
    borderTop: '1px solid #E3E3E3 !important',
  },
}))(TableRow);

const StyledTableCell = withStyles(({ breakpoints }) => ({
  root: {
    padding: '12px 5px !important',
    paddingBottom: '13px !important',
    background: 'none !important',
    fontWeight: '400 !important',
    fontSize: '14px !important',
    lineHeight: '1 !important',
    verticalAlign: 'middle !important',

    '&:first-child': {
      paddingLeft: '32px !important',

      [breakpoints.down('sm')]: {
        paddingLeft: '18px !important',
      },
    },

    '&:last-child': {
      paddingRight: '32 !important',

      [breakpoints.down('sm')]: {
        paddingRight: '18 !important',
      },
    },
  },
  head: {
    fontSize: '12px !important',
    color: 'rgba(0, 0, 0, .5) !important',
    overflowWrap: 'anywhere',
  },
}))(TableCell);

const StyledBoldTableCell = withStyles(() => ({
  root: {
    fontWeight: '700 !important',
  },
}))(StyledTableCell);

function SoldInfoTable({ sales, requireDeposit, requireUpgrade }) {
  return (
    <TableContainer>
      <Table hasShadow={false}>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell>
              <FormattedMessage id="shared.label.date" />
            </StyledTableCell>
            <StyledTableCell>
              <FormattedMessage id="shared.label.lotId" />
            </StyledTableCell>
            <StyledTableCell>
              <FormattedMessage id="lotPage.soldInfo.finalBid" />
            </StyledTableCell>
            <StyledTableCell>
              <FormattedMessage id="lotPage.soldInfo.odometer" />
            </StyledTableCell>
            <StyledTableCell>
              <FormattedMessage id="lotPage.soldInfo.status" />
            </StyledTableCell>
            <StyledTableCell>
              <FormattedMessage id="shared.label.seller" />
            </StyledTableCell>
          </StyledTableRow>
        </StyledTableHead>

        <TableBody>
          {sales.map((sale) => (
            <StyledTableRow key={sale.saleDate}>
              <StyledTableCell>
                <Date value={sale.saleDate} />
              </StyledTableCell>
              <StyledTableCell>
                <LotId id={sale.lotId} auction={sale.auction} />
              </StyledTableCell>
              <StyledBoldTableCell>
                <FinalBid value={sale.finalBid} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />
              </StyledBoldTableCell>
              <StyledBoldTableCell>
                <Value value={sale.odometer ? `${NumberService.formatNumber(sale.odometer)} mi` : '0'} />
              </StyledBoldTableCell>
              <StyledBoldTableCell>
                <Status value={sale.status} />
              </StyledBoldTableCell>
              <StyledTableCell>
                <Seller value={sale.seller} requireDeposit={requireDeposit} requireUpgrade={requireUpgrade} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SoldInfoTable.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  requireDeposit: PropTypes.bool,
  requireUpgrade: PropTypes.bool,
};

SoldInfoTable.defaultProps = {
  requireDeposit: false,
  requireUpgrade: false,
};

export default SoldInfoTable;
