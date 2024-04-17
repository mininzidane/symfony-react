/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import Pagination from 'frontend/js/components/Pagination';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import AllPhotosModal from 'frontend/js/views/Shared/AllPhotosModal';
import GoogleAd from 'frontend/js/components/GoogleAd';
import GridView from './GridView';
import TableView from './TableView';

function PageContent({ lots }) {
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const [{ setPreviewModalLots }] = usePreviewModalContext();
  const { isGridView } = useContext(ViewModeContext);

  useEffect(() => {
    setPreviewModalLots(lots);
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <>
      {isGridView ? <GridView lots={lots} /> : <TableView lots={lots} />}
      {lots.length <= 4 && (
        <GoogleAd
          id="div-gpt-ad-1665182489390-0"
          adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
          placement="current-bids-1"
          className="width-xl-728 spacer-xl-90 width-sm-300 mt-20 mb-20 sm-mb-10 sm-mt-10"
          withSlot
        />
      )}
      <Pagination />
      <AllPhotosModal />
    </>
  );
}

export default PageContent;
