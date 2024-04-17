/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import Pagination from 'frontend/js/components/Pagination';
import AllPhotosModal from 'frontend/js/views/Shared/AllPhotosModal';
import TableView from './TableView';
import GridView from './GridView';

function PageContent(props) {
  const { isGridView } = useContext(ViewModeContext);

  return (
    <>
      {isGridView ? <GridView {...props} /> : <TableView {...props} />}
      <Pagination />
      <AllPhotosModal />
    </>
  );
}

export default PageContent;
