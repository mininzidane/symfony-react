/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'frontend/js/components/Image';
import Carousel from './Carousel';
import useStyles from './useStyles';

function Gallery({ images, title }) {
  const classes = useStyles();
  const [swiper, setSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleThumbnailClick = useCallback(
    (e) => {
      const { index } = e.target.dataset;
      if (index !== undefined && swiper) {
        swiper.slideToLoop(Number(index));
      }
    },
    [swiper],
  );

  if (!images || !images.length) {
    return <Image ratio={75} src="" fallback placeholder alt={title} />;
  }

  return (
    <div>
      <div className="pos-r">
        <Carousel onSlideChange={setActiveSlide} getSwiper={setSwiper} images={images} title={title} />
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
            <Image
              ratio={75}
              src={image.thumbnail || image.full || image}
              lazy
              fallback
              placeholder
              alt={title}
              containerClassName={classes.thumbContainer}
              imgClassName={classes.thumbImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  title: PropTypes.string,
};

Gallery.defaultProps = {
  title: '',
};

export default Gallery;
