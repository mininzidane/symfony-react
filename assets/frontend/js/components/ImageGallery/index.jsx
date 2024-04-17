import React from 'react';
import PropTypes from 'prop-types';
import ReactImageGallery from 'react-image-gallery';
import classnames from 'classnames';
import ImageNotFound from 'frontend/images/shared/errors/image-not-found.svg';
import Media from './Media';
import NavButton from './NavButton';
import useStyles from './useStyles';

function ImageGallery({ images, showThumbnails, className, ...props }) {
  const classes = useStyles({ showThumbnails });

  const settings = {
    showThumbnails,
    showFullscreenButton: false,
    showPlayButton: false,
    infinite: false,
    onErrorImageURL: ImageNotFound,
    slideDuration: 300,
    renderLeftNav(onClick, disabled) {
      return <NavButton onClick={onClick} disabled={disabled} />;
    },
    renderRightNav(onClick, disabled) {
      return <NavButton onClick={onClick} disabled={disabled} isNext />;
    },
    ...props,
  };

  return (
    <div className={classnames(classes.root, className)}>
      <ReactImageGallery
        items={images.map((image, index) => ({
          original: `${index}`,
          renderThumbInner: () => <Media src={image.full} mimeType={image.mimeType} alt={`Thumbnail #${index + 1}`} />,
          renderItem: () => <Media src={image.full} mimeType={image.mimeType} alt={`Slide #${index + 1}`} />,
        }))}
        {...settings}
      />
    </div>
  );
}

ImageGallery.defaultProps = {
  images: [],
  showThumbnails: false,
  className: '',
};

ImageGallery.propTypes = {
  images: PropTypes.array,
  showThumbnails: PropTypes.bool,
  className: PropTypes.string,
};

export default ImageGallery;
