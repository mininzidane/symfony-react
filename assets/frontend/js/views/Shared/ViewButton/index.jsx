/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';

function ViewButton({ label, ...props }) {
  const classes = useStyles();

  return (
    <Button
      label={
        <div className={classes.label}>
          <svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.261103 4.26923C1.07339 3.26923 4.09045 0 8.50001 0C12.9096 0 15.9266 3.26923 16.7389 4.26923C17.087 4.69231 17.087 5.30769 16.7389 5.73077C15.9266 6.73077 12.9096 10 8.50001 10C4.09045 10 1.07339 6.73077 0.261103 5.73077C-0.087019 5.30769 -0.087019 4.69231 0.261103 4.26923ZM8.50001 8.46154C11.9039 8.46154 14.4181 6.07692 15.3464 5C14.4181 3.92308 11.9039 1.53846 8.50001 1.53846C5.09614 1.53846 2.58192 3.92308 1.65359 5C2.58192 6.07692 5.09614 8.46154 8.50001 8.46154Z"
              fill="white"
            />
            <path
              d="M8.4995 7.30679C7.21774 7.30679 6.17868 6.2736 6.17868 4.9991C6.17868 3.7246 7.21774 2.69141 8.4995 2.69141C9.78125 2.69141 10.8203 3.7246 10.8203 4.9991C10.8203 6.2736 9.78125 7.30679 8.4995 7.30679Z"
              fill="white"
            />
          </svg>
          <span>{label}</span>
        </div>
      }
      {...props}
    />
  );
}

export default ViewButton;
