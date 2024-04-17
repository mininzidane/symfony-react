import React from 'react';
import PropTypes from 'prop-types';
import ImageWithoutWrapper from './Image';
import ImageWrapper from './ImageWrapper';

function Image({ withoutWrapper, ...props }) {
  const ImageComponent = withoutWrapper ? ImageWithoutWrapper : ImageWrapper;
  return <ImageComponent {...props} />;
}

Image.propTypes = {
  withoutWrapper: PropTypes.bool,
};

Image.defaultProps = {
  withoutWrapper: false,
};

export default Image;
