/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import Title from './Title';
import WatchlistControl from './WatchlistControl';
import useStyles from './useStyles';

function Header({ lot, lotPurchase }) {
  const classes = useStyles();
  const isCopartAuction = Boolean(lot) && lot.inventoryAuction === LotService.AUCTION_COPART;
  const { id, description, year, make, model, slug: lotSlug, inventoryAuction, searchHash } = lot || {};

  let slug = lotSlug || '';
  if (inventoryAuction === LotService.AUCTION_IAA) {
    slug = 'ADD';
  }

  const ymm = lotPurchase
    ? `${lotPurchase.vehicleYear} ${lotPurchase.vehicleMake} ${lotPurchase.vehicleModel}`
    : description || `${year} ${make} ${model}`;

  return (
    <div className={classes.root}>
      <Title
        title={ymm}
        href={RouterService.getRoute(
          'lot',
          {
            searchHash,
          },
          false,
          { id, slug },
        )}
      />

      {isCopartAuction && <WatchlistControl className={classes.watchlist} lot={lot} />}
    </div>
  );
}

export default Header;
