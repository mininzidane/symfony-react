/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Title from './Title';
import useStyles from './useStyles';

function Header({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { description, id, slug, inventoryAuction, searchHash } = lot;
  const { isActive, isTogglePossible, handleWatchlistClick } = useWatchlist(lot);

  return (
    <div className={classes.root}>
      <Title title={description} href={getRoute('lot', { searchHash }, false, { id, slug })} />

      {isTogglePossible && (
        <div className={classes.watchlist}>
          <WatchlistControlOutlined
            id={id}
            auction={inventoryAuction}
            isActive={isActive}
            onTriggerClick={handleWatchlistClick}
            isBorderedIcon
          />
        </div>
      )}
    </div>
  );
}

export default Header;
