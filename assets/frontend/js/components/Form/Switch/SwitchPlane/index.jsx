import React from 'react';
import Switch from '..';
import useStyles from './useStyles';

function SwitchPlane(props) {
  const classes = useStyles(props);
  return <Switch {...props} classes={classes} />;
}

export default SwitchPlane;
