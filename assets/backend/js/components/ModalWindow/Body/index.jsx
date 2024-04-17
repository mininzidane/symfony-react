/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function ModalWindowBody({ children, className, isOverflowVisible }) {
  const classes = useStyles({ isOverflowVisible });

  return <div className={classnames(classes.root, className)}>{children}</div>;
}

export default ModalWindowBody;
