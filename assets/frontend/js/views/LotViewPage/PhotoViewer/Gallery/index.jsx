/* eslint-disable react/prop-types */
import React, { useState, useCallback, useRef, Suspense } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'frontend/js/components/Image';
import VehicleImageCarousel from 'frontend/js/views/Shared/VehicleImageCarousel';
import useStyles from './useStyles';

const LargeControl = React.lazy(() => import('./LargeControl'));
const View360Control = React.lazy(() => import('./View360Control'));
const ZoomControl = React.lazy(() => import('./ZoomControl'));

const ZOOM_ID = 'zoom';

function Gallery({ images, title, id, auction }) {
  const classes = useStyles();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselAPI = useRef({});

  const handleThumbnailClick = useCallback((e) => {
    const index = Number(e.target.dataset.index);
    if (Number.isNaN(index)) {
      return;
    }

    carouselAPI.current?.goto(index);
  }, []);

  if (!images || !images.length) {
    return <Image ratio={75} src="" fallback placeholder alt={title} />;
  }

  return (
    <div>
      <div className="pos-r" id={ZOOM_ID}>
        <VehicleImageCarousel
          images={images.map((image) => image.full)}
          title={title}
          classes={{ navigation: classes.navigation, root: classes.carousel, position: classes.position }}
          lazy={false}
          onPositionChange={setActiveSlide}
          getAPI={(api) => {
            carouselAPI.current = api;
          }}
        />

        <Suspense fallback={null}>
          <div className={classes.controls}>
            <ZoomControl elementId={ZOOM_ID} image={images[activeSlide]?.hdr || images[activeSlide]?.full} />
            <LargeControl id={id} auction={auction} images={images} />
            <View360Control lotId={id} auction={auction} />
          </div>
        </Suspense>
      </div>

      <div className={classes.thumbnails}>
        {images.map((image, index) => (
          <button
            type="button"
            key={index}
            className={classnames(classes.thumbnail, index === activeSlide && classes.activeThumbnail)}
            data-index={index}
            onClick={handleThumbnailClick}
          >
            <Image ratio={75} src={image.thumbnail || image.full} fallback placeholder alt={title} lazy />
          </button>
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  auction: PropTypes.string,
};

Gallery.defaultProps = {
  title: '',
  auction: '',
};

export default React.memo(Gallery);
