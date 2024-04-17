/* eslint-disable react/prop-types */
import React from 'react';
import Fade from 'frontend/js/components/Fade';
import useStyles from './useStyles';

function MenuOverlay({ onClick, isOpen }) {
  const classes = useStyles();

  return (
    <Fade isOpen={isOpen} timeout={150}>
      <div
        className={classes.root}
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex={-1}
        aria-label="close menu"
      />
    </Fade>
  );
}

export default MenuOverlay;
