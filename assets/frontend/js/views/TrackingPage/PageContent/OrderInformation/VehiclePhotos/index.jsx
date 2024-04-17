/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import PhotoModal from './PhotoModal';
import Media from './Media';
import useStyles from './useStyles';

function VehiclePhotos({ images, title, className, downloadAllLink }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleClick(index) {
    setIsOpen(true);
    setActivePhotoIndex(index);
  }

  if (!images.length > 0) {
    return false;
  }

  return (
    <>
      <div className={className}>
        <div className={classes.photos}>
          {images.map((image, index) => (
            <button
              type="button"
              key={index}
              className={classes.thumbnail}
              data-index={index}
              onClick={() => handleClick(index)}
            >
              <Media
                className={classes.img}
                src={index > 0 && image.thumbnail ? image.thumbnail : image.full}
                mimeType={image.mimeType}
              />
            </button>
          ))}
        </div>

        {downloadAllLink && (
          <div className={classes.download}>
            <Button
              label={<FormattedMessage id="shared.cta.downloadAllPhotos" />}
              color="blue"
              isInline
              onClick={() => {
                Object.assign(document.createElement('a'), {
                  target: '_blank',
                  href: downloadAllLink,
                }).click();
              }}
            />
          </div>
        )}
      </div>
      <PhotoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        startIndex={activePhotoIndex}
        images={images}
        title={title}
      />
    </>
  );
}

VehiclePhotos.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array,
  title: PropTypes.string,
};

VehiclePhotos.defaultProps = {
  className: '',
  images: [],
  title: '',
};

export default VehiclePhotos;
