/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import LotService from 'frontend/js/api/LotService';

function SaleDate({ lot }) {
  const isUpcoming = lot.auctionDateType === LotService.AUCTION_DATE_TYPE_UPCOMING;

  if (!lot.saleDate) {
    return (
      <>
        {isUpcoming ? (
          <FormattedMessage id="lotPage.saleInfo.upcomingLot" />
        ) : (
          <>
            <FormattedMessage id="lotPage.saleInfo.futureSale" />
            <TooltipOnHover
              badgeTop={-1}
              isFlipEnabled={false}
              content={<FormattedMessage id="lotPage.saleInfo.expected.tooltip" />}
            />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {DateTimeService.toLocaleDate(lot.saleStartAt, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}
      {' - '}
      {DateTimeService.toLocaleTime(lot.saleStartAt, { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' })}
      {lot.auctionDateType === LotService.AUCTION_DATE_TYPE_FUTURE && (
        <>
          {' '}
          <span className="fw-4">
            (<FormattedMessage id="lotPage.saleInfo.expected" />)
          </span>
          <TooltipOnHover
            badgeTop={-1}
            isFlipEnabled={false}
            content={<FormattedMessage id="lotPage.saleInfo.expected.tooltip" />}
          />
        </>
      )}
    </>
  );
}

export default SaleDate;
