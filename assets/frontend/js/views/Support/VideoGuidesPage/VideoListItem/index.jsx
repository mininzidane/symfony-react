import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';
import PlayButtonSvg from './img/play-button.svg';
import PauseButtonSvg from './img/pause-button.svg';
import CheckmarkSvg from './img/checkmark.svg';

function VideoListItem({ label, duration, onClick, isPlaying, isCompleted, isCurrent }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button type="button" onClick={onClick} className={classes.button}>
        <span className={classes.icon}>
          {isCurrent && isPlaying ? (
            <img src={PauseButtonSvg} alt="Pause" width="16" height="16" />
          ) : (
            <img src={isCompleted ? CheckmarkSvg : PlayButtonSvg} alt="Play" width="16" height="16" />
          )}
        </span>

        <span
          className={classnames(classes.label, {
            'is-playing': isPlaying,
            'is-completed': isCompleted,
            'is-current': isCurrent,
          })}
        >
          {label}
        </span>
      </button>

      <span className={classes.duration}>{duration}</span>
    </div>
  );
}

VideoListItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool,
  isPlaying: PropTypes.bool,
  isCompleted: PropTypes.bool,
};

VideoListItem.defaultProps = {
  isCurrent: false,
  isPlaying: false,
  isCompleted: false,
};

export default VideoListItem;
