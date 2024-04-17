import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Amount from 'frontend/js/components/Amount';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useStyles from '../useStyles';

function ZeroDepositAlert({ currentPossibleBid }) {
  const intl = useIntl();
  const classes = useStyles();

  const translationSets = {
    head: intl.formatMessage({ id: 'depositsPage.notification.depositIsZero.head' }),
    body: intl.formatMessage(
      {
        id: 'depositsPage.notification.depositIsZero.body',
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        minDeposit: <Amount value={BuyerPowerService.minDepositAmount} hasCurrency />,
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

ZeroDepositAlert.propTypes = {
  currentPossibleBid: PropTypes.number.isRequired,
};

export default ZeroDepositAlert;
