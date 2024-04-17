/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import CrossSvg from './img/cross.svg';
import useStyles from './useStyles';

function Tag({ label, onDelete }) {
  const classes = useStyles();

  function handleClick(e) {
    e.stopPropagation();
    e.preventDefault();
    onDelete(label);
  }

  return (
    <div className={classes.root}>
      <span className={classes.label}>{label}</span>
      <button type="button" className={classes.closeButton} onClick={handleClick}>
        <img src={CrossSvg} alt="Close" />
      </button>
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Tag;
