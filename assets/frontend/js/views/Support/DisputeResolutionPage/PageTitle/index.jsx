import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function PageTitle() {
  const classes = useStyles();

  return (
    <h1 className={classes.root}>
      <FormattedMessage id="disputePage.pageTitle" />
    </h1>
  );
}

export default PageTitle;
