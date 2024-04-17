import React from 'react';
import PropTypes from 'prop-types';
import SoldInfoList from 'frontend/js/views/LotViewPage/_Shared/SoldInfo/List';
import useStyles from './useStyles';

function ListView({ sales, requireDeposit, requireUpgrade }) {
  const classes = useStyles();

  return (
    <div>
      {sales.map((sale, index) => (
        <SoldInfoList
          key={index}
          className={classes.entry}
          date={sale.saleDate}
          lotId={sale.lotId}
          finalBid={sale.finalBid}
          odometer={sale.odometer}
          seller={sale.seller}
          auctionDateType={sale.auctionDateType}
          requireDeposit={requireDeposit}
          requireUpgrade={requireUpgrade}
          status={sale.status}
          auction={sale.auction}
        />
      ))}
    </div>
  );
}

ListView.propTypes = {
  sales: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  requireDeposit: PropTypes.bool,
  requireUpgrade: PropTypes.bool,
};

ListView.defaultProps = {
  requireDeposit: false,
  requireUpgrade: false,
};

export default ListView;
