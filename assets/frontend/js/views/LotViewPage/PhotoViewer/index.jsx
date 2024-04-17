/* eslint-disable react/prop-types */
import React from 'react';
import useCounterBiddingAvailable from 'frontend/js/hooks/useCounterBiddingAvailable';
import LotPageBlock from '../LotPageBlock';
import Gallery from './Gallery';
import SoldState from './SoldState';
import useStyles from './useStyles';

function PhotoViewer({ lot }) {
  const classes = useStyles();
  const isCounterBiddingAvailable = useCounterBiddingAvailable(lot);

  if (lot.sold && !lot.viewAccessIfSold && !isCounterBiddingAvailable) {
    return (
      <LotPageBlock className={classes.root}>
        <SoldState lot={lot} />
      </LotPageBlock>
    );
  }

  return (
    <LotPageBlock className={classes.root}>
      <Gallery images={lot.images} id={lot.id} auction={lot.inventoryAuction} title={lot.description} />
    </LotPageBlock>
  );
}

export default PhotoViewer;
