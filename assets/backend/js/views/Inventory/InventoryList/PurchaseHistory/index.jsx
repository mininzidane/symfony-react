import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import NumberService from 'backend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function PurchaseHistory({ purchases }) {
  const classes = useStyles();

  if (!purchases) {
    return null;
  }

  return (
    <>
      {purchases.map((purchase) => (
        <div key={purchase.token}>
          <a
            href={RouterService.getRoute('backendLotPurchaseView', null, { token: purchase.token })}
            target="_blank"
            rel="noreferrer"
          >
            <b>Purchase</b>
          </a>

          <div className={classes.lotRow} key={`sale-purchase-${purchase.token}`}>
            <span>{DateTimeService.formatFromISOString(purchase.saleDate)}</span>
            <span>{NumberService.formatCurrency(purchase.finalBid)}</span>
            <span />
            <span>
              <b>{purchase.status}</b>
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

PurchaseHistory.propTypes = {
  purchases: PropTypes.array,
};

PurchaseHistory.defaultProps = {
  purchases: null,
};

export default PurchaseHistory;
