import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import AlertSgv from 'frontend/images/shared/various/alert-sign-20x20.svg';
import Button from 'frontend/js/components/Button';
import useStyles from './useStyles';
import useGeneralStyles from '../useStyles';

function SecurityDepositNotification({ onShow }) {
  const generalClasses = useGeneralStyles();
  const classes = useStyles();
  const intl = useIntl();
  const { getRoute } = RouterService;
  const [isShown, setShown] = useState(false);

  const translationSets = {
    message: intl.formatMessage(
      {
        id: 'notification.security_deposit.message',
      },
      {
        span: (chunks) => <span className="fw-7">{chunks}</span>,
      },
    ),
    cta: intl.formatMessage({
      id: 'notification.security_deposit.cta',
      defaultMessage: 'Add Deposit',
    }),
  };

  useEffect(() => {
    try {
      const { customer } = window;
      const LOT_PAGE_ROUTE = 'lot';

      if (RouterService.test(LOT_PAGE_ROUTE) && customer && customer.blRemainingAmount === 0) {
        setShown(true);
        onShow();
      }
    } catch (e) {
      /* Ignore */
    }
  }, []);

  if (!isShown) {
    return null;
  }

  return (
    <div className={classnames(generalClasses.notification, classes.root)}>
      <ContainerFullScreen className={classes.container}>
        <div className={classes.message}>
          <img width="20" src={AlertSgv} className={classes.icon} alt="!" />
          <span>{translationSets.message}</span>
        </div>

        <Button
          href={getRoute('buyerPower')}
          className={classes.cta}
          label={translationSets.cta}
          size="sm"
          color="yellow"
          isShadowless
        />
      </ContainerFullScreen>
    </div>
  );
}

SecurityDepositNotification.propTypes = {
  onShow: PropTypes.func.isRequired,
};

export default SecurityDepositNotification;
