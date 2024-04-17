/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Title from './Title';
import useStyles from './useStyles';

function VehicleCardHeader({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { description, id, slug, inventoryAuction } = lot;
  const { isActive, isTogglePossible, handleWatchlistClick } = useWatchlist(lot);

  return (
    <div className={classes.root}>
      <Title title={description} href={getRoute('lot', null, false, { id, slug })} />

      {isTogglePossible && (
        <WatchlistControlOutlined
          id={id}
          auction={inventoryAuction}
          isActive={isActive}
          onTriggerClick={handleWatchlistClick}
          hasSnackbarLink={false}
          isBorderedIcon
        />
      )}
    </div>
  );
}

export default VehicleCardHeader;
