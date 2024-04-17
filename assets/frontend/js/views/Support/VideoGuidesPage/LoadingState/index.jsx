import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function LoadingState() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.row}>
        <div className={classes.item} style={{ width: '50%' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classnames(classes.item, 'is-progress')} style={{ width: '100%' }} />

      <div className={classes.row} style={{ marginTop: 27 }}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '50%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '78%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '50%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '78%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '50%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '78%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '50%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '78%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '50%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>

      <div className={classes.row}>
        <div className={classnames(classes.item, 'is-circle')} style={{ width: '16px', marginRight: 6 }} />
        <div className={classes.item} style={{ width: '78%', marginRight: 'auto' }} />
        <div className={classes.item} style={{ width: '8%' }} />
      </div>
    </div>
  );
}

export default LoadingState;
