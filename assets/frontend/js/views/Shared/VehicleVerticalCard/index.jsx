/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import LotService from 'frontend/js/api/LotService';
import useStyles from './useStyles';
import Photo from './Photo';
import Header from './Header';
import Details from './Details';
import Controls from './Controls';
import QuickView from './QuickView';

const VehicleVerticalCard = memo(
  ({
    lot,
    lotPurchase,
    onQuickViewClick,
    noCarousel,
    onWatchlistButtonClick,
    onJoinLiveAuctionButtonClick,
    onBidNowButtonClick,
    onBuyItNowButtonClick,
    onSoldButtonClick,
    details,
    controls,
    isHighlighted,
    className,
  }) => {
    const classes = useStyles({ isHighlighted });
    const { isAboveSm } = useBreakpoint();

    function handleClick() {
      onQuickViewClick(lot.id);
    }

    const isCopartAuction = Boolean(lot) && lot.inventoryAuction === LotService.AUCTION_COPART;

    return (
      <div className={classnames(classes.root, className)} id={lot?.id || lotPurchase?.lotNumber}>
        {isAboveSm && isCopartAuction && onQuickViewClick && (
          <QuickView className={classes.quickView} onClick={handleClick} />
        )}

        <Photo lot={lot} noCarousel={noCarousel} />

        <div className={classes.content}>
          <Header lot={lot} lotPurchase={lotPurchase} onWatchlistButtonClick={onWatchlistButtonClick} />
          {details || <Details lot={lot} onBuyItNowButtonClick={onBuyItNowButtonClick} />}
        </div>

        {controls || (
          <Controls
            lot={lot}
            onJoinLiveAuctionButtonClick={onJoinLiveAuctionButtonClick}
            onBidNowButtonClick={onBidNowButtonClick}
            onBuyItNowButtonClick={onBuyItNowButtonClick}
            onSoldButtonClick={onSoldButtonClick}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const isSameBidder =
      prevProps.lot?.currentCustomerBid?.bidderName === nextProps.lot?.currentCustomerBid?.bidderName;
    const isSameLot = prevProps.lot?.id === nextProps.lot?.id;

    return isSameLot && isSameBidder;
  },
);

VehicleVerticalCard.propTypes = {
  onWatchlistButtonClick: PropTypes.func,
  onJoinLiveAuctionButtonClick: PropTypes.func,
  onBidNowButtonClick: PropTypes.func,
  onBuyItNowButtonClick: PropTypes.func,
  onSoldButtonClick: PropTypes.func,
};

VehicleVerticalCard.defaultProps = {
  onWatchlistButtonClick: () => {},
  onJoinLiveAuctionButtonClick: () => {},
  onBidNowButtonClick: () => {},
  onBuyItNowButtonClick: () => {},
  onSoldButtonClick: () => {},
};

export default VehicleVerticalCard;
