/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import Pagination from 'frontend/js/components/Pagination';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import VehiclePreviewModal from '../../Shared/VehiclePreviewModal';
import GridView from './GridView';
import TableView from './TableView';

function PageContent({ lots }) {
  const [{ setPreviewModalLots }] = usePreviewModalContext();
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const { isGridView } = useContext(ViewModeContext);

  useEffect(() => {
    setPreviewModalLots(lots);
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <>
      {isGridView ? <GridView lots={lots} /> : <TableView lots={lots} />}
      <Pagination />
      <VehiclePreviewModal lots={lots} />
    </>
  );
}

export default PageContent;
