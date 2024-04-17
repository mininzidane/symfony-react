/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function ModalWindowFooter({ children, className }) {
  const classes = useStyles();

  return <div className={classnames(classes.root, className)}>{children}</div>;
}

export default ModalWindowFooter;
