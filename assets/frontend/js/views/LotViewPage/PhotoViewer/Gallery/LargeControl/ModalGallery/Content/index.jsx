import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import LotService from 'frontend/js/api/LotService';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import useView from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext/useView';
import PrevNextControls from './PrevNextControls';
import WatchlistControl from './WatchlistControl';
import ViewModeControl from './ViewModeControl';
import Content from './Content';
import useData from './useData';
import useStyles from './useStyles';

function ModalContent({ id, auction, handleClose }) {
  const classes = useStyles();
  const { isBelowSm, isAboveSm } = useBreakpoint();
  const [currentLotParams, setCurrentLotParams] = useState({ id, auction });
  const data = useData(currentLotParams.id, currentLotParams.auction);
  const hdImages = data.lot.images.map((img) => img.hdr).filter(Boolean);
  const fullImages = data.lot.images.map((img) => img.full);
  const isHdPhotosAvailable = hdImages.length > 0;
  const [OPTIONS, view, setView, isGridView] = useView();

  return (
    <>
      <ModalWindowHeader
        title={<span className={classes.title}>{data.lot.description}</span>}
        onClose={handleClose}
        className={classes.header}
        controls={
          <div className={classes.controls}>
            {isAboveSm && (
              <>
                <WatchlistControl id={data.lot.id} isActive={data.lot.isWatched} auction={data.lot.inventoryAuction} />
                <PrevNextControls onChange={setCurrentLotParams} data={data} />
              </>
            )}
            {(isHdPhotosAvailable || isBelowSm) && (
              <ViewModeControl view={view} viewOptions={OPTIONS} setView={setView} />
            )}
          </div>
        }
      />
      <ModalWindowBody className={classes.body}>
        <Content
          title={data.lot.description}
          hdImages={hdImages}
          fullImages={fullImages}
          isHdPhotosAvailable={isHdPhotosAvailable}
          view={view}
          isGridView={isGridView}
        />
      </ModalWindowBody>
    </>
  );
}

ModalContent.propTypes = {
  id: PropTypes.number.isRequired,
  auction: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

ModalContent.defaultProps = {
  auction: LotService.AUCTION_COPART,
};

export default ModalContent;
