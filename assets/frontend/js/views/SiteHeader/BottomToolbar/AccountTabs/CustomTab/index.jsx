import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import useStyles from './useStyles';

function CustomTab({ icon, value, label, ...props }) {
  const classes = useStyles();
  return <Tab classes={classes} icon={icon} value={value} label={label} {...props} />;
}

CustomTab.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default memo(CustomTab);
