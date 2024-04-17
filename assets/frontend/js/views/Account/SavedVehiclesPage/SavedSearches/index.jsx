/* eslint-disable react/prop-types */
import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Loader from 'frontend/js/views/Shared/Loader';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import NotificationSettingsCard from '../NotificationSettings/Card';
import NotificationSettingsDropdown from '../NotificationSettings/Dropdown';
import useNotificationSettings from '../NotificationSettings/useNotificationSettings';
import EmptyState from './EmptyState';
import useSearches from './useSearches';
import Results from './Results';
import useStyles from './useStyles';

function SavedSearches() {
  const [searches, isLoadingSearches] = useSearches();
  const notifications = useNotificationSettings('savedSearches');
  const classes = useStyles();
  const { isBelowMd, isAboveMd } = useBreakpoint();

  if (isLoadingSearches) {
    return <Loader />;
  }

  return (
    <ContainerFullScreen className={classes.root}>
      {searches.length > 0 ? (
        <>
          {isBelowMd && (
            <div className={classes.toolbar}>
              <NotificationSettingsDropdown {...notifications} />
            </div>
          )}

          <div className={classes.grid}>
            <div>
              <Results searches={searches} />

              {searches.length <= 6 && (
                <GoogleAd
                  id="div-gpt-ad-1665182489390-0"
                  adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
                  placement="saved-search-0"
                  className="width-xl-728 spacer-xl-90 width-sm-300 mt-20 mb-20"
                  withSlot
                />
              )}
            </div>
            {isAboveMd && (
              <div>
                <NotificationSettingsCard {...notifications} />
                <GoogleAd
                  id="div-gpt-ad-1665182489390-1"
                  adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
                  placement="saved-search-1"
                  className="width-xl-300 mt-20 mb-20"
                  desktopSize={[300, 250]}
                  withSlot
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <EmptyState />
        </>
      )}
    </ContainerFullScreen>
  );
}

export default SavedSearches;
