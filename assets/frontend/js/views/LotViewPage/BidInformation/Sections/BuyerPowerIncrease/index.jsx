import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import NotificationCard from '../../NotificationCard';
import ConfirmationActions from '../ConfirmationActions';

function BuyerPowerIncrease({
  lot,
  bidContainerClasses,
  attemptedAmount,
  bpIncreaseAmount,
  additionalDepositAmount,
  onCancel,
  isState2StateAccepted,
  isState2StatePreorder,
}) {
  const { id: lotId, slug, currencyFeeFormat } = lot;
  const { getRoute } = RouterService;
  const { formatCurrency } = NumberService;
  const intl = useIntl();

  function handleConfirmClick() {
    const params = {
      lotId,
      slug,
    };

    if (attemptedAmount > BuyerPowerService.minDepositThreshold) {
      params.amount = attemptedAmount;
    }

    RouterService.customRedirect(getRoute('buyerPower', params));
  }

  const translationSets = {
    title: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.bpErrorTitle',
      },
      {
        amount: formatCurrency(attemptedAmount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    content: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.bpErrorContent',
        defaultMessage:
          "You've reached the limit of your Buyer Power. To place this bid you must increase your buyer power to {bpIncreaseAmount} USD. This requires an additional deposit of {additionalDepositAmount} USD",
      },
      {
        bpIncreaseAmount: formatCurrency(bpIncreaseAmount),
        additionalDepositAmount: formatCurrency(additionalDepositAmount),
      },
    ),
    ctaIncreaseBp: intl.formatMessage({
      id: 'shared.cta.increaseBuyerPower',
      defaultMessage: 'Increase Buyer Power',
    }),
  };

  return (
    <div className={bidContainerClasses}>
      <NotificationCard title={translationSets.title} content={<div>{translationSets.content}</div>} />
      <ConfirmationActions
        lot={lot}
        onCancel={onCancel}
        onConfirm={handleConfirmClick}
        confirmLabel={translationSets.ctaIncreaseBp}
        isState2StatePreorder={isState2StatePreorder}
        isState2StateAccepted={isState2StateAccepted}
      />
    </div>
  );
}

BuyerPowerIncrease.propTypes = {
  lot: LotShape.isRequired,
  bidContainerClasses: PropTypes.string.isRequired,
  attemptedAmount: PropTypes.number.isRequired,
  bpIncreaseAmount: PropTypes.number.isRequired,
  additionalDepositAmount: PropTypes.number.isRequired,
  isState2StatePreorder: PropTypes.bool.isRequired,
  isState2StateAccepted: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BuyerPowerIncrease;
