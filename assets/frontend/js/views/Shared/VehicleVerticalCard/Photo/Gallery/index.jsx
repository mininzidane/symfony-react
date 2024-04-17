/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'frontend/js/components/Image';
import VehicleImageCarousel from 'frontend/js/views/Shared/VehicleImageCarousel';
import useStyles from './useStyles';

function Gallery({ image, images, title, isBlurred, noCarousel }) {
  const classes = useStyles();

  if (!images || !images.length || isBlurred || noCarousel) {
    return (
      <Image className="zi-xs" ratio={75} src={image} isBlurred={isBlurred} fallback lazy placeholder alt={title} />
    );
  }

  return (
    <VehicleImageCarousel
      images={images.map((img) => img.full)}
      title={title}
      classes={{ position: classes.position }}
    />
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.string,
  title: PropTypes.string,
  isBlurred: PropTypes.bool,
  noCarousel: PropTypes.bool,
};

Gallery.defaultProps = {
  title: '',
  image: '',
  isBlurred: false,
  noCarousel: false,
  images: [],
};

export default Gallery;
