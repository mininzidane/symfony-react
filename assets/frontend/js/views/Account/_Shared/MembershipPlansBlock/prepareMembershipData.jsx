import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import MembershipService from 'frontend/js/api/MembershipService';
import Amount from 'frontend/js/components/Amount';

const getNameText = (name) => {
  const langMap = {
    Guest: 'membershipPlans.types.Guest',
    Basic: 'membershipPlans.types.Basic',
    Premium: 'membershipPlans.types.Premium',
    Advanced: 'membershipPlans.types.Advanced',
  };

  if (langMap[name]) {
    return <FormattedMessage id={langMap[name]} />;
  }

  return name;
};

const getVehicleFinancingValue = (value) => {
  const valueMap = {
    none: false,
    full: true,
  };

  if (typeof valueMap[value] !== 'undefined') {
    return valueMap[value];
  }

  return value;
};

const enrichData = (mType) => {
  const biddingCount = mType.biddingLimitCount;
  const biddingLimitAmount = mType.biddingLimitAmount ? (
    NumberService.formatCurrency(mType.biddingLimitAmount)
  ) : (
    <FormattedMessage id="membershipPlans.card.unlimited" />
  );

  const clearvinReports = mType.freeCvReports > 0 ? mType.freeCvReports : false;

  const isBasicMembership = mType.level === MembershipService.LEVEL.BASIC;

  let liveBidding = Boolean(mType.liveBidding);
  if (liveBidding && isBasicMembership && mType.bidderAccountAssignment === false) {
    liveBidding = 'AutoBidMaster.com';
  }

  return {
    ...mType,
    nameLabel: getNameText(mType.name),
    transactionFee:
      mType.transFeePerc > 0 ? (
        <FormattedMessage
          id="membershipPlans.card.transactionFeeValue"
          values={{
            transFeeMin: mType.transFeeMin,
            transFeePerc: mType.transFeePerc,
          }}
        />
      ) : (
        <Amount value={mType.transFeeMin} fontSize={14} />
      ),
    biddingCount: biddingCount || <FormattedMessage id="membershipPlans.card.unlimited" />,
    biddingLimitAmount,
    clearvinReports,
    liveBidding,
    prioritySupport: Boolean(mType.prioritySupport),
    recommendedBid: mType.recommendedBid,
    shippingDiscount: mType.shippingDiscount,
    vehicleFinancing: getVehicleFinancingValue(mType.vehicleFinancing),
  };
};

export default function prepareMembershipData(data) {
  if (!data) {
    return data;
  }

  return {
    membershipTypes: data.map(enrichData),
  };
}
