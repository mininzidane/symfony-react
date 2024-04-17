import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import WatchlistToggle from 'frontend/js/views/Shared/WatchlistControl/WatchlistToggle';
import WatchlistIcon from './Icons/Watchlist';
import useStyles from './useStyles';

function WatchlistControlOutlined({ id, auction, isActive, hasSnackbarLink, onTriggerClick, hasLabel, isMd }) {
  const classes = useStyles({ hasLabel });
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
        onToggle={onTriggerClick}
      >
        {({ onClick, isWatched }) => {
          const className = classnames(
            classes.root,
            isWatched && classes.active,
            hasLabel && 'has-label',
            isMd && 'is-md',
          );
          const translationKey = isWatched ? 'shared.cta.watchlist.remove' : 'shared.cta.watchlist.watch';

          return hasLabel ? (
            <button type="button" className={className} onClick={onClick}>
              <WatchlistIcon />
              <FormattedMessage id={translationKey} className={classnames(classes.label, isMd && 'is-md')} />
            </button>
          ) : (
            <TooltipOnHover
              trigger={<WatchlistIcon />}
              triggerProps={{ className, onClick }}
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

WatchlistControlOutlined.propTypes = {
  id: PropTypes.oneOfType([(PropTypes.string, PropTypes.number)]).isRequired,
  auction: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  hasSnackbarLink: PropTypes.bool,
  hasLabel: PropTypes.bool,
  isMd: PropTypes.bool,
  onTriggerClick: PropTypes.func,
};

WatchlistControlOutlined.defaultProps = {
  hasSnackbarLink: true,
  hasLabel: false,
  isMd: false,
  onTriggerClick: () => {},
};

export default WatchlistControlOutlined;
