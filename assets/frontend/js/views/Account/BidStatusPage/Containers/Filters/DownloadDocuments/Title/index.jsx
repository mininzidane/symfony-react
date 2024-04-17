import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function DownloadDocumentsTitle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormattedMessage id="shared.label.downloadDocuments" />:
    </div>
  );
}

export default DownloadDocumentsTitle;
