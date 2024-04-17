import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Card from 'frontend/js/components/Card';
import Alert from 'frontend/js/components/Form/Alert';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import SecureServices from './SecureServices';
import SecureInformation from './SecureInformation';
import AcceptedCards from './AcceptedCards';
import useBillingInformationContext from '../../_Context/useBillingInformationContext';
import Submit from './Submit';
import Settings from './Settings';
import useStyles from './useStyles';

function Summary() {
  const classes = useStyles();
  const intl = useIntl();
  const { error, view, setView, form } = useBillingInformationContext();
  const { cardToken } = form;
  const ctaLabel = intl.formatMessage({
    id: cardToken ? 'billingInformationPage.cta.confirmEdits' : 'billingInformationPage.cta.addPaymentCard',
  });

  function backToMyCards() {
    setView('list');
  }

  if (view === 'list') {
    return <Settings />;
  }

  if (view === 'form') {
    return (
      <Card elevation={2} className={classes.root}>
        <Submit ctaLabel={ctaLabel} />
        {error.shown && (
          <Alert isShown severity="error" className={classes.errorMessage}>
            {error.message || <FormattedMessage id="form.error.general" />}
          </Alert>
        )}
        <div className={classes.backToMyCards}>
          <ButtonLink
            onClick={backToMyCards}
            label={intl.formatMessage({ id: 'billingInformationPage.cta.backToPreviousScreen' })}
          />
        </div>
        <AcceptedCards />
        <SecureInformation />
        <SecureServices />
      </Card>
    );
  }

  return null;
}

export default Summary;
