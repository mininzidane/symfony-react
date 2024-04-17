import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Card from 'frontend/js/components/Card';
import Alert from 'frontend/js/components/Form/Alert';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SecureServices from './SecureServices';
import SecureInformation from './SecureInformation';
import useContactInformationContext from '../../_Context/useContactInformationContext';
import Submit from './Submit';
import useStyles from './useStyles';

function Summary() {
  const classes = useStyles();
  const intl = useIntl();
  const { error } = useContactInformationContext();

  const ctaLabel = intl.formatMessage({ id: 'shared.label.updateInformation' });

  return (
    <Card elevation={2} className={classes.root}>
      <Submit ctaLabel={ctaLabel} />
      {error.shown && (
        <Alert isShown severity="error" className={classes.errorMessage}>
          {error.message || <FormattedMessage id="form.error.general" />}
        </Alert>
      )}
      <SecureInformation />
      <SecureServices />
    </Card>
  );
}

export default Summary;
