import React from 'react';
import PropTypes from 'prop-types';
import Amount from 'frontend/js/components/Amount';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from '../useStyles';

function UpgradeRequiredAlert({ currentPossibleBid }) {
  const intl = useIntl();
  const classes = useStyles();
  const { getRoute } = RouterService;

  const translationSets = {
    head: intl.formatMessage({ id: 'depositsPage.notification.increaseMore.head' }),
    body: intl.formatMessage(
      { id: 'depositsPage.notification.upgradeRequired.body' },
      {
        a: (chunks) => <a href={getRoute('membershipPlans')}>{chunks}</a>,
        strong: (chunks) => <strong>{chunks}</strong>,
        maxBid: <Amount value={currentPossibleBid} hasCurrency />,
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

UpgradeRequiredAlert.propTypes = {
  currentPossibleBid: PropTypes.number.isRequired,
};

export default UpgradeRequiredAlert;
