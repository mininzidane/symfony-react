import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function LoadingState() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.photoContainer}>
        <div className={classes.zoom} />
        <div className={classes.viewAll} />
        <div className={classes.view360} />

        <div className={classes.dots}>
          <div className={classes.dot} />
          <div className={classes.dot} />
          <div className={classes.dot} />
          <div className={classnames(classes.dot, 'is-active')} />
          <div className={classes.dot} />
          <div className={classes.dot} />
          <div className={classes.dot} />
          <div className={classes.dot} />
          <div className={classes.dot} />
        </div>
      </div>

      <div className={classes.thumbnails}>
        <div className={classnames(classes.thumbnail, 'is-active')} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
        <div className={classes.thumbnail} />
      </div>
    </div>
  );
}

LoadingState.propTypes = {};

export default LoadingState;
