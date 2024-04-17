/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import WatchlistSvg from 'frontend/images/shared/light-blue-set/ic_watchlist.svg';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import ViewModeToggler from 'frontend/js/components/ViewModeToggler';
import useLots from 'frontend/js/views/Account/SavedVehiclesPage/Watchlist/useLots';
import TabsToolbar from './TabsToolbar';
import useStyles from './useStyles';

function CaptionPanelSection({ watchlistCount, savedSearchesCount, status, viewMode }) {
  const classes = useStyles();
  const { viewModeOptions, view, setView } = useContext(ViewModeContext);
  const { isInitialLoad, lots } = useLots(status);
  const { isBelowSm } = useBreakpoint();

  return (
    <CaptionPanel
      label={<FormattedMessage id="shared.label.saved" />}
      footer={<TabsToolbar watchlistCount={watchlistCount} savedSearchesCount={savedSearchesCount} />}
      icon={WatchlistSvg}
      extra={
        !isInitialLoad &&
        viewMode &&
        lots.length > 0 && (
          <ViewModeToggler togglerModeOn={isBelowSm} viewModeOptions={viewModeOptions} view={view} setView={setView} />
        )
      }
      contentClassName={classes.panelContent}
      fullscreen
    />
  );
}

export default CaptionPanelSection;
