/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import NoResultsState from '../Shared/NoResultsState';
import { useContainerIdsContext } from '../Context/ContainerIds';
import useB2bShippingOrders from './useB2bShippingOrders';
import PageContent from './PageContent';
import Filters from './Filters';
import useStyles from './useStyles';

function B2bContainers({ handleCountUpdate }) {
  const classes = useStyles();

  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);
  const [{ selectedContainerIds }] = useContainerIdsContext();
  const { loading, total, data } = useB2bShippingOrders(handleCountUpdate, selectedContainerIds, setIsFirstTimeLoading);

  const entries = Object.values(data);

  if (isFirstTimeLoading) {
    return (
      <div className={classes.root}>
        <Loader />
      </div>
    );
  }

  if (entries.length === 0 && selectedContainerIds.length === 0) {
    return <NoResultsState type="containers" />;
  }

  return (
    <div className={classes.root}>
      <Filters />
      <PageContent invoices={entries} isLoading={loading} total={total} containers={selectedContainerIds} />
    </div>
  );
}

export default B2bContainers;
