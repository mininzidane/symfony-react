import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import PropTypes from 'prop-types';

function CardTitle({ lotState, timeout }) {
  const [stateName, setStateName] = useState(lotState);
  const {
    WON,
    CONFIRM_MAKE_AN_OFFER,
    CONFIRM_BUY_IT_NOW,
    ERROR_BP_INCREASE,
    CONFIRM_PRELIMINARY_BID,
    CONFIRM_INCREASE_BID,
    CONFIRM_KEEP_BID,
    CONFIRM_COUNTER_BID,
    CONFIRM_ACCEPT_BID,
    ERROR_UPLOAD_ID,
    ERROR_NEED_UPGRADE_MEMBERSHIP,
  } = LotStatusStates;

  const titlesMap = {
    [CONFIRM_MAKE_AN_OFFER]: 'lotPage.bidInformation.maoConfirmationTitle',
    [CONFIRM_BUY_IT_NOW]: 'lotPage.bidInformation.binConfirmationTitle',
    [CONFIRM_PRELIMINARY_BID]: 'lotPage.bidInformation.bidConfirmationTitle',
    [CONFIRM_INCREASE_BID]: 'lotPage.bidInformation.increaseBidConfirmationTitle',
    [ERROR_BP_INCREASE]: 'lotPage.bidInformation.buyerPowerConfirmationTitle',
    [CONFIRM_KEEP_BID]: 'lotPage.bidInformation.keepBidConfirmationTitle',
    [CONFIRM_COUNTER_BID]: 'lotPage.bidInformation.counterBidConfirmationTitle',
    [CONFIRM_ACCEPT_BID]: 'lotPage.bidInformation.acceptBidConfirmationTitle',
    [ERROR_UPLOAD_ID]: 'lotPage.bidInformation.uploadIdConfirmationTitle',
    [ERROR_NEED_UPGRADE_MEMBERSHIP]: 'lotPage.bidInformation.upgradeMembershipConfirmationTitle',
  };

  useEffect(() => {
    setTimeout(() => {
      setStateName(lotState);
    }, timeout);
  }, [lotState]);

  if (stateName === WON) {
    return null;
  }

  if (titlesMap[stateName]) {
    return <FormattedMessage id={titlesMap[stateName]} />;
  }

  return <FormattedMessage id="shared.label.bidInformation" />;
}

CardTitle.propTypes = {
  lotState: PropTypes.string,
  timeout: PropTypes.number,
};

CardTitle.defaultProps = {
  lotState: '',
  timeout: null,
};

export default CardTitle;
