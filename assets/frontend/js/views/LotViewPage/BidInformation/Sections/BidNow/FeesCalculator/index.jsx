import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import TooltipControlled from 'frontend/js/components/TooltipControlled';
import ButtonCross from 'frontend/js/components/ButtonCross';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotFeesShape from 'frontend/js/lib/propshapes/LotFeesShape';
import RouterService from 'frontend/js/api/RouterService';
import useBidFeeCalculator from 'frontend/js/hooks/useBidFeeCalculator';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FeeRow from './FeeRow';
import useStyles from './useStyles';

function FeesCalculator({ customer, lot, fees, amount, onRequestLogin, trigger }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper(customer);
  const { currency, currencyFeeFormat, currencySymbol, inventoryAuction } = lot;
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const intl = useIntl();

  const {
    copartAuctionFees,
    transactionFee,
    transactionFeeDiscount,
    documentationFee,
    intlWirePaymentFee,
    hasStateTax,
    stateTax,
    surtax,
    gstFee,
    hstFee,
    total,
  } = useBidFeeCalculator(fees, amount);

  const translationSets = {
    title: intl.formatMessage({
      id: 'lotPage.feeCalculator.title',
      defaultMessage: 'Fees Calculator',
    }),
    altClose: intl.formatMessage({
      id: 'lotPage.feeCalculator.altClose',
      defaultMessage: 'Close calculator',
    }),
    feeFinalBid: intl.formatMessage({
      id: 'shared.fee.finalBid',
      defaultMessage: 'Final Bid',
    }),
    feeHstTax: intl.formatMessage({
      id: 'shared.fee.hstTax',
      defaultMessage: 'HST tax',
    }),
    feeGstTax: intl.formatMessage({
      id: 'shared.fee.gstTax',
      defaultMessage: 'GST tax',
    }),
    feeCopartAuction: intl.formatMessage({
      id: 'shared.fee.copartAuction',
      defaultMessage: 'Auction Fees',
    }),
    feeAuction: intl.formatMessage({
      id: 'shared.fee.auctionFees',
    }),
    feeAbmTransaction: intl.formatMessage({
      id: 'shared.fee.abmTransaction',
      defaultMessage: 'Autobidmaster Transaction Fee',
    }),
    feeDocumentation: intl.formatMessage({
      id: 'shared.fee.documentation',
      defaultMessage: 'Documentation Fee',
    }),
    feeIntlWirePayment: intl.formatMessage({
      id: 'shared.fee.intlWirePayment',
      defaultMessage: 'International Wire Payment',
    }),
    feeStateSalesTax: intl.formatMessage(
      {
        id: 'shared.fee.stateSalesTax',
        defaultMessage: '{stateCode} Sales Tax',
      },
      {
        stateCode: fees.salesTaxState,
      },
    ),
    feeDiscretionarySurtax: intl.formatMessage({
      id: 'shared.fee.discretionarySurtax',
      defaultMessage: 'Discretionary Surtax',
    }),
    feeTotal: intl.formatMessage({
      id: 'shared.label.total',
      defaultMessage: 'Total',
    }),
    discountStart: intl.formatMessage({
      id: 'lotPage.feeCalculator.discountStart',
      defaultMessage: 'You can save up to',
    }),
    discountEnd: intl.formatMessage({
      id: 'lotPage.feeCalculator.discountEnd',
      defaultMessage: 'on Autobidmaster transaction fees with Premium Membership',
    }),
    ctaUpgradeNow: intl.formatMessage({
      id: 'shared.cta.upgradeNow',
      defaultMessage: 'Upgrade Now',
    }),
  };

  function handleTooltipClick() {
    if (!isAuthenticated) {
      onRequestLogin();
    } else {
      setTooltipOpen(!isTooltipOpen);
    }
  }

  const auctionFeeLabel =
    inventoryAuction === LotService.AUCTION_IAA ? translationSets.feeAuction : translationSets.feeCopartAuction;

  return (
    <TooltipControlled
      color="white"
      isOpen={isTooltipOpen}
      onClose={() => setTooltipOpen(false)}
      onTriggerClick={handleTooltipClick}
      maxWidth={360}
      trigger={trigger || translationSets.title}
      isFlipEnabled={false}
      triggerClassName={classes.trigger}
      padding="20px 25px"
      placement="bottom-start"
      style={{ marginLeft: '-25px' }}
      content={
        <>
          <div className={classes.title}>{translationSets.title}</div>

          <ButtonCross className={classes.close} onClick={() => setTooltipOpen(false)} alt={translationSets.altClose} />

          <div>
            <FeeRow
              label={translationSets.feeFinalBid}
              value={amount}
              isStrong
              currency={currency}
              currencySymbol={currencySymbol}
            />

            {hstFee > 0 && (
              <FeeRow
                label={translationSets.feeHstTax}
                value={hstFee}
                currency={currency}
                currencySymbol={currencySymbol}
              />
            )}

            {gstFee > 0 && (
              <FeeRow
                label={translationSets.feeGstTax}
                value={gstFee}
                currency={currency}
                currencySymbol={currencySymbol}
              />
            )}

            <FeeRow
              label={auctionFeeLabel}
              value={copartAuctionFees}
              currency={currency}
              currencySymbol={currencySymbol}
            />
            <FeeRow
              label={translationSets.feeAbmTransaction}
              value={transactionFee}
              currency={currencyFeeFormat}
              currencySymbol={currencySymbol}
            />

            {documentationFee > 0 && (
              <FeeRow
                label={translationSets.feeDocumentation}
                value={documentationFee}
                currency={currencyFeeFormat}
                currencySymbol={currencySymbol}
              />
            )}

            {intlWirePaymentFee > 0 && (
              <FeeRow
                label={translationSets.feeIntlWirePayment}
                value={intlWirePaymentFee}
                currency={currencyFeeFormat}
                currencySymbol={currencySymbol}
              />
            )}

            {hasStateTax === true && (
              <>
                {stateTax > 0 && (
                  <FeeRow
                    label={translationSets.feeStateSalesTax}
                    value={stateTax}
                    currency={currencyFeeFormat}
                    currencySymbol={currencySymbol}
                  />
                )}

                {surtax > 0 && (
                  <FeeRow
                    label={translationSets.feeDiscretionarySurtax}
                    value={surtax}
                    currency={currencyFeeFormat}
                    currencySymbol={currencySymbol}
                  />
                )}
              </>
            )}

            <div className={classes.separator} />

            <FeeRow
              label={translationSets.feeTotal}
              value={total}
              isStrong
              currency={currencyFeeFormat}
              currencySymbol={currencySymbol}
            />

            {!!transactionFeeDiscount &&
              customer &&
              customer.membershipType &&
              customer.membershipType.upgradable === true && (
                <div className="mt-15 text-corn text-xs ta-l pb-4">
                  * — {translationSets.discountStart} {currencySymbol}
                  <span>{transactionFeeDiscount}</span> {translationSets.discountEnd}
                  <br />
                  <a href={RouterService.getRoute('membershipPlans')} className="text-unlink text-xs">
                    {translationSets.ctaUpgradeNow}
                  </a>
                </div>
              )}
          </div>
        </>
      }
    />
  );
}

FeesCalculator.propTypes = {
  customer: CustomerShape,
  lot: LotShape.isRequired,
  fees: LotFeesShape.isRequired,
  amount: PropTypes.number,
  onRequestLogin: PropTypes.func,
  trigger: PropTypes.node,
};

FeesCalculator.defaultProps = {
  customer: undefined,
  amount: 0,
  onRequestLogin: () => null,
  trigger: null,
};

export default FeesCalculator;
