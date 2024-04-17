/* eslint-disable no-nested-ternary */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import BidService from 'frontend/js/api/BidService';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import BidShape from 'frontend/js/lib/propshapes/BidShape';
import NotificationCard from '../../NotificationCard';
import useStyles from './useStyles';

function CounterBidNotification({ lot, customerBid }) {
  const { getLocalizedHcRoute } = RouterService;
  const { saleStatus, bidStatus, saleDate, minimumBid } = lot;
  const { currentBid = 0, addedAt } = customerBid;
  const isOnMinimum = saleStatus === LotService.SALE_STATUS_ON_MINIMUM_BID_CODE;
  const isAwaitingSellerResponse = bidStatus === BidService.STATUS_AWAITING_SELLER_RESPONSE;
  const isAwaitingApproval = bidStatus === BidService.STATUS_AWAITING_APPROVAL;
  const isSellerCountered = bidStatus === BidService.STATUS_SELLER_COUNTERED;
  const currentBidAmount = NumberService.formatCurrency(currentBid);
  const intl = useIntl();
  const classes = useStyles();

  let auctionAdditionalTime2Days = '';
  if (saleDate) {
    auctionAdditionalTime2Days = DateTimeService.format(DateTimeService.addBusinessDaysFromString(saleDate, 2));
  }

  let bidAdditionalTime2Days = '';
  let bidAdditionalTime1Day = '';
  if (addedAt) {
    bidAdditionalTime2Days = DateTimeService.format(DateTimeService.addBusinessDaysFromString(addedAt, 2));
    bidAdditionalTime1Day = DateTimeService.format(DateTimeService.addBusinessDaysFromString(addedAt));
  }

  let counterOffer;
  if (minimumBid) {
    counterOffer = NumberService.formatCurrency(minimumBid);
  }

  let bidAdditionalTime = bidAdditionalTime2Days;
  if (isSellerCountered && isOnMinimum) {
    bidAdditionalTime = bidAdditionalTime1Day;
  }

  const translationSets = {
    cbTitleSellerCountered: intl.formatMessage({ id: 'lotPage.bidInformation.sellerResponseTitle' }),
    cbTitleCongrats: intl.formatMessage({ id: 'lotPage.bidInformation.highBidderTitle' }),
    cbNotificationMinimumBid: intl.formatMessage(
      { id: 'lotPage.bidInformation.cbNotificationMinimumBid' },
      {
        a: (chunks) => <a href={getLocalizedHcRoute('hcHowToBid')}>{chunks}</a>,
        br: <br />,
        auctionAdditionalTime: bidAdditionalTime2Days,
        currentBidAmount,
      },
    ),
    cbNotificationAwaitingApproval: intl.formatMessage(
      { id: 'lotPage.bidInformation.cbNotificationAwaitingApproval' },
      { br: <br />, auctionAdditionalTime2Days, currentBidAmount },
    ),
    counterOfferTitle: intl.formatMessage(
      { id: 'lotPage.bidInformation.cbNotificationCounterOfferTitle' },
      { currentBidAmount, counterOffer },
    ),
    defaultTitle: intl.formatMessage({ id: 'lotPage.bidInformation.cbNotificationDefaultTitle' }, { currentBidAmount }),
    cbNotificationSellerCountered: intl.formatMessage(
      { id: 'lotPage.bidInformation.cbNotificationSellerCountered' },
      { br: <br />, bidAdditionalTime, currentBidAmount },
    ),
    cbNotificationDefault: intl.formatMessage({ id: 'lotPage.bidInformation.cbNotificationDefault' }, { br: <br /> }),
  };

  function getContent() {
    if (isOnMinimum) {
      return translationSets.cbNotificationMinimumBid;
    }

    if (isAwaitingApproval) {
      return translationSets.cbNotificationAwaitingApproval;
    }

    if (isAwaitingSellerResponse) {
      return null;
    }

    if (isSellerCountered) {
      return (
        <>
          {counterOffer > 0 ? (
            <div>{translationSets.counterOfferTitle}</div>
          ) : (
            <div>{translationSets.defaultTitle}</div>
          )}
          <br />
          {translationSets.cbNotificationSellerCountered}
        </>
      );
    }

    return translationSets.cbNotificationDefault;
  }

  return (
    <NotificationCard
      className={classes.root}
      title={isSellerCountered ? translationSets.cbTitleSellerCountered : translationSets.cbTitleCongrats}
      content={<div className="ta-l">{getContent()}</div>}
    />
  );
}

CounterBidNotification.propTypes = {
  lot: LotShape.isRequired,
  customerBid: BidShape,
};

CounterBidNotification.defaultProps = {
  customerBid: {},
};

export default CounterBidNotification;
