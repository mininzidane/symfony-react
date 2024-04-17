/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PlaySvg from './img/play.svg';
import PauseSvg from './img/stop.svg';
import useStyles from './useStyles';

function PlayPauseButton({ onClick, isPlaying, isDisabled }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classnames(classes.root, { 'is-disabled': isDisabled })}>
      <img src={isPlaying ? PauseSvg : PlaySvg} alt="Action" width="30" height="30" />
    </button>
  );
}

export default PlayPauseButton;
