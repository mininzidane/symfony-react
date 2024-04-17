import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function SaleHistory({ lots }) {
  const classes = useStyles();

  if (!lots) {
    return null;
  }

  const saleHistoryList = useMemo(() => {
    const groupedByLotId = lots.reduce((acc, curr, index) => {
      if (!acc[curr.lotId]) {
        acc[curr.lotId] = [];
      }

      if (index === 0) {
        curr.status = 'Not Sold';
      }

      acc[curr.lotId].push(curr);

      return acc;
    }, {});
    return Object.entries(groupedByLotId);
  }, [lots]);

  return (
    <>
      {saleHistoryList.map(([lotId, sales]) => (
        <div key={lotId}>
          <a href={RouterService.getRoute('copartLotPage', null, { id: lotId })} target="_blank" rel="noreferrer">
            <b>Lot # {lotId}</b>
          </a>

          {sales.map((sale) => (
            <div className={classes.lotRow} key={`sale-lot-${sale.id}`}>
              <span>{DateTimeService.formatFromISOString(sale.saleDate)}</span>
              <span>{NumberService.formatCurrency(sale.finalBid)}</span>
              <span>{NumberService.formatNumber(sale.odometer)} mi</span>
              <span>{sale.seller || '-'}</span>
              <span>
                <b>{sale.status}</b>
              </span>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

SaleHistory.propTypes = {
  lots: PropTypes.array,
};

SaleHistory.defaultProps = {
  lots: null,
};

export default SaleHistory;
