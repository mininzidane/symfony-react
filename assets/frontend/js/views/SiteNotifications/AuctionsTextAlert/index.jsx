import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import CustomerService from 'frontend/js/api/CustomerService';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import useEventListener from 'frontend/js/hooks/useEventListener';
import ButtonCross from 'frontend/js/components/ButtonCross';
import InitialView from './InitialView';
import SuccessView from './SuccessView';
import useStyles from './useStyles';
import useGeneralStyles from '../useStyles';

function AuctionsTextAlert({ onShow, onHide }) {
  const generalClasses = useGeneralStyles();
  const classes = useStyles();
  const { customer } = window;
  const [ntfkPhoneNumber, setNtfkPhoneNumber] = useState(null);
  const [isSended, setSended] = useState(false);
  const [isShown, setShown] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const isNotificationsEnabled = customer && customer.textNotifications;
  const sessionStorageKey = 'Abm::isAuctionsTextAlertDisabled';
  const isAuctionsTextAlertDisabled = SessionStorageService.get(sessionStorageKey);

  const externalConditions = !isNotificationsEnabled && !isAuctionsTextAlertDisabled;
  const customerConditions = customer && (parseInt(customer.balance, 10) || customer.currentBidsCount);

  useEffect(() => {
    if (customer && customerConditions && externalConditions) {
      setShown(true);
      onShow();
    }
  }, [customer, customerConditions, externalConditions]);

  function handleClose() {
    setOpen(false);

    setTimeout(() => {
      onHide();
      SessionStorageService.set(sessionStorageKey, true);
    }, 350);

    return false;
  }

  async function onSubmit(values, { setFieldError }) {
    const payload = {
      textNotifications: '1',
      mobilePhone: values.phoneNumber,
    };

    try {
      await CustomerService.textNotifications(customer.id, payload);
      setNtfkPhoneNumber(values.phoneNumber);
      setSended(true);
    } catch (error) {
      const { response } = error;

      if (response && response.data) {
        const { errors } = response.data;

        if (typeof errors === 'object') {
          setFieldError('phoneNumber', errors.mobilePhone);
        }
      }
    }
  }

  function handleUpdate() {
    if (externalConditions) {
      setShown(true);
      onShow();
    }
  }

  useEventListener('bidPlaced', handleUpdate);
  useEventListener('depositIncreased', handleUpdate);
  useEventListener('textNotificationsPhoneSet', () => setOpen(false));

  if (!isShown) {
    return null;
  }

  return (
    <Collapse in={isOpen} mountOnEnter unmountOnExit>
      <div className={classnames(generalClasses.notification, classes.root)}>
        <ContainerFullScreen className={classes.container}>
          <ButtonCross onClick={handleClose} className={classes.closeButton} isThin alt="Close banner" />
          {isSended ? (
            <SuccessView ntfkPhoneNumber={ntfkPhoneNumber} />
          ) : (
            <InitialView customer={customer} onSubmit={onSubmit} />
          )}
        </ContainerFullScreen>
      </div>
    </Collapse>
  );
}

AuctionsTextAlert.propTypes = {
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AuctionsTextAlert;
