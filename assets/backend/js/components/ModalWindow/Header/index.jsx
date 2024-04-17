/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import ButtonCross from 'frontend/js/components/ButtonCross';
import useStyles from './useStyles';

function ModalWindowHeader({ className, title, onClose }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <strong className={classes.title}>{title}</strong>
      {onClose && <ButtonCross onClick={onClose} color="white" className={classes.closeButton} size={12} />}
    </div>
  );
}

ModalWindowHeader.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
};

ModalWindowHeader.defaultProps = {
  className: '',
  onClose: null,
};

export default ModalWindowHeader;
