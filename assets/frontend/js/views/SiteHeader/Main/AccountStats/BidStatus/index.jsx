/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, memo } from 'react';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import TooltipControlled from 'frontend/js/components/TooltipControlled';
import useToolbarWonLots from 'frontend/js/hooks/useToolbarWonLots';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import WonLotsDetails from 'frontend/js/views/Shared/WonLotsDetails';
import BidStatusDetails from './BidStatusDetails';
import BidStatusLink from './BidStatusLink';
import useStyles from '../useStyles';

function BidStatus() {
  const classes = useStyles();
  const { currentBidsCount, lotsWonCount } = useCustomerHelper();
  const { wonLots, saveDismissedLots } = useToolbarWonLots();

  const eventTrackingService = new EventTrackingService();
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isTooltipAnimating, setTooltipAnimating] = useState(false);
  let tooltipTimeout = null;

  const handleClick = () => {
    eventTrackingService.sendEvent({ name: 'bids_icon_click', step: 'abm_signed_up_user' });
  };

  const handleTooltipMouseLeave = () => {
    if (!(wonLots && wonLots.length)) {
      tooltipTimeout = setTimeout(() => {
        setTooltipOpen(false);
        setTooltipAnimating(true);

        setTimeout(() => {
          setTooltipAnimating(false);
        }, 200);
      }, 400);
    }
  };

  const handleTooltipMouseEnter = () => {
    clearTimeout(tooltipTimeout);

    if (!isTooltipAnimating) {
      setTooltipOpen(true);
    }
  };

  const closeWonLotsPopper = () => {
    const tooltipFadeDuration = 200;
    setTooltipOpen(false);

    setTimeout(() => {
      saveDismissedLots(wonLots);
    }, tooltipFadeDuration);
  };

  useEffect(() => {
    // if there are won lots, show congrats popper
    if (wonLots && wonLots.length) {
      setTooltipOpen(true);
    }
  }, [wonLots]);

  return (
    <div
      className={classes.section}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseMove={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      <TooltipControlled
        color="white"
        isOpen={isTooltipOpen}
        onClose={() => setTooltipOpen(false)}
        maxWidth={360}
        offset={15}
        isFlipEnabled={false}
        padding="16px 22px"
        hasArrow
        isBounceAnimation
        triggerClassName="d-ib va-t"
        trigger={
          <BidStatusLink onClick={handleClick} currentBidsCount={currentBidsCount} lotsWonCount={lotsWonCount} />
        }
        content={
          <>
            {wonLots && wonLots.length ? (
              wonLots.map((lot) => (
                <WonLotsDetails
                  onCrossClick={closeWonLotsPopper}
                  key={lot.id}
                  img={lot.img}
                  href={lot._links.self.href}
                  description={lot.description}
                />
              ))
            ) : (
              <BidStatusDetails currentBidsCount={currentBidsCount} lotsWonCount={lotsWonCount} />
            )}
          </>
        }
      />
    </div>
  );
}

export default memo(BidStatus);
