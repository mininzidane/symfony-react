import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function SecureInformation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <FormattedMessage id="billingInformationPage.secureInformation" />
      </div>
    </div>
  );
}

export default SecureInformation;
