import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Card from 'frontend/js/components/Card';
import Alert from 'frontend/js/components/Form/Alert';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useBidderFormContext from '../../../_Context/useBidderFormContext';
import DocumentsUpload from './DocumentsUpload';
import Submit from './Submit';
import useStyles from './useStyles';

function Summary() {
  const classes = useStyles();
  const intl = useIntl();
  const { form, error, content } = useBidderFormContext();
  const { setIsFormShown } = content;
  const ctaLabel = intl.formatMessage({ id: 'shared.label.completeRegistration' });

  function handleFormCancel() {
    setIsFormShown(false);
  }

  return (
    <Card elevation={2} className={classes.root}>
      <DocumentsUpload setForm={form.set} />
      <Submit ctaLabel={ctaLabel} />
      {error.shown && (
        <Alert isShown severity="error" className={classes.errorMessage}>
          {error.message || <FormattedMessage id="form.error.general" />}
        </Alert>
      )}
      <div className={classes.cancel}>
        <ButtonLink label={intl.formatMessage({ id: 'shared.cta.cancel' })} size="sm" onClick={handleFormCancel} />
      </div>
    </Card>
  );
}

export default Summary;
