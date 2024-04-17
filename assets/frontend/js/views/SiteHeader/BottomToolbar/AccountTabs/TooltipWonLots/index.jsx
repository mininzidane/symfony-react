/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TooltipControlled from 'frontend/js/components/TooltipControlled';
import WonLotsDetails from 'frontend/js/views/Shared/WonLotsDetails';
import useStyles from './useStyles';

function TooltipWonLots({ wonLots, saveDismissedLots }) {
  const classes = useStyles();

  const [isTooltipOpen, setTooltipOpen] = useState(false);

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

  if (!wonLots || !wonLots.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <TooltipControlled
        color="white"
        isOpen={isTooltipOpen}
        onClose={() => setTooltipOpen(false)}
        maxWidth={360}
        offset={10}
        isFlipEnabled={false}
        padding="16px 22px"
        hasArrow
        isBounceAnimation
        trigger={<div />}
        placement="top"
        content={
          <>
            {wonLots.map((lot) => (
              <WonLotsDetails
                onCrossClick={closeWonLotsPopper}
                key={lot.id}
                img={lot.img}
                href={lot._links.self.href}
                description={lot.description}
              />
            ))}
          </>
        }
      />
    </div>
  );
}

TooltipWonLots.defaultProps = {
  wonLots: [],
  saveDismissedLots: () => {},
};

TooltipWonLots.propTypes = {
  wonLots: PropTypes.arrayOf(PropTypes.object),
  saveDismissedLots: PropTypes.func,
};

export default TooltipWonLots;
