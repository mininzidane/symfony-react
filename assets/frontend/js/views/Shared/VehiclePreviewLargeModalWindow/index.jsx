import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import ClearVinDetails from 'frontend/js/views/LotViewPage/ClearVinDetails';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Header from './Header';
import BidInformation from './BidInformation';
import LotDetails from './LotDetails';
import Controls from './Header/Controls';
import useStyles from './useStyles';
import PhotoViewer from './PhotoViewer';

function VehiclePreviewLargeModalWindow({
  onClose,
  isOpen,
  onWatchlistButtonClick,
  onNextLotButtonClick,
  onViewDetailsClick,
  onVinDetailsClick,
}) {
  const classes = useStyles();
  const [{ currentLot }] = usePreviewModalContext();
  const { isBelowMd, isAboveMd } = useBreakpoint();

  if (!currentLot) {
    return null;
  }

  return (
    <ModalWindow className={classes.root} onClose={onClose} isOpen={isOpen} width={1275} name="quick-view">
      <ModalWindowHeader
        title={
          <>
            <FormattedMessage id="shared.label.lotId" /> {currentLot?.id}
          </>
        }
        onClose={onClose}
        controls={<Controls lot={currentLot} onNextLotButtonClick={onNextLotButtonClick} />}
      />
      <ModalWindowBody>
        <>
          <Header
            lot={currentLot}
            onViewDetailsClick={onViewDetailsClick}
            onWatchlistButtonClick={onWatchlistButtonClick}
          />

          <div className={classes.grid}>
            <div>
              <PhotoViewer lot={currentLot} />
              {isBelowMd && (
                <div className={classes.cvDetails}>
                  <ClearVinDetails lotId={currentLot?.id} lot={currentLot} />
                </div>
              )}
            </div>
            <div>
              <BidInformation lot={currentLot} />
              <LotDetails lot={currentLot} onVinDetailsClick={onVinDetailsClick} />

              {isAboveMd && (
                <div className={classes.cvDetails}>
                  <ClearVinDetails lotId={currentLot?.id} lot={currentLot} />
                </div>
              )}
            </div>
          </div>
        </>
      </ModalWindowBody>
    </ModalWindow>
  );
}

VehiclePreviewLargeModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onWatchlistButtonClick: PropTypes.func,
  onNextLotButtonClick: PropTypes.func,
  onViewDetailsClick: PropTypes.func,
  onVinDetailsClick: PropTypes.func,
};

VehiclePreviewLargeModalWindow.defaultProps = {
  onWatchlistButtonClick: () => {},
  onNextLotButtonClick: () => {},
  onViewDetailsClick: () => {},
  onVinDetailsClick: () => {},
};

export default VehiclePreviewLargeModalWindow;
