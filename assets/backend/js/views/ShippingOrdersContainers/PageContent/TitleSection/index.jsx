/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function LinksPanel({ count }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="shared.label.containers" /> {`(${count})`}
      </div>
    </div>
  );
}

export default LinksPanel;
