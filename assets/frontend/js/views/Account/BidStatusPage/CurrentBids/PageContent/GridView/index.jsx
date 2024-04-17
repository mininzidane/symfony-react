/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useEffect } from 'react';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import ChunksRender from 'frontend/js/components/ChunksRender';
import GoogleAd from 'frontend/js/components/GoogleAd';
import ArrayService from 'frontend/js/lib/utils/ArrayService';
import useStyles from './useStyles';
import DetailsSection from './DetailsSection';

function GridView({ lots }) {
  const classes = useStyles();
  const [{ setCurrentLotId, setIsModalOpen }] = usePreviewModalContext();
  const chunkSize = useRef(Infinity);

  const handleQuickViewClick = useCallback((id) => {
    setCurrentLotId(id);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    chunkSize.current = 8;
  }, []);

  const lotsArr = lots.map((lot) => (
    <VehicleVerticalCard
      lot={lot}
      key={lot.id}
      onQuickViewClick={handleQuickViewClick}
      details={<DetailsSection lot={lot} />}
    />
  ));
  const itemsBeforeAd = 4;
  const lotsWithAds = ArrayService.appendEl(lotsArr, itemsBeforeAd, (idx) => (
    <GoogleAd
      id={`div-gpt-ad-1665182489390-${idx}`}
      adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
      placement="current-bids-1"
      className="width-xl-728 spacer-xl-90 width-sm-300 mt-20 mb-20 sm-mb-10 sm-mt-10"
      withSlot
    />
  ));

  return (
    <div className={classes.root}>
      <ChunksRender chunkSize={chunkSize.current}>{lotsWithAds}</ChunksRender>
    </div>
  );
}

export default GridView;
