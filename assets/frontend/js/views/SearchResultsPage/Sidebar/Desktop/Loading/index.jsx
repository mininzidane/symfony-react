import React from 'react';
import classnames from 'classnames';
import useStyles from '../useStyles';

function DesktopSidebarLoading() {
  const classes = useStyles();

  return <div className={classnames(classes.root, classes.loading)} />;
}

export default DesktopSidebarLoading;
