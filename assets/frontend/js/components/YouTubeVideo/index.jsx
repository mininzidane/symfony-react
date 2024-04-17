import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'frontend/js/components/Image';
import YoutubeIcon from './img/youtube.png';
import useStyles from './useStyles';

const ReactPlayer = React.lazy(() => import('react-player/youtube'));

const YouTubeVideo = ({ alt, className, id, preview, ratio, ...restProps }) => {
  const classes = useStyles({ ratio });
  const [inited, handleInitVideo] = useState(!preview);

  return (
    <div className={classNames(classes.root, className)}>
      {inited ? (
        <Suspense fallback={null}>
          <ReactPlayer
            className="coverer"
            url={`https://www.youtube.com/embed/${id}`}
            controls
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: { autoplay: preview },
              },
            }}
            {...restProps}
          />
        </Suspense>
      ) : (
        <div
          className="cur-p"
          onClick={() => handleInitVideo(true)}
          onKeyPress={() => handleInitVideo(true)}
          role="button"
          tabIndex={0}
        >
          <div className={classes.overlay}>
            <Image ratio={ratio} src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`} alt={alt} lazy placeholder />
          </div>
          <button className="is-centered zi-sm" type="button">
            <img width={90} height={49} src={YoutubeIcon} alt="YouTube" />
          </button>
        </div>
      )}
    </div>
  );
};

YouTubeVideo.defaultProps = {
  alt: '',
  className: '',
  preview: false,
};

YouTubeVideo.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  preview: PropTypes.bool,
  ratio: PropTypes.number.isRequired,
};

export default YouTubeVideo;
