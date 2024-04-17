/* eslint-disable react/prop-types */
import React from 'react';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import { useAllPhotosModalContext } from 'frontend/js/context/AllPhotosModal';
import { DisplaySettingsProvider } from 'frontend/js/views/SearchResultsPage/_Context/DisplaySettingsContext';
import ViewModeControl from './ViewModeControl';
import useStyles from './useStyles';
import Content from './Content';

function AllPhotosModal() {
  const classes = useStyles();
  const [{ currentLot, setCurrentLot }] = useAllPhotosModalContext();
  const { description, images } = currentLot || {};

  const lotImages = images || [];
  const hdImages = lotImages.map((img) => img.hdr).filter(Boolean);
  const fullImages = lotImages.map((img) => img.full);
  const isHdPhotosAvailable = hdImages.length > 0;

  function handleClose() {
    setCurrentLot(null);
  }

  return (
    <DisplaySettingsProvider>
      <ModalWindow isOpen={Boolean(currentLot)} onClose={handleClose} className={classes.root} size="fullscreen">
        <ModalWindowHeader
          title={<span className={classes.title}>{description || ''}</span>}
          onClose={handleClose}
          className={classes.header}
          controls={isHdPhotosAvailable && <ViewModeControl />}
          controlsClassName={classes.controls}
        />
        <ModalWindowBody className={classes.body}>
          <Content
            title={description}
            hdImages={hdImages}
            fullImages={fullImages}
            isHdPhotosAvailable={isHdPhotosAvailable}
          />
        </ModalWindowBody>
      </ModalWindow>
    </DisplaySettingsProvider>
  );
}

export default AllPhotosModal;
