import React from 'react';
import useStyles from './useStyles';

function InfoTriggerThin() {
  const classes = useStyles();

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={classes.root}>
      <circle cx="7" cy="7" r="6.5" />
      <path d="M7.91444 11H6.10695V5.32393H7.91444V11ZM6 3.86033C6 3.60852 6.09269 3.40219 6.27807 3.24131C6.46346 3.08044 6.7041 3 7 3C7.2959 3 7.53654 3.08044 7.72193 3.24131C7.90731 3.40219 8 3.60852 8 3.86033C8 4.11213 7.90731 4.31847 7.72193 4.47934C7.53654 4.64022 7.2959 4.72066 7 4.72066C6.7041 4.72066 6.46346 4.64022 6.27807 4.47934C6.09269 4.31847 6 4.11213 6 3.86033Z" />
    </svg>
  );
}

export default InfoTriggerThin;
