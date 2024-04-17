/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import WatchlistToggle from 'frontend/js/views/Shared/WatchlistControl/WatchlistToggle';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import Control from '../Control';
import WatchlistIcon from './Icons/Watchlist';
import useStyles from './useStyles';

function WatchlistControl({ lot }) {
  const classes = useStyles();
  const { id, inventoryAuction } = lot;
  const { isActive, isTogglePossible, handleWatchlistClick } = useWatchlist(lot);

  if (!isTogglePossible) {
    return null;
  }

  return (
    <div className={classes.root}>
      <WatchlistToggle
        isWatched={isActive}
        id={id}
        hasSnackbarLink={false}
        auction={inventoryAuction}
        onToggle={handleWatchlistClick}
      >
        {({ onClick, isWatched }) => (
          <Control
            onClick={onClick}
            label={
              isWatched ? (
                <FormattedMessage id="lotPage.modalGallery.watchlist.remove" />
              ) : (
                <FormattedMessage id="lotPage.modalGallery.watchlist.add" />
              )
            }
            icon={<WatchlistIcon className={isWatched ? classes.watched : ''} />}
          />
        )}
      </WatchlistToggle>
    </div>
  );
}

export default WatchlistControl;
