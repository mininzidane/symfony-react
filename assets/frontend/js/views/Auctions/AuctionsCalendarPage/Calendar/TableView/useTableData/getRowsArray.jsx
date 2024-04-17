import React from 'react';
import AuctionCell from '../Cells/AuctionCell';
import ValueCell from '../Cells/ValueCell';
import Time from '../Values/Time';
import Location from '../Values/Location';
import SellType from '../Values/SellType';
import CurrentSale from '../Values/CurrentSale';
import NextSale from '../Values/NextSale';
import FutureSale from '../Values/FutureSale';

function getRowsArray(auctions, isMobile) {
  return auctions.map((auction, index) => {
    if (isMobile) {
      const row = [
        {
          content: <AuctionCell auction={auction} />,
          colSpan: 2,
        },
      ];
      row.id = index;
      return row;
    }

    const row = [
      {
        content: <Time auction={auction} />,
      },
      {
        content: <Location auction={auction} />,
      },
      {
        content: <ValueCell value={auction?.location?.region} />,
      },
      {
        content: <SellType auction={auction} />,
      },
      {
        content: <CurrentSale auction={auction} />,
      },
      {
        content: <NextSale auction={auction} />,
      },
      {
        content: <FutureSale auction={auction} />,
      },
    ];
    row.id = index;
    return row;
  });
}

export default getRowsArray;
