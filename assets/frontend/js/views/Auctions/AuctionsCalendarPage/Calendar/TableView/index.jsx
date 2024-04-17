/* eslint-disable react/prop-types */
import React from 'react';
import Pagination from 'frontend/js/components/Pagination';
import ThemedTable from 'frontend/js/components/ThemedTable';
import { PaginationProvider } from 'frontend/js/context/PaginationContext';
import useTableData from './useTableData';
import useStyles from './useStyles';

function TableView({ auctions }) {
  const classes = useStyles();
  const { headData, bodyData } = useTableData(auctions);

  return (
    <>
      <ThemedTable className={classes.table} headData={headData} bodyData={bodyData} />
      <Pagination isAuthRequired={false} />
    </>
  );
}

export default (props) => (
  <PaginationProvider itemsPerPage={30}>
    <TableView {...props} />
  </PaginationProvider>
);
