import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import CustomerShape from '../../../../../lib/propshapes/CustomerShape';
import CustomerService from '../../../../../api/CustomerService';
import NotificationCard from '../../NotificationCard';
import useStyles from './useStyles';
import ButtonLink from '../../../../../components/ButtonLink';

function HighBidderNotification({ setCustomer, customer }) {
  const LOCKED_STATE_TIMEOUT = 600;
  const intl = useIntl();
  const classes = useStyles();
  const [isStateLocked, setStateLocked] = useState(false);
  const [cardState, setCardState] = useState('success');

  function lockState() {
    setStateLocked(true);

    setTimeout(() => {
      setStateLocked(false);
    }, LOCKED_STATE_TIMEOUT);
  }

  async function enableTextNotifications() {
    if (cardState === 'loading') {
      return;
    }

    setCardState('loading');
    lockState();

    try {
      const payload = { textNotifications: '1' };
      const { customer: nextCustomer } = await CustomerService.textNotifications(customer.id, payload);
      setCustomer(nextCustomer);
    } catch {
      /* ignore */
    }

    setCardState('success');
  }

  const translationSets = {
    title: intl.formatMessage({ id: 'lotPage.bidInformation.notification.highBidder.title' }),
    weRecommend: intl.formatMessage({ id: 'lotPage.bidInformation.notification.highBidder.weRecommend' }),
    weWontNotifyYou: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.notification.highBidder.weWontNotifyYou',
      },
      {
        button: (chunks) => <ButtonLink onClick={enableTextNotifications} label={chunks} className="is-blue" />,
      },
    ),
  };

  return (
    <NotificationCard
      state={isStateLocked ? 'loading' : cardState}
      title={translationSets.title}
      className={classes.root}
      titleClassName="is-success"
      content={<div>{translationSets.weRecommend}</div>}
    />
  );
}

HighBidderNotification.propTypes = {
  customer: CustomerShape.isRequired,
  setCustomer: PropTypes.func.isRequired,
};

export default HighBidderNotification;
