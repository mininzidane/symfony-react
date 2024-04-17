/* eslint-disable react/prop-types */
import React from 'react';
import Card from 'frontend/js/components/Card';
import useStyles from './useStyles';

function EmptyStateCard({ icon, message }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      {icon}
      <div className={classes.message}>{message}</div>
    </Card>
  );
}

export default EmptyStateCard;
