/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';

function SearchSubmitButton({ onClick }) {
  const classes = useStyles();

  function handleClick(e) {
    e.stopPropagation();
    onClick();
  }

  return (
    <button type="button" onClick={handleClick} className={classes.root}>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M15.866-9.168h-.817l-.284-.282a6.657,6.657,0,0,0,1.614-4.35,6.689,6.689,0,0,0-6.69-6.69A6.69,6.69,0,0,0,3-13.8,6.689,6.689,0,0,0,9.69-7.11a6.653,6.653,0,0,0,4.348-1.612l.284.282v.815L19.466-2.49,21-4.025Zm-6.177,0a4.629,4.629,0,0,1-3.278-1.355A4.631,4.631,0,0,1,5.055-13.8a4.631,4.631,0,0,1,4.632-4.632A4.632,4.632,0,0,1,14.318-13.8a4.631,4.631,0,0,1-4.63,4.633Z"
          transform="translate(-3 20.49)"
          fill="#FFF"
        />
      </svg>
    </button>
  );
}

export default SearchSubmitButton;
