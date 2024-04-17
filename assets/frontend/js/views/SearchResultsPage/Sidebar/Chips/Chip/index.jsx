import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useStyles from './useStyles';

function Chip({ onDelete, label }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, classes.active)}>
      <span className={classes.label}>{label}</span>
      <ButtonCross size={8} onClick={onDelete} className={classes.cross} />
    </div>
  );
}

Chip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

Chip.defaultProps = {
  onDelete: () => {},
};

export default Chip;
