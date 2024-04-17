/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import BidNow from './BidNow';
import SoldViewDetailsButton from './SoldViewDetailsButton';
import useStyles from './useStyles';

function Footer({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { slug, id, currentBid, currentCustomerBid, sold, searchHash } = lot;
  const href = getRoute(
    'lot',
    {
      searchHash,
    },
    false,
    { id, slug },
  );

  if (sold) {
    return <SoldViewDetailsButton href={href} />;
  }

  return (
    <div className={classes.root}>
      <BidNow lot={lot} href={href} isIncrease={Boolean(currentCustomerBid)} currentBid={currentBid} />
    </div>
  );
}

export default Footer;
