import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import WatchlistToggle from 'frontend/js/views/Shared/WatchlistControl/WatchlistToggle';
import WatchlistIcon from './Icons/Watchlist';
import useStyles from './useStyles';

function WatchlistControl({ id, auction, isActive }) {
  const classes = useStyles();

  return (
    <WatchlistToggle isWatched={isActive} id={id} auction={auction}>
      {({ onClick, isWatched }) => (
        <button type="button" onClick={onClick} className={classnames(classes.root, isWatched && 'is-watched')}>
          <WatchlistIcon isWatched={isWatched} />

          {isWatched ? (
            <FormattedMessage id="shared.cta.watchlist.remove" />
          ) : (
            <FormattedMessage id="shared.cta.watchlist.watch" />
          )}
        </button>
      )}
    </WatchlistToggle>
  );
}

WatchlistControl.propTypes = {
  id: PropTypes.oneOfType([(PropTypes.string, PropTypes.number)]).isRequired,
  auction: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default WatchlistControl;
