import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UploadedDocumentCard from './UploadedDocumentCard';

function ExternalImages({ images, checked, toggle }) {
  if (images.length === 0) {
    return null;
  }
  const [warehousePictures] = useState(images.filter((item) => item.type === 2));
  const [driverPictures] = useState(images.filter((item) => item.type === 1));
  const [unloadingPictures] = useState(images.filter((item) => item.type === 3));

  return (
    <>
      <h4>Pick Up Images ({driverPictures.length})</h4>

      <div className="uploaded-documents__card-list">
        {driverPictures.map((document) => (
          <UploadedDocumentCard
            key={document.id}
            document={document}
            checked={checked.includes(document.id)}
            toggle={() => toggle(document.id)}
          />
        ))}
      </div>

      <h4>Warehouse Images ({warehousePictures.length})</h4>

      <div className="uploaded-documents__card-list">
        {warehousePictures.map((document) => (
          <UploadedDocumentCard
            key={document.id}
            document={document}
            checked={checked.includes(document.id)}
            toggle={() => toggle(document.id)}
          />
        ))}
      </div>

      <h4>Unloading Pictures ({unloadingPictures.length})</h4>

      <div className="uploaded-documents__card-list">
        {unloadingPictures.map((document) => (
          <UploadedDocumentCard
            key={document.id}
            document={document}
            checked={checked.includes(document.id)}
            toggle={() => toggle(document.id)}
          />
        ))}
      </div>
    </>
  );
}

ExternalImages.defaultProps = {
  checked: [],
  toggle: () => {},
};

ExternalImages.propTypes = {
  images: PropTypes.array.isRequired,
  checked: PropTypes.array,
  toggle: PropTypes.func,
};

export default ExternalImages;
