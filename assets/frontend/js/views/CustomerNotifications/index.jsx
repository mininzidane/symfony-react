import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import RouterService from 'frontend/js/api/RouterService';
import BuyerPowerNotification from './BuyerPowerNotification';
import VideoGuideNotification from './VideoGuideNotification';
import useCustomerNotifications from './useCustomerNotifications';
import MailingAddressConfirmationModal from './MailingAddressConfirmationModal';
import useStyles from './useStyles';

function CustomerNotifications({ noVideoGuides }) {
  useStyles();
  const { notificationsCnt, isLoading, notifications, hideNotification, needConfirmMailingAddress } =
    useCustomerNotifications();

  const [isMailingAddressConfirmOpen, setIsMailingAddressConfirmOpen] = useState(needConfirmMailingAddress);

  if (isMailingAddressConfirmOpen && window.location.pathname === RouterService.getRoute('lotsWon')) {
    return (
      <MailingAddressConfirmationModal
        onClose={() => setIsMailingAddressConfirmOpen(false)}
        isOpen={isMailingAddressConfirmOpen}
      />
    );
  }

  if (notificationsCnt > 0) {
    if (isLoading || !notifications) {
      return null;
    }

    const notification = notifications[0] || {};

    if (notification.type === 'buyerPower') {
      return (
        <BuyerPowerNotification
          data={notification.data}
          token={notification.token}
          hideNotification={hideNotification}
        />
      );
    }
  }

  if (!noVideoGuides) {
    return <VideoGuideNotification />;
  }

  return null;
}

CustomerNotifications.defaultProps = {
  noVideoGuides: false,
};

CustomerNotifications.propTypes = {
  noVideoGuides: PropTypes.bool,
};

const $el = document.getElementById('customer-notifications');

if ($el) {
  ReactDOM.render(
    <ReactQueryProvider>
      <ThemeProvider>
        <TranslationProvider>
          <CustomerNotifications />
        </TranslationProvider>
      </ThemeProvider>
    </ReactQueryProvider>,
    $el,
  );
}

export default CustomerNotifications;
