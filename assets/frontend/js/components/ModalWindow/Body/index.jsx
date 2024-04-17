/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function ModalWindowBody({ children, className, hasFooter, isOverflowVisible, bodyRef }) {
  const classes = useStyles({ hasFooter, isOverflowVisible });

  return (
    <div className={classnames(classes.root, className)} ref={bodyRef}>
      {children}
    </div>
  );
}

export default ModalWindowBody;
