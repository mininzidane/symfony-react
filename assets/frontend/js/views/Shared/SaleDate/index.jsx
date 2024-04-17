import React, { Fragment } from 'react';
import LotService from 'frontend/js/api/LotService';
import { FormattedMessage } from 'react-intl-phraseapp';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import PropTypes from 'prop-types';

function SaleDate({ lot, hasTime, className, hasWrapper }) {
  const { saleDate, saleStartAt, auctionDateType } = lot;
  const isUpcoming = auctionDateType === LotService.AUCTION_DATE_TYPE_UPCOMING;

  const RootComponent = hasWrapper ? 'span' : Fragment;
  const componentProps = {
    ...(hasWrapper && { className }),
  };

  return saleDate ? (
    <RootComponent {...componentProps}>
      {DateTimeService.toLocaleDate(saleStartAt, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
      {hasTime && (
        <>
          {' - '}
          {DateTimeService.toLocaleTime(saleStartAt, {
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short',
          })}
        </>
      )}
    </RootComponent>
  ) : (
    <RootComponent {...componentProps}>
      {isUpcoming ? (
        <FormattedMessage id="lotPage.saleInfo.upcomingLot" />
      ) : (
        <FormattedMessage id="lotPage.saleInfo.futureSale" />
      )}
    </RootComponent>
  );
}

SaleDate.propTypes = {
  lot: PropTypes.object,
  hasTime: PropTypes.bool,
  hasWrapper: PropTypes.bool,
  className: PropTypes.string,
};

SaleDate.defaultProps = {
  lot: {},
  hasTime: true,
  hasWrapper: true,
  className: null,
};

export default SaleDate;
