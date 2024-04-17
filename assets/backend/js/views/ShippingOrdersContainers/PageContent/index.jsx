/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import Pagination from 'backend/js/components/Pagination';
import PaginationContext from 'frontend/js/context/PaginationContext';
import TableView from './TableView';
import TitleSection from './TitleSection';
import EmptyResultsState from './EmptyResultsState';

function PageContent({ invoices, isLoading, total, containers }) {
  const { maxPagesCount, itemsPerPage, currentPage, setCurrentPage } = useContext(PaginationContext);

  if (isLoading) {
    return <Loader style={{ marginTop: 40 }} minHeight={360} />;
  }

  return invoices.length > 0 ? (
    <>
      <TitleSection count={total} />
      <TableView invoices={invoices} isLoading={isLoading} />
      <Pagination
        onPageUpdate={setCurrentPage}
        maxNumberOfPages={maxPagesCount}
        currentPage={currentPage}
        numResults={total}
        pageSize={itemsPerPage}
      />
    </>
  ) : (
    <EmptyResultsState containers={containers} />
  );
}

export default PageContent;
