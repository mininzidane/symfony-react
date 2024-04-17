import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ImageNotFound from 'frontend/images/shared/errors/image-not-found.png';
import useStyles from './useStyles';

function Media({ src, alt, className, mimeType }) {
  const ref = useRef();
  const classes = useStyles();

  const { isVideo } = useMemo(
    () => ({
      isImage: mimeType?.includes('image/'),
      isVideo: mimeType?.includes('video/'),
    }),
    [mimeType],
  );

  useEffect(() => {
    const el = ref.current;

    el.onerror = () => {
      el.src = ImageNotFound;
    };
  }, [src]);

  if (isVideo) {
    // eslint-disable-next-line jsx-a11y/media-has-caption
    return <video src={src} className={classnames(classes.video, className)} alt={alt} ref={ref} controls />;
  }

  return <img src={src} className={className} alt={alt} ref={ref} />;
}

Media.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  mimeType: PropTypes.string,
};

Media.defaultProps = {
  src: '',
  alt: '',
  className: '',
  mimeType: '',
};

export default Media;
