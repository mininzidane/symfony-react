import React from 'react';

import useStyles from './useStyles';

const OkIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="9" fill="#498E2F" />
        <path d="M5 9.5L7.57143 12L14 5" stroke="#F8F4DD" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default OkIcon;
