import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

const urlLotIdParam = RouterService.getQueryParam('lotId');
const urlAuctionParam = RouterService.getQueryParam('auction');
let returnToQueryParam = RouterService.getQueryParam('return_to');
if (returnToQueryParam) {
  returnToQueryParam = decodeURIComponent(returnToQueryParam);
}
const prevLocationUrl = LocalStorageService.get('previous_location');
const returnToUrl = returnToQueryParam || prevLocationUrl;

const isZeroDeposit = parseInt(window.customer.balance, 10) === 0;

export default {
  btns: {
    btnUpgrade: {
      Guest: <FormattedMessage id="membershipPlans.card.upgradeNow" />,
      Basic: <FormattedMessage id="membershipPlans.card.upgradeNow" />,
      Advanced: <FormattedMessage id="membershipPlans.card.upgradeNow" />,
      Premium: <FormattedMessage id="membershipPlans.card.upgradeNow" />,
    },
    btnContinue: {
      Guest: <FormattedMessage id="membershipPlans.card.currentMembership" />,
      Basic: <FormattedMessage id="membershipPlans.card.currentMembership" />,
      Advanced: <FormattedMessage id="membershipPlans.card.currentMembership" />,
      Premium: <FormattedMessage id="membershipPlans.card.currentMembership" />,
    },
    upgradeUrl: {
      Guest: RouterService.getRoute('membershipUpgradeGuest', { lotId: urlLotIdParam, auction: urlAuctionParam }),
      Basic: RouterService.getRoute('membershipUpgradeBasic', { lotId: urlLotIdParam, auction: urlAuctionParam }),
      Advanced: RouterService.getRoute('membershipUpgradeAdvanced', { lotId: urlLotIdParam, auction: urlAuctionParam }),
      Premium: RouterService.getRoute('membershipUpgradePremium', { lotId: urlLotIdParam, auction: urlAuctionParam }),
    },
    continueUrl: {
      Guest: isZeroDeposit
        ? RouterService.getRoute('membershipContinueGuest', { return_to: returnToUrl })
        : returnToUrl,
      Basic: RouterService.getRoute('searchResults'),
      Advanced: RouterService.getRoute('searchResults'),
      Premium: RouterService.getRoute('searchResults'),
    },
  },
  texts: {
    transactionFeeLabel: <FormattedMessage id="membershipPlans.card.transactionFee" />,
    transactionFeeTooltip: (feePerc, feeMin) => (
      <FormattedMessage
        id="membershipPlans.card.tooltip.transactionFee"
        values={{
          transFeePerc: feePerc,
          transFeeMin: feeMin,
        }}
      />
    ),
    biddingCountLabel: <FormattedMessage id="membershipPlans.card.purchaseLimit" />,
    biddingCountTooltip: <FormattedMessage id="membershipPlans.card.tooltip.purchaseLimit" />,
    biddingLimitAmountLabel: <FormattedMessage id="membershipPlans.card.maximumBid" />,
    biddingLimitAmountTooltip: (maxBid) => (
      <FormattedMessage id="membershipPlans.card.tooltip.maximumBid" values={{ maximumBid: maxBid }} />
    ),
    clearvinReportsLabel: (
      <FormattedMessage
        id="membershipPlans.card.freeVINChecks"
        values={{
          br: <br />,
        }}
      />
    ),
    clearvinReportsTooltip: <FormattedMessage id="membershipPlans.card.tooltip.freeVINChecks" />,
    liveBiddingLabel: <FormattedMessage id="membershipPlans.card.liveBidding" />,
    liveBiddingTooltip: <FormattedMessage id="membershipPlans.card.tooltip.liveBidding" />,
    prioritySupportLabel: <FormattedMessage id="membershipPlans.card.buyerServicesAgent" />,
    prioritySupportTooltip: <FormattedMessage id="membershipPlans.card.tooltip.buyerServicesAgent" />,
    recommendedBidLabel: <FormattedMessage id="lotPage.recommendedBid" />,
    recommendedBidTooltip: <FormattedMessage id="membershipPlans.card.tooltip.recommendedBid" />,
    shippingDiscountLabel: <FormattedMessage id="shared.label.shippingDiscounts" />,
    shippingDiscountTooltip: <FormattedMessage id="membershipPlans.card.tooltip.shippingDiscounts" />,
    vehicleFinancingLabel: <FormattedMessage id="membershipPlans.card.vehicleFinancing" />,
    vehicleFinancingTooltip: <FormattedMessage id="membershipPlans.card.tooltip.vehicleFinancing" />,
  },
};
