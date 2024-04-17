import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

import useStyles from './useStyles';

function Status() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.label}>
        <FormattedMessage id="lotPage.bidInformationSold.status.label" />:
      </span>
      <span className={classes.value}>
        <FormattedMessage id="lotPage.bidInformationSold.status.value" />
      </span>
    </div>
  );
}

export default Status;
