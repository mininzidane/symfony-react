/* eslint-disable react/prop-types */
import React from 'react';
import useStyles from './useStyles';
import LeftArrowIcon from './img/arrow_left.svg';

function NavButton({ disabled, onClick, isNext }) {
  const classes = useStyles({ isNext });

  if (disabled) {
    return null;
  }

  return (
    <button className={classes.root} type="button" onClick={onClick}>
      <img src={LeftArrowIcon} alt={isNext ? 'Next' : 'Prev'} />
    </button>
  );
}

export default NavButton;
