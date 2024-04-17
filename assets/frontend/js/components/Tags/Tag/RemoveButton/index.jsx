import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function RemoveButton({ onClick }) {
  const classes = useStyles();

  return (
    <button type="button" onClick={onClick} className={classes.root}>
      <svg width="6" height="6" viewBox="0 0 10 10">
        <path
          className={classes.path}
          d="M5.708,5,10,9.292,9.292,10,5,5.708.708,10,0,9.292,4.292,5,0,.708.708,0,5,4.292,9.292,0,10,.708Z"
        />
      </svg>
    </button>
  );
}

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveButton;
