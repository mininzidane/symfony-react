/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Switch from 'frontend/js/components/Form/Switch';
import { useMutation } from 'react-query';
import BrokerService from 'frontend/js/api/BrokerService';
import useStyles from './useStyles';

function StatusToggle({ initialStatus, bidderId, setBidders, bidders }) {
  const STATUS_ACTIVE = 'A';
  const STATUS_INACTIVE = 'I';
  const classes = useStyles();
  const [isActive, setIsActive] = useState(initialStatus === 'A');

  const { mutateAsync: updateBidder } = useMutation((payload) => BrokerService.updateBidder(payload));

  function updateBidderEntry(status) {
    const nextBidders = bidders.map((v) => (v.id === bidderId ? { ...v, status } : v));

    setBidders(nextBidders);
  }

  function handleToggle() {
    const prevState = isActive;
    const nextState = !isActive;
    const nextStatus = isActive ? STATUS_INACTIVE : STATUS_ACTIVE;

    setIsActive(nextState);

    updateBidder({ bidderId, status: nextStatus })
      .then(() => {
        updateBidderEntry(nextStatus);
      })
      .catch(() => {
        setIsActive(prevState);
      });
  }

  return (
    <div className={classes.root}>
      <span className={classes.label}>
        <FormattedMessage id={isActive ? 'shared.label.active' : 'shared.label.inactive'} />
      </span>
      <Switch isChecked={isActive} onChange={handleToggle} />
    </div>
  );
}

export default StatusToggle;
