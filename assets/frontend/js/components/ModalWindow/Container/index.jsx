/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function Container({ children, className, ...props }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)} {...props}>
      {children}
    </div>
  );
}

Container.propTypes = {};

export default Container;
