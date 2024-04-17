import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import classnames from 'classnames';
import ReactPlayer from 'react-player/lazy';
import VideoGuidesService from 'frontend/js/api/VideoGuidesService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import VideoSchemaJsonLdBlock from './VideoSchemaJsonLdBlock';
import PageTitle from './PageTitle';
import ProgressBar from './ProgressBar';
import ListTitle from './ListTitle';
import VideoListItem from './VideoListItem';
import LoadingState from './LoadingState';
import useStyles from './useStyles';

function VideoGuidesPage({ pageTitle }) {
  const classes = useStyles();
  const VIDEO_COMPLETED_THRESHOLD = 0.75; // 75% of video
  const localStorageKey = 'Abm::VideoGuidesCompleted';
  const localCompletedVideos = LocalStorageService.get(localStorageKey);

  const [isVideosDataLoaded, setIsVideosDataLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedVideoKeys, setCompletedVideoKeys] = useState(localCompletedVideos || []);

  const { data, isLoading } = useQuery('video-guides-data', () => VideoGuidesService.getVideoGuides());
  const videos = data?.guideVideos || [];

  function setMatchingCurrentVideo(startingFromVideoIndex, videosArray, isShouldStartPlaying = false) {
    let isSet = false;

    for (let i = startingFromVideoIndex; i < videosArray.length; i++) {
      if (!completedVideoKeys.includes(videosArray[i].key)) {
        setCurrentVideo(videosArray[i]);
        isSet = true;

        if (isShouldStartPlaying) {
          setIsPlaying(true);
        }

        break;
      }
    }

    if (!isSet && !currentVideo) {
      setCurrentVideo(videosArray[0]);
    }
  }

  function getVideoByKey(videosArray, key) {
    const matchedVideo = videosArray.find((vide) => vide.key === key);

    return matchedVideo || videosArray[0];
  }

  function handleLabelClick(video) {
    if (video.key === currentVideo.key) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentVideo(video);
      setIsPlaying(true);
    }
  }

  function handleProgress(progress) {
    if (!completedVideoKeys.includes(currentVideo.key) && progress.played > VIDEO_COMPLETED_THRESHOLD) {
      setCompletedVideoKeys([...completedVideoKeys, currentVideo.key]);
      LocalStorageService.set(localStorageKey, [...completedVideoKeys, currentVideo.key]);
    }
  }

  function handleEnded() {
    setIsPlaying(false);
    setMatchingCurrentVideo(currentVideo.priority - 1, videos, true);
  }

  useEffect(() => {
    if (!isLoading && videos.length) {
      const topic = RouterService.getQueryParam('topic');

      if (topic) {
        setCurrentVideo(getVideoByKey(videos, topic));
      } else {
        setMatchingCurrentVideo(0, videos);
      }

      setIsVideosDataLoaded(true);
    }
  }, [data]);

  return (
    <Container className={classes.root}>
      <PageTitle pageTitle={pageTitle} />
      <div className={classes.grid}>
        <div className={classes.videoCard}>
          <div className={classes.videoContainer}>
            {isVideosDataLoaded && (
              <div style={{ opacity: isVideoReady ? 1 : 0 }}>
                <ReactPlayer
                  url={currentVideo.url.replace(/\\\//g, '/')}
                  className={classnames(classes.video)}
                  playing={isPlaying}
                  controls={false}
                  onReady={() => setIsVideoReady(true)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleEnded}
                  onProgress={handleProgress}
                />
              </div>
            )}

            <SpinnerWheel isCentered size={48} thickness={2} />
          </div>
        </div>

        <div className={classes.menuCard}>
          {isVideoReady ? (
            <>
              <ListTitle doneCount={completedVideoKeys.length} totalCount={videos.length} />
              <ProgressBar doneCount={completedVideoKeys.length} totalCount={videos.length} />

              <div className={classes.menuList}>
                {videos.map((video) => (
                  <VideoListItem
                    onClick={() => handleLabelClick(video)}
                    label={video.title}
                    duration={video.videoLength}
                    isCurrent={video.key === currentVideo.key}
                    isCompleted={completedVideoKeys.includes(video.key)}
                    isPlaying={isPlaying}
                    key={video.key}
                  />
                ))}
              </div>

              {videos && <VideoSchemaJsonLdBlock videos={videos} />}
            </>
          ) : (
            <LoadingState />
          )}
        </div>
      </div>
    </Container>
  );
}

VideoGuidesPage.propTypes = {
  pageTitle: PropTypes.string,
};

VideoGuidesPage.defaultProps = {
  pageTitle: '',
};

export default VideoGuidesPage;
