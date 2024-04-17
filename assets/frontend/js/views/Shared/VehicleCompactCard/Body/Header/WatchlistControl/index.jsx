/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';

function WatchlistControl({ className, lot }) {
  const { id, sold, inventoryAuction } = lot;
  const [{ isIdWatched, toggleEntryState, watchlist }] = useWatchlistContext();
  const [isActive, setIsActive] = useState(isIdWatched(id));
  const isTogglePossible = !(sold && !isActive);

  function handleWatchlistClick() {
    toggleEntryState(id);
  }

  useEffect(() => {
    if (lot.id) {
      setIsActive(isIdWatched(lot.id));
    }
  }, [watchlist, lot]);

  if (isTogglePossible) {
    return (
      <div className={className}>
        <WatchlistControlOutlined
          id={id}
          auction={inventoryAuction}
          isActive={isActive}
          onTriggerClick={handleWatchlistClick}
          isBorderedIcon
        />
      </div>
    );
  }

  return null;
}

export default WatchlistControl;
