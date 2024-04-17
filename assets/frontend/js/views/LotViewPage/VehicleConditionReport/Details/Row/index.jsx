/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function Row({ label, score, note }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{label}</div>{' '}
      <strong>
        <span className={classes.score}>{score > 0 ? score : '—'}</span> {note}
      </strong>
    </div>
  );
}

export default Row;
