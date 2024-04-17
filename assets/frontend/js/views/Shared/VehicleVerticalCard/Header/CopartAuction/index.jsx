/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Title from '../Title';
import useStyles from '../useStyles';

function CopartAuction({ lot, onWatchlistButtonClick }) {
  const { isActive, isTogglePossible: hasWatchlist, handleWatchlistClick } = useWatchlist(lot);
  const classes = useStyles({ hasWatchlist });
  const { getRoute } = RouterService;
  const { description, id, slug: lotSlug, inventoryAuction, make, model, year, searchHash } = lot;
  const title = description || `${year} ${make} ${model}`;

  let slug = lotSlug || '';
  if (inventoryAuction === LotService.AUCTION_IAA) {
    slug = 'ADD';
  }

  function handleClick() {
    handleWatchlistClick();
    onWatchlistButtonClick();
  }

  return (
    <div className={classes.root}>
      <Title title={title} href={getRoute('lot', { searchHash }, false, { id, slug })} />

      {hasWatchlist && (
        <WatchlistControlOutlined
          id={id}
          auction={inventoryAuction || LotService.AUCTION_COPART}
          isActive={isActive}
          onTriggerClick={handleClick}
          isBorderedIcon
        />
      )}
    </div>
  );
}

export default CopartAuction;
