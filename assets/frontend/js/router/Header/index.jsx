import React from 'react';
import PropTypes from 'prop-types';
import SiteHeaderSimple from 'frontend/js/views/SiteHeader/Simple';
import SiteHeader from 'frontend/js/views/SiteHeader/Main';
import DelayedLoadSuspense from 'frontend/js/components/Suspense/DelayedLoad';

const CustomerNotifications = React.lazy(() => import('frontend/js/views/CustomerNotifications'));

const Header = ({
  isHeaderDisabled,
  isSimpleHeader,
  isSimpleHeaderDefaultPaddings,
  isSimpleHeaderWithoutLabel,
  isAllNotificationsDisabled,
  isCustomerNotificationsDisabled,
  isVideoGuidesNotificationDisabled,
}) => {
  if (isHeaderDisabled) {
    return null;
  }

  return (
    <header id="site-header" className="page-header">
      {isSimpleHeader ? (
        <SiteHeaderSimple
          isDefaultPaddings={isSimpleHeaderDefaultPaddings}
          isWithoutLabel={isSimpleHeaderWithoutLabel}
        />
      ) : (
        <SiteHeader />
      )}

      {!isAllNotificationsDisabled && !isCustomerNotificationsDisabled && (
        <DelayedLoadSuspense fallback={null}>
          <CustomerNotifications noVideoGuides={isVideoGuidesNotificationDisabled} />
        </DelayedLoadSuspense>
      )}
    </header>
  );
};

Header.defaultProps = {
  isHeaderDisabled: false,
  isSimpleHeader: false,
  isSimpleHeaderDefaultPaddings: false,
  isSimpleHeaderWithoutLabel: false,
  isAllNotificationsDisabled: false,
  isCustomerNotificationsDisabled: false,
  isVideoGuidesNotificationDisabled: false,
};

Header.propTypes = {
  isHeaderDisabled: PropTypes.bool,
  isSimpleHeader: PropTypes.bool,
  isSimpleHeaderDefaultPaddings: PropTypes.bool,
  isSimpleHeaderWithoutLabel: PropTypes.bool,
  isAllNotificationsDisabled: PropTypes.bool,
  isCustomerNotificationsDisabled: PropTypes.bool,
  isVideoGuidesNotificationDisabled: PropTypes.bool,
};

export default Header;
