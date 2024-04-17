import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import NotificationCard from '../../NotificationCard';
import ConfirmationActions from '../ConfirmationActions';

function MembershipUpgradeRequired({
  bidContainerClasses,
  attemptedAmount,
  membershipType,
  onCancel,
  isState2StateAccepted,
  isState2StatePreorder,
  lot,
}) {
  const { formatCurrency } = NumberService;
  const intl = useIntl();

  const { currencyFeeFormat } = lot;

  function handleConfirmClick() {
    const { id, inventoryAuction } = lot;
    const query = { lotId: id };
    if (inventoryAuction !== LotService.AUCTION_COPART) {
      query.auction = inventoryAuction;
    }
    RouterService.redirect('membershipPlans', query);
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
        id: 'lotPage.bidInformation.membershipUpgradeRequired',
        defaultMessage:
          'You have {membership} membership. To place bids higher than {amount} please upgrade your membership.',
      },
      {
        membership: membershipType.name,
        amount: formatCurrency(membershipType?.biddingLimitAmount || 0),
      },
    ),
    cta: intl.formatMessage({
      id: 'shared.cta.upgradeMembership',
      defaultMessage: 'Upgrade Membership',
    }),
  };

  return (
    <div className={bidContainerClasses}>
      <NotificationCard title={translationSets.title} content={<div>{translationSets.content}</div>} />
      <ConfirmationActions
        lot={lot}
        onCancel={onCancel}
        onConfirm={handleConfirmClick}
        confirmLabel={translationSets.cta}
        isState2StatePreorder={isState2StatePreorder}
        isState2StateAccepted={isState2StateAccepted}
      />
    </div>
  );
}

MembershipUpgradeRequired.propTypes = {
  membershipType: PropTypes.object.isRequired,
  bidContainerClasses: PropTypes.string.isRequired,
  attemptedAmount: PropTypes.number.isRequired,
  isState2StatePreorder: PropTypes.bool.isRequired,
  isState2StateAccepted: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  lot: LotShape.isRequired,
};

export default MembershipUpgradeRequired;
