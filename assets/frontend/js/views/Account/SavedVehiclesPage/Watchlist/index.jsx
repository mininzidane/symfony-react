/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import PaginationContext from 'frontend/js/context/PaginationContext';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import Loader from 'frontend/js/views/Shared/Loader';
import GoogleAd from 'frontend/js/components/GoogleAd';
import NotificationSettingsCard from '../NotificationSettings/Card';
import NotificationSettingsDropdown from '../NotificationSettings/Dropdown';
import useNotificationSettings from '../NotificationSettings/useNotificationSettings';
import EmptyState from './EmptyState';
import useLots from './useLots';
import Results from './Results';
import StatusSelect from './StatusSelect';
import SortBySelect from './SortBySelect';
import useStyles from './useStyles';

function Watchlist({ status, setStatus }) {
  const { setCurrentPage } = useContext(PaginationContext);
  const { viewModeOptions, view } = useContext(ViewModeContext);
  const { isBelowSm, isBelowLg, isAboveLg } = useBreakpoint();

  const notifications = useNotificationSettings('watchlist');
  const { isInitialLoad, lots } = useLots(status);
  const classes = useStyles({ loading: isInitialLoad });
  const hasResults = lots.length > 0;

  function handleStatusChange(value) {
    setStatus(value);
    setCurrentPage(1);
  }

  return (
    <ContainerFullScreen className={classes.root}>
      <div className={classes.toolbar}>
        <div className={classes.filtersLeft}>
          <StatusSelect onChange={handleStatusChange} status={status} />
          {isBelowLg && (view === viewModeOptions.GRID || isBelowSm) && <SortBySelect isFlipEnabled={false} />}
        </div>

        <div className={classes.filtersRight}>
          {isBelowLg ? (
            <NotificationSettingsDropdown {...notifications} />
          ) : (
            <>{view === viewModeOptions.GRID && <SortBySelect isFlipEnabled={false} />}</>
          )}
        </div>
      </div>

      <div className={classes.grid}>
        {isInitialLoad ? (
          <Loader />
        ) : (
          <div>{hasResults ? <Results lots={lots} /> : <EmptyState isCurrent={status === 'current'} />}</div>
        )}

        {isAboveLg && (
          <div>
            <NotificationSettingsCard {...notifications} />
            <GoogleAd
              id="div-gpt-ad-1665182489390-1"
              adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
              placement="watchlist-1"
              className="width-xl-300 mt-20 mb-20"
              desktopSize={[300, 250]}
              withSlot
            />
          </div>
        )}
      </div>
    </ContainerFullScreen>
  );
}

export default Watchlist;
