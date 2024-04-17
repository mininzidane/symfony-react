import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ImageGallery from 'frontend/js/components/ImageGallery';
import useStyles from './useStyles';

function PhotoModal({ isOpen, onClose, startIndex, images, title }) {
  const classes = useStyles();

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} hasCloseButton={false} className={classes.root} width="auto">
      <ModalWindowHeader title={title} onClose={onClose} />

      <ModalWindowBody className={classes.photoModalBody}>
        <ImageGallery images={images} startIndex={startIndex} />
      </ModalWindowBody>
    </ModalWindow>
  );
}

PhotoModal.defaultProps = {
  images: [],
};

PhotoModal.propTypes = {
  images: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  startIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default PhotoModal;
