import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BootstrapService from 'frontend/js/api/BootstrapService';
import Collapse from '@material-ui/core/Collapse';
import RouterService from 'frontend/js/api/RouterService';
import CountryService from 'frontend/js/api/CountryService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import SiteMetaService from 'frontend/js/api/SiteMetaService';
import ButtonCross from 'frontend/js/components/ButtonCross';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import GeneralMessageBanner from './GeneralMessageBanner';
import CountryMessageBanner from './CountryMessageBanner';
import useStyles from '../useStyles';

function getBannerCode() {
  const userCountryIso2 = CountryService.getUserCountryIso2();
  const CIS_COUNTRIES = ['RU', 'LV', 'LT', 'EE', 'AZ', 'AM', 'UZ', 'KZ'];
  return CIS_COUNTRIES.includes(userCountryIso2) ? 'CIS' : userCountryIso2;
}

function GeneralNotification({ onShow, onHide, isGeneralMessageDisabled, isCountryBannerDisabled }) {
  const classes = useStyles();
  const { siteMessage } = BootstrapService.getAppValue('currentOfficeLocation', {});

  const { body: countryMessageBody, header: countryMessageHeader } = siteMessage || {};
  const BANNER_COLLAPSE_ANIMATION_DURATION = 350;

  const [isOpen, setOpen] = useState(true);
  const siteMetaService = new SiteMetaService();

  const GENERAL_MESSAGE_EXPIRATION_DAYS = 2;
  const GENERAL_MESSAGE_KEY = 'ABM::Announcement';
  const SHIPPING_MESSAGE_KEY = 'ABM::ShippingAnnouncement';
  const [siteMessages, setSiteMessages] = useState({ generalMessage: null, shippingMessage: null });

  const localStorageKey = `Abm::is${getBannerCode()}GeneralNotificationDisabled`;
  const isBannerDisabled = LocalStorageService.get(localStorageKey) || isCountryBannerDisabled;
  const hasCountryBanner = countryMessageBody || countryMessageHeader;
  const hasAvailableCountryBanner = hasCountryBanner && !isBannerDisabled;
  const isShippingPage = RouterService.isShippingPromoPage();
  const { generalMessage, shippingMessage } = siteMessages;

  function isAnnouncementDismissed(announcementKey) {
    const announcementStorage = LocalStorageService.get(announcementKey);

    if (announcementStorage) {
      const expDate = new Date(announcementStorage);
      const curDate = new Date();
      return expDate > curDate;
    }

    return false;
  }

  function isGeneralMessageDismissed() {
    return isAnnouncementDismissed(GENERAL_MESSAGE_KEY) || isGeneralMessageDisabled;
  }

  function isShippingMessageDismissed() {
    return isAnnouncementDismissed(SHIPPING_MESSAGE_KEY);
  }

  function updateSiteWideMessages(message, shipMessage) {
    const updatedMessages = { ...siteMessages };
    let hasUpdate = false;

    if (message && message.message && !isGeneralMessageDismissed()) {
      updatedMessages.generalMessage = message;
      hasUpdate = true;
    }

    if (isShippingPage && shipMessage && shipMessage.message && !isShippingMessageDismissed()) {
      updatedMessages.shippingMessage = shipMessage;
      hasUpdate = true;
    }

    if (hasUpdate) {
      setSiteMessages(updatedMessages);
      onShow();
    }
  }

  function retrieveSiteMessages() {
    return siteMetaService
      .getGeneralMessage()
      .then(({ generalMessage: message, shippingMessage: shipMessage }) => updateSiteWideMessages(message, shipMessage))
      .catch(() => null);
  }

  function getSiteMessages() {
    if (isGeneralMessageDismissed() && (!isShippingPage || isShippingMessageDismissed())) {
      return null;
    }

    return retrieveSiteMessages();
  }

  function handleSiteAnnouncementClose(siteAnnouncementKey, siteAnnouncementExpiration) {
    const messageBannerDate = new Date();
    messageBannerDate.setDate(messageBannerDate.getDate() + siteAnnouncementExpiration);

    setTimeout(() => {
      onHide();
      LocalStorageService.set(siteAnnouncementKey, messageBannerDate.toDateString());
    }, BANNER_COLLAPSE_ANIMATION_DURATION);

    return true;
  }

  function handleGeneralMessageClose() {
    handleSiteAnnouncementClose(GENERAL_MESSAGE_KEY, GENERAL_MESSAGE_EXPIRATION_DAYS);
  }

  function handleShippingMessageClose() {
    handleSiteAnnouncementClose(SHIPPING_MESSAGE_KEY, GENERAL_MESSAGE_EXPIRATION_DAYS);
  }

  function handleBannerClose() {
    setOpen(false);

    if (shippingMessage) {
      return handleShippingMessageClose();
    }

    if (generalMessage) {
      return handleGeneralMessageClose();
    }

    setTimeout(() => {
      onHide();
      LocalStorageService.set(localStorageKey, true);
    }, BANNER_COLLAPSE_ANIMATION_DURATION);

    return false;
  }

  useEffect(() => {
    if (hasAvailableCountryBanner) {
      onShow();
    }

    getSiteMessages();
  }, []);

  const siteAnnouncement = isShippingPage && shippingMessage ? shippingMessage : generalMessage;
  if (!hasAvailableCountryBanner && !siteAnnouncement) {
    return null;
  }

  const hasSiteAnnouncement = siteAnnouncement && Object.keys(siteAnnouncement).length > 0;
  const messageType = hasSiteAnnouncement ? siteAnnouncement.type : 'warning';

  return (
    <Collapse in={isOpen} timeout={BANNER_COLLAPSE_ANIMATION_DURATION} mountOnEnter unmountOnExit>
      <div className={classnames(classes.notification, `is-${messageType}`)}>
        <ContainerFullScreen>
          <ButtonCross
            onClick={handleBannerClose}
            color={messageType === 'error' ? 'white' : 'black'}
            className={classes.closeButton}
            isThin
            alt="Close banner"
          />

          {hasSiteAnnouncement ? (
            <GeneralMessageBanner {...siteAnnouncement} />
          ) : (
            <CountryMessageBanner title={countryMessageHeader} message={countryMessageBody} />
          )}
        </ContainerFullScreen>
      </div>
    </Collapse>
  );
}

GeneralNotification.propTypes = {
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  isGeneralMessageDisabled: PropTypes.bool,
  isCountryBannerDisabled: PropTypes.bool,
};

GeneralNotification.defaultProps = {
  isGeneralMessageDisabled: false,
  isCountryBannerDisabled: false,
};

export default GeneralNotification;
