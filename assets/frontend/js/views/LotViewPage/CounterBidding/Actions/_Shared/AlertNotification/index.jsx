import React from 'react';
import PropTypes from 'prop-types';
import AlertSvg from 'frontend/images/shared/various/alert-round-orange.svg';
import useStyles from './useStyles';

function AlertNotification({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={AlertSvg} alt="Alert" width={20} height={20} className={classes.icon} />
      <div>{children}</div>
    </div>
  );
}

AlertNotification.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertNotification;
