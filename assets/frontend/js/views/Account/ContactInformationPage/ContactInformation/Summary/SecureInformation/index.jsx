import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function SecureInformation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="contactInformationPage.yourAccountIsSecure" />
      </div>
      <div>
        <FormattedMessage id="contactInformationPage.weUseMaximumEncryption" />
      </div>
    </div>
  );
}

export default SecureInformation;
