/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import WatchlistControlOutlined from 'frontend/js/views/Shared/WatchlistControlOutlined';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function CopartAuction({ lot }) {
  const classes = useStyles();
  const { id, slug, inventoryAuction, searchHash, conditionReportScore } = lot;
  const { isActive, isTogglePossible, handleWatchlistClick } = useWatchlist(lot);
  const href = RouterService.getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );

  return (
    <>
      <a href={href} className={classes.root}>
        {id}
      </a>

      {conditionReportScore && (
        <div className={classes.cr}>
          <strong>
            <FormattedMessage id="shared.label.conditionReportAbbreviation" />: {conditionReportScore}
          </strong>
        </div>
      )}

      {isTogglePossible && (
        <WatchlistControlOutlined
          id={id}
          auction={inventoryAuction}
          isActive={isActive}
          onTriggerClick={handleWatchlistClick}
          isBorderedIcon
          hasLabel
        />
      )}
    </>
  );
}

export default CopartAuction;
