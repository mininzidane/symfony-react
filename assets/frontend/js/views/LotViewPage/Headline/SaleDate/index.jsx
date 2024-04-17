import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

import useStyles from './useStyles';

function SaleDate({ lot }) {
  const classes = useStyles();
  const intl = useIntl();

  const { saleDate, auctionDateType, saleStartAt } = lot;

  const isUpcoming = auctionDateType === LotService.AUCTION_DATE_TYPE_UPCOMING;

  const translationSets = {
    saleDate: intl.formatMessage({ id: 'shared.label.saleDate' }),
    futureSale: intl.formatMessage({ id: 'lotPage.saleInfo.futureSale' }),
    upcomingLot: intl.formatMessage({ id: 'lotPage.saleInfo.upcomingLot' }),
    futureSaleTooltip: intl.formatMessage({ id: 'lotPage.saleInfo.expected.tooltip' }),
  };

  return (
    <div className={classes.root}>
      <div>{translationSets.saleDate}:</div>

      {!saleDate ? (
        <span className="ws-n">
          {isUpcoming ? (
            <strong className={classes.value}>{translationSets.upcomingLot}</strong>
          ) : (
            <>
              <strong className={classes.value}>{translationSets.futureSale}</strong>
              <TooltipOnHover badgeTop={-1} isFlipEnabled={false} content={translationSets.futureSaleTooltip} />
            </>
          )}
        </span>
      ) : (
        <strong className={classes.value}>
          {DateTimeService.toLocaleDate(saleStartAt, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
          {' - '}
          {DateTimeService.toLocaleTime(saleStartAt, {
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          })}
        </strong>
      )}
    </div>
  );
}

SaleDate.propTypes = {
  lot: LotShape,
};

SaleDate.defaultProps = {
  lot: null,
};

export default SaleDate;
