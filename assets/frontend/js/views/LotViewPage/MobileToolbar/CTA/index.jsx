import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BidService from 'frontend/js/api/BidService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import useIntl from 'frontend/js/hooks/useIntl';
import JoinAuctionButton from 'frontend/js/views/Shared/JoinAuctionButton';
import useStyles from './useStyles';

function CTA({ isLive, onClick, isAbove, lot }) {
  const classes = useStyles();
  const intl = useIntl();
  const isAwaitingSellerResponse = lot.bidStatus === BidService.STATUS_AWAITING_SELLER_RESPONSE;

  const translationSets = {
    startBidding: intl.formatMessage({ id: 'lotPage.bidInformation.startBidding' }),
    joinLiveAuction: intl.formatMessage({ id: 'lotPage.mobileToolbar.joinLiveAuction' }),
    manageYourBid: intl.formatMessage({ id: 'lotPage.mobileToolbar.manageYourBid' }),
  };

  let ctaLabel = translationSets.startBidding;

  if (isAwaitingSellerResponse) {
    ctaLabel = translationSets.manageYourBid;
  }

  return isLive ? (
    <JoinAuctionButton
      lot={lot}
      size="sm"
      color="green"
      label={translationSets.joinLiveAuction}
      isInline
      className={classes.live}
    />
  ) : (
    <button type="button" onClick={onClick} className={classes.root}>
      {ctaLabel}
      <svg
        className={classnames(classes.arrow, { 'is-rotated': isAbove })}
        width="9"
        height="13"
        viewBox="0 0 9 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.524138 4.93474L0.457414 4.87581C0.202098 4.62044 0.182498 4.21865 0.398586 3.9408L0.457518 3.87408L3.99752 0.334811C4.25274 0.0796366 4.65426 0.0598975 4.93212 0.275671L4.99886 0.33452L8.54297 3.87379C8.81977 4.15022 8.82008 4.59871 8.54365 4.87552C8.28848 5.13104 7.88671 5.15096 7.60869 4.93509L7.54192 4.87621L5.20833 2.54679L5.20833 12.1667C5.20833 12.5299 4.93489 12.8293 4.58261 12.8702L4.5 12.875C4.13674 12.875 3.83735 12.6016 3.79643 12.2493L3.79167 12.1667L3.79167 2.54467L1.45915 4.87592C1.20378 5.13123 0.801989 5.15083 0.524138 4.93474L0.457414 4.87581L0.524138 4.93474Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

CTA.propTypes = {
  onClick: PropTypes.func.isRequired,
  isAbove: PropTypes.bool.isRequired,
  isLive: PropTypes.bool.isRequired,
  lot: LotShape,
};

CTA.defaultProps = {
  lot: null,
};

export default CTA;
