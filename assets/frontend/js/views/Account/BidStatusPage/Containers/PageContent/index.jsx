/* eslint-disable react/prop-types */
import React from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import Pagination from 'frontend/js/components/Pagination';
import TableView from './TableView';
import TitleSection from './TitleSection';
import EmptyResultsState from './EmptyResultsState';

function PageContent({ invoices, isLoading, total, containers }) {
  if (isLoading) {
    return <Loader style={{ marginTop: 40 }} minHeight={360} />;
  }

  return invoices.length > 0 ? (
    <>
      <TitleSection count={total} />
      <TableView invoices={invoices} isLoading={isLoading} />
      <Pagination />
    </>
  ) : (
    <EmptyResultsState containers={containers} />
  );
}

export default PageContent;
