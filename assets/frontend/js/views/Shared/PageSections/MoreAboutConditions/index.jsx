import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

import useStyles from './useStyles';

function MoreAboutConditions() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{intl.formatMessage({ id: 'businessPage.conditions.title' })}</div>
    </div>
  );
}

export default MoreAboutConditions;
