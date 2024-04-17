import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import NotificationCard from '../../NotificationCard';
import useBidDelta from '../../../../../hooks/useBidDelta';
import AsIsDisclaimer from '../../AsIsDisclaimer';

function InvalidIncrementState({ amount, auction, bidContainerClasses }) {
  const delta = useBidDelta(amount, auction);
  const incrementAmount = delta ? delta.increment : 0;
  const intl = useIntl();

  const translationSets = {
    title: intl.formatMessage({
      id: 'lotPage.bidInformation.errorInvalidIncrementTitle',
      defaultMessage: 'Invalid Increment Amount',
    }),
    content: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.errorInvalidIncrement',
        defaultMessage: 'The amount you are trying to submit is invalid and must be an increment of {incrementAmount}.',
      },
      {
        incrementAmount,
      },
    ),
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
      defaultMessage: 'Cancel',
    }),
  };

  return (
    <div className={bidContainerClasses}>
      <NotificationCard
        title={translationSets.title}
        content={
          <>
            <div>{translationSets.content}</div>
          </>
        }
      />
      <AsIsDisclaimer />
    </div>
  );
}

InvalidIncrementState.propTypes = {
  amount: PropTypes.number,
  auction: PropTypes.string,
  bidContainerClasses: PropTypes.string.isRequired,
};

InvalidIncrementState.defaultProps = {
  amount: 0,
  auction: LotService.AUCTION_COPART,
};

export default InvalidIncrementState;
