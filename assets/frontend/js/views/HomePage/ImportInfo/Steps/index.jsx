import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Step from './Step';
import useStyles from './useStyles';

function Steps() {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <Step
        number={1}
        title={intl.formatMessage({ id: 'homePage.intl.importInfo.step1.title' })}
        description={<FormattedMessage id="homePage.intl.importInfo.step1.description" />}
        video="Wql64LOAw0c"
      />
      <Step
        number={2}
        title={intl.formatMessage({ id: 'homePage.intl.importInfo.step2.title' })}
        description={<FormattedMessage id="homePage.intl.importInfo.step2.description" />}
        video="rzNDY_ZGNrs"
      />
      <Step
        number={3}
        title={intl.formatMessage({ id: 'homePage.intl.importInfo.step3.title' })}
        description={<FormattedMessage id="homePage.intl.importInfo.step3.description" />}
        video="kmsynKz0QPg"
      />
    </div>
  );
}

export default Steps;
