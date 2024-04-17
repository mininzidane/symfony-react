import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

import useStyles from './useStyles';
import Icon from './Icon';

function Description() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Icon />
        <FormattedMessage id="landings.lp3.titleFeature1" isWrapped />
      </div>

      <div className={classes.item}>
        <Icon />
        <FormattedMessage id="landings.lp3.titleFeature2" isWrapped />
      </div>

      <div className={classes.item}>
        <Icon />
        <FormattedMessage id="landings.lp3.titleFeature3" isWrapped />
      </div>

      <div className={classes.item}>
        <Icon />
        <FormattedMessage id="landings.lp3.titleFeature4" isWrapped />
      </div>

      <div className={classes.item}>
        <Icon />
        <FormattedMessage id="landings.lp3.titleFeature5" isWrapped />
      </div>
    </div>
  );
}

export default Description;
