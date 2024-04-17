import React from 'react';
import PropTypes from 'prop-types';
import ButtonCross from 'frontend/js/components/ButtonCross';
import Title from './Title';
import useStyles from './useStyles';

function ModalEngineVideo({ lotId, auction, engineVideo, handleClose }) {
  const classes = useStyles();
  const { format, type, url } = engineVideo;

  let videoFormat = format || 'video/mp4';
  if (videoFormat.indexOf('video') !== 0) {
    videoFormat = `video/${format}`;
  }

  return (
    <>
      <div className={classes.header}>
        <Title lotId={lotId} auction={auction} />
        <ButtonCross onClick={handleClose} color="white" className={classes.closeButton} size={12} />
      </div>

      <div className={classes.body}>
        <div className={classes.videoContainer}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video className={classes.video} controls about={type} autoPlay>
            <source src={url} type={videoFormat} />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}

ModalEngineVideo.propTypes = {
  engineVideo: PropTypes.object.isRequired,
  lotId: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalEngineVideo;
