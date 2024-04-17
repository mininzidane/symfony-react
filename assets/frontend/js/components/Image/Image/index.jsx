import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useLazyImage from '../useLazyImage';

function Image({ src, srcset, alt, className, lazy }) {
  const source = src ?? '';
  const isLazy = lazy && Boolean(src);
  const ref = useRef();
  useLazyImage({ ref, src, srcset, isLazy });

  return (
    <img
      className={className}
      data-src={isLazy ? source : undefined}
      data-srcset={isLazy ? srcset : undefined}
      src={!isLazy ? source : undefined}
      srcSet={!isLazy ? srcset : undefined}
      alt={alt}
      ref={ref}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string,
  srcset: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  lazy: PropTypes.bool,
};

Image.defaultProps = {
  src: '',
  srcset: '',
  alt: '',
  className: '',
  lazy: false,
};

export default Image;
