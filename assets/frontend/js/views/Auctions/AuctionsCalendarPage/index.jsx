import React, { useState, useContext } from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ViewModeContext, { ViewModeProvider, viewModeOptions } from 'frontend/js/context/ViewModeContext';
import { SortProvider } from 'frontend/js/context/SortContext';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import CaptionPanel from './CaptionPanel';
import Calendar from './Calendar';
import sortOptions from './sortOptions';
import useAuctionCalendar from './useAuctionCalendar';

function AuctionsCalendarPage() {
  const [tab, setTab] = useState('all');
  const { view } = useContext(ViewModeContext);
  const [hideTimes, setHideTimes] = useState(false);

  const data = useAuctionCalendar(tab, view);

  function handleTabChange(value) {
    setTab(value);
  }

  return (
    <TabsContainer defaultTab={tab} onChange={handleTabChange}>
      <CaptionPanel auctionGroups={data.auctionGroups} setHideTimes={setHideTimes} hideTimes={hideTimes} />
      <ContainerFullScreen className="pb-50" isUltraWide>
        <Calendar data={data} hideTimes={hideTimes} />
      </ContainerFullScreen>
    </TabsContainer>
  );
}

export default () => (
  <ViewModeProvider defaultView={viewModeOptions.GRID} localStoragePrefix="auctionCalendar">
    <SortProvider options={sortOptions}>
      <AuctionsCalendarPage />
    </SortProvider>
  </ViewModeProvider>
);
