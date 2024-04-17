import React from 'react';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import t from 'frontend/js/api/TranslatorService';
import useWatchlistCount from 'frontend/js/hooks/useWatchlistCount';
import useStyles from '../useStyles';
import HeartIcon from './HeartIcon';

function Watchlist() {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();
  const eventTrackingService = new EventTrackingService();
  const watchlistCount = useWatchlistCount();
  const { getRoute } = RouterService;

  const handleClick = () => {
    eventTrackingService.sendEvent({ name: 'watchlist_icon_click', step: 'abm_signed_up_user' });
  };

  return (
    <a
      href={getRoute('watchlist')}
      className={classnames(classes.link, classes.section)}
      aria-label={t('header.watchlist')}
      onClick={handleClick}
    >
      <div className={classes.icon}>
        <HeartIcon />

        {!isAboveLg && <div className={classes.badge}>{watchlistCount}</div>}
      </div>

      {isAboveLg && (
        <div className={classes.linkText}>
          <div className={classes.caption}>{t('header.watchlist')}</div>
          <div className={classes.value}>{watchlistCount}</div>
        </div>
      )}
    </a>
  );
}

export default Watchlist;
