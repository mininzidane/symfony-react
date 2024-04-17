/* eslint-disable react/prop-types */
import React from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import { AllPhotosModalProvider } from 'frontend/js/context/AllPhotosModal';
import useStyles from './useStyles';
import useCurrentBids from './useCurrentBids';
import PageContent from './PageContent';
import NoResultsState from '../Shared/NoResultsState';
import Filters from '../Shared/Filters';

function CurrentBids({ handleCountUpdate }) {
  const classes = useStyles();
  const { isInitialLoad, lots, bidders, dateRanges } = useCurrentBids(handleCountUpdate);

  if (isInitialLoad) {
    return <Loader />;
  }

  return (
    <AllPhotosModalProvider>
      <div className={classes.root}>
        <Filters bidders={bidders} dateRanges={dateRanges} hasTime hasViewToggle />
        <>{lots.length > 0 ? <PageContent lots={lots} /> : <NoResultsState type="currentBids" />}</>
      </div>
    </AllPhotosModalProvider>
  );
}

CurrentBids.propTypes = {};

export default CurrentBids;
