/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import BidNow from './BidNow';
import SoldViewDetailsButton from './SoldViewDetailsButton';
import BuyItNow from './BuyItNow';
import useStyles from './useStyles';

function Footer({ lot }) {
  const classes = useStyles();
  const { getRoute } = RouterService;
  const { slug, id, sold, buyItNow, searchHash } = lot;
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
      <BidNow lot={lot} href={href} />
      {Boolean(buyItNow) && <BuyItNow href={href} buyItNow={buyItNow} />}
    </div>
  );
}

export default Footer;
