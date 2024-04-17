import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import ButtonCross from 'frontend/js/components/ButtonCross';
import { useNotifications } from 'frontend/js/providers/NotificationsProvider';
import useStyles from '../useStyles';

function CA2CANotification({ onShow, onHide, localStorageKey }) {
  const classes = useStyles();
  const BANNER_COLLAPSE_ANIMATION_DURATION = 350;
  const [isOpen, setOpen] = useState(false);
  const intl = useIntl();
  const { getLocalizedHcRoute } = RouterService;
  const notificationID = 'CA2CA';
  const disabledNotifications = LocalStorageService.get(localStorageKey) || [];

  let isCA2CA = false;
  if (window.isSPAEnv) {
    const [{ notificationsData }] = useNotifications();
    const { isCA2CA: isCA2CAFromContext } = notificationsData;
    isCA2CA = isCA2CAFromContext;
  }

  const translationSets = {
    bannerContent: intl.formatMessage(
      {
        id: 'shared.ca2ca',
        defaultMessage: `
          If you’re a California resident purchasing a vehicle that’s located in California, the rules are a little bit different. Learn more <a>here</a>.
        `,
      },
      {
        a: (chunks) => (
          <a href={getLocalizedHcRoute('hcCanIBuyCa2Ca')} target="_blank" rel="noopener noreferrer">
            {chunks}
          </a>
        ),
      },
    ),
  };

  function handleBannerClose() {
    setOpen(false);

    setTimeout(() => {
      const nextDisabledNotifications = [...disabledNotifications, notificationID];
      LocalStorageService.set(localStorageKey, nextDisabledNotifications);
      onHide();
    }, BANNER_COLLAPSE_ANIMATION_DURATION);

    return false;
  }

  useEffect(() => {
    const isDisabled = disabledNotifications.includes(notificationID);

    if (isCA2CA && !isDisabled) {
      onShow();
      setOpen(true);
    }
  }, [isCA2CA]);

  if (!isCA2CA) {
    return null;
  }

  return (
    <Collapse in={isOpen} timeout={BANNER_COLLAPSE_ANIMATION_DURATION} mountOnEnter unmountOnExit>
      <div className={classes.notification} style={{ padding: '20px 0' }}>
        <ContainerFullScreen>
          <ButtonCross onClick={handleBannerClose} className={classes.closeButton} isThin alt="Close banner" />

          <div className="text-md">{translationSets.bannerContent}</div>
        </ContainerFullScreen>
      </div>
    </Collapse>
  );
}

CA2CANotification.propTypes = {
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  localStorageKey: PropTypes.string.isRequired,
};

export default CA2CANotification;
