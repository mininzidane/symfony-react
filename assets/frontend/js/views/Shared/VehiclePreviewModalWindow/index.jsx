import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import ImageGallery from 'frontend/js/components/ImageGallery';
import Header from './Header';
import Details from './Details';
import ClearVinPromo from './ClearVinPromo';
import useStyles from './useStyles';

function VehiclePreviewModalWindow({ onClose, isOpen }) {
  const classes = useStyles();
  const [{ currentLot }] = usePreviewModalContext();

  if (!currentLot) {
    return null;
  }

  return (
    <ModalWindow className={classes.root} onClose={onClose} isOpen={isOpen} width={1000}>
      <div>
        <Header lot={currentLot} />

        <div className={classes.grid}>
          <div>
            <div className={classes.imageGalleryWrap}>
              <div className={classes.imageGalleryContainer}>
                <ImageGallery images={currentLot && currentLot.images} showThumbnails />
              </div>
            </div>
            <ClearVinPromo lot={currentLot} />
          </div>

          <Details lot={currentLot} />
        </div>
      </div>
    </ModalWindow>
  );
}

VehiclePreviewModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default VehiclePreviewModalWindow;
