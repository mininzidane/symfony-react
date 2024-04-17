import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import DescriptionRow from './DescriptionRow';
import useStyles from './useStyles';

function CardDescription({ planData }) {
  const classes = useStyles();

  return (
    <div className={classes.description}>
      <DescriptionRow
        label={config.texts.biddingCountLabel}
        value={planData.biddingCount}
        tooltip={config.texts.biddingCountTooltip}
        qaId="qa_purchase_limit"
      />
      <DescriptionRow
        label={config.texts.biddingLimitAmountLabel}
        value={planData.biddingLimitAmount}
        tooltip={config.texts.biddingLimitAmountTooltip(planData.biddingLimitAmount)}
        qaId="qa_maximum_bid"
      />
      <DescriptionRow
        label={config.texts.transactionFeeLabel}
        value={planData.transactionFee}
        tooltip={config.texts.transactionFeeTooltip(planData.transFeePerc, planData.transFeeMin)}
        qaId="qa_transaction_free"
      />
      <DescriptionRow
        label={config.texts.clearvinReportsLabel}
        value={planData.clearvinReports}
        tooltip={config.texts.clearvinReportsTooltip}
        qaId="qa_free_vin_check"
      />
      <DescriptionRow
        label={config.texts.liveBiddingLabel}
        value={planData.liveBidding}
        tooltip={config.texts.liveBiddingTooltip}
        qaId="qa_live_bidding"
      />
      <DescriptionRow
        label={config.texts.recommendedBidLabel}
        value={planData.recommendedBid}
        tooltip={config.texts.recommendedBidTooltip}
        qaId="qa_recommended_bid"
      />
      <DescriptionRow
        label={config.texts.shippingDiscountLabel}
        value={planData.shippingDiscount > 0}
        tooltip={config.texts.shippingDiscountTooltip}
        qaId="qa_shipping_discounts"
      />
      <DescriptionRow
        label={config.texts.prioritySupportLabel}
        value={planData.prioritySupport}
        tooltip={config.texts.prioritySupportTooltip}
        qaId="qa_dedicate_buyer"
      />
      <DescriptionRow
        label={config.texts.vehicleFinancingLabel}
        value={planData.vehicleFinancing}
        tooltip={config.texts.vehicleFinancingTooltip}
        qaId="qa_vehicle_financing"
      />
    </div>
  );
}

CardDescription.propTypes = {
  planData: PropTypes.object,
};

CardDescription.defaultProps = {
  planData: {},
};

export default CardDescription;
