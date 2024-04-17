/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import useStyles from './useStyles';

function DocumentViewModal({ imgSrc, setModalImageSrc }) {
  const classes = useStyles();

  function handleClose() {
    setModalImageSrc(null);
  }

  return (
    <ModalWindow isOpen={Boolean(imgSrc)} onClose={handleClose} hasCloseButton={false} width="auto">
      <ModalWindowHeader title={<FormattedMessage id="shared.label.governmentPhotoId" />} onClose={handleClose} />
      <ModalWindowBody>
        <img src={imgSrc} alt="Document" className={classes.image} />
      </ModalWindowBody>
    </ModalWindow>
  );
}

DocumentViewModal.propTypes = {};

export default DocumentViewModal;
