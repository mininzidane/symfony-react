/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HDImage from 'frontend/js/views/Shared/HDImage';
import Image from 'frontend/js/components/Image';
import useStyles from './useStyles';

function Content({ hdImages, fullImages, title, isHdPhotosAvailable, isGridView }) {
  const classes = useStyles();
  const images = hdImages.length > 0 ? hdImages : fullImages;

  return (
    <div className={classnames(classes.root, `is-${isGridView ? 'full' : 'compact'}`)}>
      {isHdPhotosAvailable
        ? hdImages.map((image, index) => (
            <HDImage
              className={classes.image}
              key={index}
              ratio={75}
              src={image}
              lazy
              fallback
              placeholder
              alt={title}
            />
          ))
        : images.map((image, index) => (
            <Image ratio={75} src={image} key={index} lazy fallback placeholder alt={title} />
          ))}
    </div>
  );
}

Content.propTypes = {
  hdImages: PropTypes.arrayOf(PropTypes.string),
  fullImages: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  isHdPhotosAvailable: PropTypes.bool,
  isGridView: PropTypes.bool,
};

Content.defaultProps = {
  title: '',
  hdImages: [],
  fullImages: [],
  isHdPhotosAvailable: true,
  isGridView: true,
};

export default Content;
