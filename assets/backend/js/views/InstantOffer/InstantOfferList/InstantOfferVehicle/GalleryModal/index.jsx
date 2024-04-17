/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindow from 'backend/js/components/ModalWindow';
import Gallery from 'backend/js/views/_Shared/Gallery';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';

function GalleryModal({ id, contentType, title, trigger: Component }) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const instantOfferService = new InstantOfferService();

  useEffect(() => {
    if (isOpen) {
      instantOfferService.getFilesByContentType(id, contentType).then(({ files: filesList }) => {
        setFiles(
          filesList.map((file) => ({
            full: file.s3Url,
            description: DateTimeService.formatFromISOStringWithoutTimezone(file.uploadedAt, 'MM/dd/yyyy H:mmaaa'),
          })),
        );
      });
    }
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <Component onClick={() => setIsOpen(true)} />
      <ModalWindow isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalWindowHeader title={title} onClose={handleClose} />
        <ModalWindowBody>
          <Gallery images={files} title={title} />
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

export default GalleryModal;
