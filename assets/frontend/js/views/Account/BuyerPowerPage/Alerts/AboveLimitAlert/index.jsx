import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Amount from 'frontend/js/components/Amount';
import CompanyService from 'frontend/js/api/CompanyService';
import useStyles from '../useStyles';

function AboveLimitAlert() {
  const MAX_BUYER_POWER = 50000;
  const intl = useIntl();
  const classes = useStyles();
  const { officePhone } = CompanyService;

  const translationSets = {
    head: intl.formatMessage({ id: 'depositsPage.notification.increaseMore.head' }),
    body: intl.formatMessage(
      {
        id: 'depositsPage.notification.increaseMore.body',
      },
      {
        a: (chunks) => <a href={officePhone.href}>{chunks}</a>,
        strong: (chunks) => <strong>{chunks}</strong>,
        maxAmount: <Amount value={MAX_BUYER_POWER} hasCurrency />,
      },
    ),
  };

  return (
    <div className="notifications-banner">
      <div className={classes.head}>{translationSets.head}</div>
      <div className={classes.body}>{translationSets.body}</div>
    </div>
  );
}

AboveLimitAlert.propTypes = {};

export default AboveLimitAlert;
