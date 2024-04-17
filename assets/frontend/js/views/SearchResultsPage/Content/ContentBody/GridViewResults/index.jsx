/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import GoogleAd from 'frontend/js/components/GoogleAd';
import useEventListener from 'frontend/js/hooks/useEventListener';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import ChunksRender from 'frontend/js/components/ChunksRender';
import SchemaEventJsonLdBlock from '../SchemaEventJsonLdBlock';
import useStyles from './useStyles';

function GridViewResults({ lots, lastVisitedLotId }) {
  const classes = useStyles();
  const eventTrackingService = new EventTrackingService();
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [{ setCurrentLotId, setIsModalOpen }] = usePreviewModalContext();
  const chunkSize = useRef(Infinity);
  const gridRef = useRef();

  function track(substep) {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep });
  }

  const handleQuickViewClick = useCallback((id) => {
    track('view_button_carcard_click');
    setCurrentLotId(id);
    setIsModalOpen(true);
  }, []);

  function calcItemsPerRow() {
    const MIN_ITEM_WIDTH = 320;
    const $grid = gridRef.current;
    let gridGap = 20;

    if (window.innerWidth <= 1368) {
      gridGap = window.innerWidth > 768 ? 12 : 14;
    }

    setItemsPerRow(Math.floor(1 + ($grid.clientWidth - MIN_ITEM_WIDTH) / (MIN_ITEM_WIDTH + gridGap)));
  }

  function checkAdsDisplayCondition(index) {
    if (index === 0) {
      return false;
    }

    if (itemsPerRow === 1) {
      return index % 3 === 0;
    }

    if (index === itemsPerRow) {
      return true;
    }

    if (index > itemsPerRow) {
      // Every 2 rows starting from 2nd row
      if ((index - itemsPerRow) % (itemsPerRow * 2) === 0) {
        return true;
      }
    }

    return false;
  }

  useEffect(() => {
    chunkSize.current = 8;
    calcItemsPerRow();
  }, []);

  useEventListener('resize', () => calcItemsPerRow());

  return (
    <div className={classes.root} ref={gridRef}>
      <ChunksRender chunkSize={chunkSize.current}>
        {lots.map((lot, index) => (
          <Fragment key={lot.id}>
            {checkAdsDisplayCondition(index) && (
              <div className={classes.adsContainer}>
                <GoogleAd
                  id={`div-gpt-ad-1659353703790-${index}`}
                  className="width-xl-728 width-sm-300"
                  adUnitPath="/93216436/Search-Page-Grid-728x90-300x250"
                  targetsArray={['page_spot', ['bottom_1']]}
                  pubTargetsArray={['page', ['main_page']]}
                  placement="srp_results_grid"
                  withSlot
                />
              </div>
            )}

            <VehicleVerticalCard
              lot={lot}
              isHighlighted={lastVisitedLotId === lot.id}
              onWatchlistButtonClick={() => track('watchlist_button_carcard_click')}
              onJoinLiveAuctionButtonClick={() => track('joinauction_button')}
              onBidNowButtonClick={() => track('bidnow_button')}
              onBuyItNowButtonClick={() => track('buyitnow_button')}
              onSoldButtonClick={() => track('choose_car_on')}
              onQuickViewClick={handleQuickViewClick}
            />
            <SchemaEventJsonLdBlock lot={lot} />
          </Fragment>
        ))}
      </ChunksRender>
    </div>
  );
}

export default GridViewResults;
