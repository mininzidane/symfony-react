/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Container from 'frontend/js/components/Container';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useStyles from './useStyles';
import WatchlistSvg from './img/ic_watchlist.svg';

function EmptyState({ isCurrent }) {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <img src={WatchlistSvg} width="72" alt="Watchlist" />

        <h2 className={classes.title}>
          <FormattedMessage
            id={
              isCurrent
                ? 'savedVehiclesPage.emptyState.title.watchlistCurrent'
                : 'savedVehiclesPage.emptyState.title.watchlistCompleted'
            }
          />
        </h2>

        {isCurrent && (
          <>
            <p className={classes.subtitle}>
              <FormattedMessage id="savedVehiclesPage.emptyState.subtitle.watchlist" />
            </p>

            <Button
              label={<FormattedMessage id="shared.label.searchNow" />}
              href={RouterService.getRoute('searchResults')}
              className={classes.button}
              isInline
              isRegularCase
            />
          </>
        )}
      </div>

      <GoogleAd
        id="div-gpt-ad-1665182489390-0"
        adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
        placement="watchlist-0"
        className="width-xl-728 spacer-xl-90 width-sm-300 mb-20 mt-20 sm-mb-10 sm-mt-10"
        withSlot
      />
    </Container>
  );
}

export default EmptyState;
