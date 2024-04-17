import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function DropdownIndicator({ isDropdownOpen }) {
  const classes = useStyles({ isDropdownOpen });

  return (
    <div className={classes.root}>
      <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0H0L5 5L10 0Z" fill="#626262" />
      </svg>
    </div>
  );
}

DropdownIndicator.propTypes = {
  isDropdownOpen: PropTypes.bool,
};

DropdownIndicator.defaultProps = {
  isDropdownOpen: false,
};

export default DropdownIndicator;
