/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useRef } from 'react';
import { AllPhotosModalProvider } from 'frontend/js/context/AllPhotosModal';
import ViewModeContext from 'frontend/js/context/ViewModeContext';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import AllPhotosModal from 'frontend/js/views/Shared/AllPhotosModal';
import Pagination from 'frontend/js/components/Pagination';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import GoogleAd from 'frontend/js/components/GoogleAd';
import ArrayService from 'frontend/js/lib/utils/ArrayService';
import TableViewResults from './TableViewResults';
import useStyles from './useStyles';

function Results({ lots }) {
  const classes = useStyles();
  const [{ addWatchlistEntries }] = useWatchlistContext();
  const { isGridView } = useContext(ViewModeContext);
  const gridRef = useRef();
  const rowsArray = lots.map((lot) => <VehicleVerticalCard lot={lot} key={lot.id} />);

  const width = gridRef?.current?.getBoundingClientRect()?.width || 0;

  let itemsBeforeAd;
  switch (true) {
    case width > 1340:
      itemsBeforeAd = 4;
      break;
    case width > 1000:
      itemsBeforeAd = 3;
      break;
    case width > 768:
      itemsBeforeAd = 2;
      break;
    default:
      itemsBeforeAd = 4;
  }

  const rowsArrayWithAds = ArrayService.appendEl(rowsArray, itemsBeforeAd, (idx) => (
    <div className={classes.adsContainer}>
      <GoogleAd
        id={`div-gpt-ad-1665182489390-${idx}`}
        adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
        placement="watchlist-0"
        className="width-xl-728 spacer-xl-90 width-sm-300"
        withSlot
      />
    </div>
  ));

  useEffect(() => {
    addWatchlistEntries(lots);
  }, [lots]);

  return (
    <div ref={gridRef}>
      {isGridView ? (
        <div className={classes.grid}>{rowsArrayWithAds}</div>
      ) : (
        <AllPhotosModalProvider>
          <TableViewResults lots={lots} />
          <AllPhotosModal />
        </AllPhotosModalProvider>
      )}

      {lots.length <= 4 && (
        <GoogleAd
          id="div-gpt-ad-1665182489390-0"
          adUnitPath="/93216436/ABM-Internal-Area-728x90-300x100"
          placement="watchlist-0"
          className="width-xl-728 spacer-xl-90 width-sm-300 mt-10 mb-10"
          withSlot
        />
      )}

      <Pagination />
    </div>
  );
}

Results.propTypes = {};

export default Results;
