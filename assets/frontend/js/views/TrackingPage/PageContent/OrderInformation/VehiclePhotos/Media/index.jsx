/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'frontend/js/components/Image';
import useStyles from './useStyles';

function Media({ className, mimeType, src }) {
  const classes = useStyles();
  const { isVideo } = useMemo(
    () => ({
      isImage: mimeType?.includes('image/'),
      isVideo: mimeType?.includes('video/'),
    }),
    [mimeType],
  );

  return (
    <>
      {isVideo ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={src} className={classnames(classes.video, className)} alt="" />
      ) : (
        <Image className={className} ratio={75} src={src} lazy fallback placeholder alt="" />
      )}
    </>
  );
}

Media.propTypes = {
  mimeType: PropTypes.string,
};

Media.defaultProps = {
  mimeType: 'image/*',
};

export default Media;
