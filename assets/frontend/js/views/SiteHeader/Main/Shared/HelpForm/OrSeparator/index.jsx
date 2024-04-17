import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function OrSeparator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>
        <FormattedMessage id="shared.label.or" />
      </span>
    </div>
  );
}

export default OrSeparator;
