import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import WatchlistToggle from './WatchlistToggle';
import WatchlistThinIcon from './Icons/WatchlistThin';
import WatchlistIcon from './Icons/Watchlist';
import useStyles from './useStyles';

function WatchlistControl({ id, auction, isActive, hasSnackbarLink, hasLabel, ...props }) {
  const classes = useStyles();
  const { isTouchScreen } = ViewportService;
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!isTouchScreen) {
      setDisabled(true);
    }
  }, [isActive]);

  return (
    <div className="no-link">
      <WatchlistToggle
        isWatched={isActive}
        id={id}
        auction={auction}
        onMouseEnter={() => setDisabled(false)}
        hasSnackbarLink={hasSnackbarLink}
      >
        {({ onClick, isWatched }) => {
          const translationKey = isWatched ? 'shared.cta.watchlist.remove' : 'shared.cta.watchlist.watch';
          return hasLabel ? (
            <Button
              label={
                <div className={classnames(classes.btn, { 'is-active': isWatched })}>
                  <WatchlistIcon />
                  <FormattedMessage id={translationKey} className={classes.label} />
                </div>
              }
              onClick={onClick}
              {...props}
            />
          ) : (
            <TooltipOnHover
              trigger={<WatchlistThinIcon />}
              triggerProps={{
                className: classnames(classes.root, 'easy-hover', { 'is-active': isWatched }),
                onClick,
              }}
              offset={13}
              placement="top"
              color="black"
              padding=""
              isInteractive={false}
              isFlipEnabled={false}
              isDisabled={isTouchScreen || isDisabled}
              content={<FormattedMessage id={translationKey} />}
            />
          );
        }}
      </WatchlistToggle>
    </div>
  );
}

WatchlistControl.propTypes = {
  id: PropTypes.oneOfType([(PropTypes.string, PropTypes.number)]).isRequired,
  auction: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasSnackbarLink: PropTypes.bool,
  hasLabel: PropTypes.bool,
};

WatchlistControl.defaultProps = {
  hasSnackbarLink: true,
  hasLabel: false,
};

export default WatchlistControl;
