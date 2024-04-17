/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useStyles from './useStyles';

function ModalWindowHeader({ title, onClose, controls, className, controlsClassName }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <strong className={classes.title}>{title}</strong>
      {controls && <div className={classnames(classes.controls, controlsClassName)}>{controls}</div>}
      {onClose && <ButtonCross onClick={onClose} color="white" className={classes.closeButton} size={12} />}
    </div>
  );
}

ModalWindowHeader.propTypes = {
  onClose: PropTypes.func,
  controls: PropTypes.node,
  title: PropTypes.node.isRequired,
  className: PropTypes.string,
  controlsClassName: PropTypes.string,
};

ModalWindowHeader.defaultProps = {
  onClose: null,
  controls: null,
  className: '',
  controlsClassName: '',
};

export default ModalWindowHeader;
