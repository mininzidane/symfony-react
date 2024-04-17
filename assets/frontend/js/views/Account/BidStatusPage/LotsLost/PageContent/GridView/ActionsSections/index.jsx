/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';
import ShowSimilar from './ShowSimilar';

function ActionsSections({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { currentBid, currency, slug, id, currentCustomerBid, searchHash } = lot;
  const href = getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );

  return (
    <div className={classes.root}>
      <ShowSimilar currentBid={currentBid} currency={currency} href={href} isIncrease={Boolean(currentCustomerBid)} />
    </div>
  );
}

ActionsSections.propTypes = {};

export default ActionsSections;
