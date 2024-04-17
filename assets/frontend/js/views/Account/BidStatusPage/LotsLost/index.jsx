/* eslint-disable react/prop-types */
import React from 'react';
import Loader from 'frontend/js/views/Shared/Loader';
import useStyles from './useStyles';
import useLotsLost from './useLotsLost';
import PageContent from './PageContent';
import NoResultsState from '../Shared/NoResultsState';
import Filters from '../Shared/Filters';

function LotsLost({ handleCountUpdate }) {
  const classes = useStyles();
  const { loading, lots } = useLotsLost(handleCountUpdate);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Filters hasViewToggle />
      <>{lots.length > 0 ? <PageContent lots={lots} /> : <NoResultsState type="lotsLost" />}</>
    </div>
  );
}

export default LotsLost;
