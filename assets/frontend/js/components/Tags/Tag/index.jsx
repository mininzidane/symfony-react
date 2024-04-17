import React from 'react';
import PropTypes from 'prop-types';
import RemoveButton from './RemoveButton';
import useStyles from './useStyles';

function Tag({ label, onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <RemoveButton onClick={onClick} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Tag;
