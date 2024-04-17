import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import get from 'lodash/get';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useIntl from 'frontend/js/hooks/useIntl';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import CountryService from 'frontend/js/api/CountryService';
import DepositIncreaseNotice from './DepositIncreaseNotice';
import StatusEntry from './StatusEntry';
import useStyles from './useStyles';
import SellYourCar from './SellYourCar';

function AccountBiddingStatus({ membership, buyerPower, deposit, className }) {
  const classes = useStyles();
  const intl = useIntl();
  const { formatCurrency } = NumberService;

  const maximumBid = get(membership, 'biddingAmountLimit');
  const purchaseLimit = get(membership, 'biddingCountLimit');
  const minFee = get(membership, 'transFeeMin');
  const feePct = get(membership, 'transFeePerc');
  const noBuyerPower = !buyerPower;

  const date = new Date();
  date.setDate(date.getDate() + 30);
  const securityDepositExpiration = date;

  const translationSets = {
    transactionFee: intl.formatMessage({ id: 'receiptPage.accountBiddingStatus.transactionFee' }),
    purchaseLimit: intl.formatMessage({ id: 'receiptPage.accountBiddingStatus.purchaseLimit' }),
    maximumBid: intl.formatMessage({ id: 'receiptPage.accountBiddingStatus.maximumBid' }),
    securityDeposit: intl.formatMessage({ id: 'receiptPage.accountBiddingStatus.securityDeposit' }),
    purchaseLimitTooltip: intl.formatMessage({ id: 'receiptPage.purchaseLimitTooltip' }),
    securityDepositTooltip: intl.formatMessage({ id: 'receiptPage.securityDepositTooltip' }),
    maximumBidUnlimitedTooltip: intl.formatMessage({ id: 'receiptPage.maximumBidUnlimitedTooltip' }),
    autoFinancingOptionsTooltip: intl.formatMessage({ id: 'receiptPage.autoFinancingOptions.tooltip' }),
    maximumBidTooltip: intl.formatMessage(
      { id: 'receiptPage.maximumBidTooltip' },
      {
        maximumBid: formatCurrency(maximumBid),
      },
    ),
    transactionFeeTooltip: intl.formatMessage(
      { id: 'receiptPage.transactionFeeTooltip' },
      {
        transFeePerc: feePct,
        transFeeMin: formatCurrency(minFee),
      },
    ),
  };

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.title}>
        <FormattedMessage id="receiptPage.accountBiddingStatus" />
      </div>
      <SellYourCar />
      {Boolean(CountryService.isDomestic()) && (
        <StatusEntry
          label={<FormattedMessage id="landings.lp3.titleFeature4" />}
          value={<FormattedMessage id="joinAuctions.howToBid.available" className="tt-c" />}
          tooltipContent={translationSets.autoFinancingOptionsTooltip}
        />
      )}
      <StatusEntry
        label={translationSets.transactionFee}
        value={`${formatCurrency(minFee)} or < ${feePct}%`}
        tooltipContent={translationSets.transactionFeeTooltip}
      />
      <StatusEntry
        label={translationSets.purchaseLimit}
        value={purchaseLimit || 'Unlimited'}
        tooltipContent={translationSets.purchaseLimitTooltip}
      />
      <StatusEntry
        label={translationSets.maximumBid}
        value={maximumBid ? formatCurrency(maximumBid) : 'Unlimited'}
        tooltipContent={maximumBid ? translationSets.maximumBidTooltip : translationSets.maximumBidUnlimitedTooltip}
      />
      {noBuyerPower ? (
        <StatusEntry
          label={translationSets.securityDeposit}
          value={formatCurrency(buyerPower)}
          isChecked={false}
          tooltipContent={translationSets.securityDepositTooltip}
        />
      ) : (
        <>
          <StatusEntry
            label="Buyer power"
            value={formatCurrency(buyerPower)}
            tooltipContent="The total amount you can bid"
          />
          <StatusEntry
            label={`${translationSets.securityDeposit} (Expires ${DateTimeService.format(securityDepositExpiration)})`}
            value={formatCurrency(deposit)}
            tooltipContent={translationSets.securityDepositTooltip}
          />
        </>
      )}

      {noBuyerPower && <DepositIncreaseNotice />}
    </div>
  );
}

AccountBiddingStatus.defaultProps = {
  className: '',
  buyerPower: 0,
  deposit: 0,
  membership: {},
};

AccountBiddingStatus.propTypes = {
  membership: PropTypes.shape({}),
  className: PropTypes.string,
  buyerPower: PropTypes.number,
  deposit: PropTypes.number,
};

export default AccountBiddingStatus;
