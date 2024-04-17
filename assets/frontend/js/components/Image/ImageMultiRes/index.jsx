import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import ImageWrapper from '../ImageWrapper';

function ImageMultiRes({ x1, x2, alt, withoutWrapper, ...props }) {
  const ImageComponent = withoutWrapper ? Image : ImageWrapper;
  return <ImageComponent srcset={`${x1}, ${x2} 2x`} src={x1} alt={alt} {...props} />;
}

ImageMultiRes.propTypes = {
  alt: PropTypes.string.isRequired,
  x1: PropTypes.string,
  x2: PropTypes.string,
  withoutWrapper: PropTypes.bool,
};

ImageMultiRes.defaultProps = {
  withoutWrapper: false,
  x1: '',
  x2: '',
};

export default ImageMultiRes;
