/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Tab from 'frontend/js/components/Tabs/Tab';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useStyles from './useStyles';
import StorageFeesTable from './StorageFeesTable';
import LaneDescriptionsTable from './LaneDescriptionsTable';

function Details({ locationName }) {
  const TABS = ['locationDetails', 'storageFees', 'laneDescriptions'];
  const classes = useStyles();
  const [tab, setTab] = useState(TABS[0]);

  function handleTabChangeOnEvent(e) {
    if (e?.detail?.tab) {
      setTab(e.detail.tab);
    }
  }

  useEventListener('openAuctionLocationDetails', handleTabChangeOnEvent);

  return (
    <div className={classes.root} id="location-details-description-tabs">
      <FormattedMessage
        className={classes.title}
        id="locationDetailsPage.details.title"
        values={{ location: locationName }}
      />

      <TabsContainer tab={tab} onChange={(t) => setTab(t)}>
        <TabsToolbar className={classes.toolbar} indicatorClassName={classes.indicatorClassName}>
          <Tab
            value={TABS[0]}
            className={classes.tab}
            label={<FormattedMessage id="locationDetailsPage.locationDetails.title" />}
          />
          <Tab
            value={TABS[1]}
            className={classes.tab}
            label={<FormattedMessage id="locationDetailsPage.infoCard.storageFees" />}
          />
          <Tab
            value={TABS[2]}
            className={classes.tab}
            label={<FormattedMessage id="locationDetailsPage.laneDescriptions.title" />}
          />
        </TabsToolbar>

        <TabContent id={TABS[0]}>
          <div className={classes.tabContent}>
            <FormattedMessage id="locationDetailsPage.locationDetails.details.value" />
          </div>
        </TabContent>

        <TabContent id={TABS[1]}>
          <div className={classes.tabContent}>
            <FormattedMessage id="locationDetailsPage.details.storageFeesDesc1" />
            <FormattedMessage id="locationDetailsPage.details.storageFeesDesc2" className={classes.feesDesc} />
            <StorageFeesTable />
          </div>
        </TabContent>

        <TabContent id={TABS[2]}>
          <div className={classes.tabContent}>
            <FormattedMessage id="locationDetailsPage.details.laneDescription" className={classes.laneDesc} />
            <LaneDescriptionsTable />
          </div>
        </TabContent>
      </TabsContainer>
    </div>
  );
}

export default Details;
