import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import TooltipControlled from 'frontend/js/components/TooltipControlled';
import ButtonCross from 'frontend/js/components/ButtonCross';
import FeeRow from './FeeRow';
import useStyles from './useStyles';

function PayoutEstimator({ consignment, trigger }) {
  const classes = useStyles();
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const intl = useIntl();

  const translationSets = {
    title: intl.formatMessage({ id: 'consignment.label.payoutEstimator' }),
    altClose: intl.formatMessage({ id: 'lotPage.feeCalculator.altClose' }),
    totalPayout: intl.formatMessage({ id: 'consignment.label.totalPayout' }),
    saleAmount: intl.formatMessage({ id: 'consignment.label.saleAmount' }),
    consignmentFee: intl.formatMessage({ id: 'consignment.label.consignmentFee' }),
    rerunsFee: intl.formatMessage({ id: 'consignment.label.rerunsFee' }),
    transactionFee: intl.formatMessage({ id: 'consignment.label.transactionFee' }),
    saleFee: intl.formatMessage({ id: 'consignment.label.saleFee' }),
    storageFee: intl.formatMessage({ id: 'consignment.label.storageFee' }),
    shippingPrice: intl.formatMessage({ id: 'consignment.label.shippingPrice' }),
  };

  return (
    <TooltipControlled
      color="white"
      isOpen={isTooltipOpen}
      onClose={() => setTooltipOpen(false)}
      onTriggerClick={() => setTooltipOpen(!isTooltipOpen)}
      maxWidth={360}
      trigger={trigger || translationSets.title}
      isFlipEnabled={false}
      triggerClassName={classes.trigger}
      padding="20px 25px"
      placement="bottom"
      style={{ marginLeft: '-25px' }}
      content={
        <>
          <div className={classes.title}>{translationSets.title}</div>

          <ButtonCross className={classes.close} onClick={() => setTooltipOpen(false)} alt={translationSets.altClose} />

          <div>
            <FeeRow label={translationSets.saleAmount} value={consignment.currentBid} isStrong cents={false} />
            <FeeRow label={translationSets.consignmentFee} value={consignment.consignmentAuctionFee} />
            <FeeRow label={translationSets.rerunsFee} value={consignment.reRunFee} />
            <FeeRow label={translationSets.transactionFee} value={consignment.transactionFee} />
            <FeeRow label={translationSets.saleFee} value={consignment.saleFee} />
            <FeeRow label={translationSets.storageFee} value={consignment.storageFee} />
            <FeeRow label={translationSets.shippingPrice} value={consignment.shippingPrice} />

            <div className={classes.separator} />

            <FeeRow label={translationSets.totalPayout} value={consignment.payoutEstimate} isStrong />
          </div>
        </>
      }
    />
  );
}

PayoutEstimator.propTypes = {
  trigger: PropTypes.node,
  consignment: PropTypes.object,
};

PayoutEstimator.defaultProps = {
  trigger: null,
  consignment: {},
};

export default PayoutEstimator;
