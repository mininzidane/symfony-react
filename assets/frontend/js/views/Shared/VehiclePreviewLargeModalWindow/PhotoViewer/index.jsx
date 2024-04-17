/* eslint-disable react/prop-types */
import React from 'react';
import useCounterBiddingAvailable from 'frontend/js/hooks/useCounterBiddingAvailable';
import DesktopGallery from './DesktopGallery';
import LoadingState from './LoadingState';
import SoldState from './SoldState';

function PhotoViewer({ lot }) {
  const isCounterBiddingAvailable = useCounterBiddingAvailable(lot);

  if (!lot) {
    return <LoadingState />;
  }

  if (lot.sold && !lot.viewAccessIfSold && !isCounterBiddingAvailable) {
    return <SoldState lot={lot} />;
  }

  return (
    <div>
      <DesktopGallery images={lot.images} id={lot.id} title={lot.description} />
    </div>
  );
}

export default PhotoViewer;
