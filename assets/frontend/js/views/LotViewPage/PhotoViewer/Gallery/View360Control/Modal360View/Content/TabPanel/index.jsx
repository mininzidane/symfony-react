/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useStyles from './useStyles';

function TabPanel({ children, isActive }) {
  const classes = useStyles();

  return (
    <div role="tabpanel" className={classnames(classes.root, { 'is-active': isActive })}>
      {children}
    </div>
  );
}

export default TabPanel;
