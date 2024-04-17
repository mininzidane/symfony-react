import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import SwitchPlane from 'frontend/js/components/Form/Switch/SwitchPlane';
import WatchlistMethodSelect from './Selects/Watchlist/MethodSelect';
import WatchlistFrequencySelect from './Selects/Watchlist/FrequencySelect';
import SavedSearchesMethodSelect from './Selects/SavedSearches/MethodSelect';
import SavedSearchesFrequencySelect from './Selects/SavedSearches/FrequencySelect';
import Phone from './Phone';
import useStyles from './useStyles';
import AuctionNotificationTypeSelect from './Selects/Watchlist/AuctionNotificationTypeSelect';

function NotificationSettings({ settings, type, onChange }) {
  const classes = useStyles();
  const intl = useIntl();

  function handleChange(name, value) {
    onChange(name, value);
  }

  const isDisabled = !settings.notifications;

  return (
    <div className={classes.root}>
      <div className={classnames(classes.block, 'd-f jc-sb ai-ct')}>
        <FormattedMessage id="shared.label.notifications" className={classnames(classes.label, 'm-0')} />
        <SwitchPlane
          className="tt-u"
          isChecked={settings.notifications}
          label={intl.formatMessage({ id: settings.notifications ? 'shared.label.on' : 'shared.label.off' })}
          onChange={(value) => handleChange('notifications', value)}
        />
      </div>

      <div className={classes.block}>
        <div className={classes.label}>
          <FormattedMessage id="globalNotificationsSettings.notificationMode" />:
        </div>

        {type === 'watchlist' && (
          <WatchlistMethodSelect onChange={handleChange} value={settings.method} isDisabled={isDisabled} />
        )}
        {type === 'savedSearches' && (
          <SavedSearchesMethodSelect onChange={handleChange} value={settings.method} isDisabled={isDisabled} />
        )}
      </div>

      <div className={classes.block}>
        <div className={classes.label}>
          <FormattedMessage id="globalNotificationsSettings.frequency" />:
        </div>
        {type === 'watchlist' && (
          <WatchlistFrequencySelect
            onChange={handleChange}
            value={String(settings.frequency)}
            isDisabled={isDisabled}
          />
        )}
        {type === 'savedSearches' && (
          <SavedSearchesFrequencySelect onChange={handleChange} value={settings.frequency} isDisabled={isDisabled} />
        )}
      </div>

      {type === 'watchlist' && (
        <div className={classes.block}>
          <div className={classes.label}>
            <FormattedMessage id="globalNotificationsSettings.liveAuctionUpdates" />:
          </div>
          <AuctionNotificationTypeSelect
            onChange={handleChange}
            value={String(settings.auctionNotificationType)}
            isDisabled={isDisabled}
          />
        </div>
      )}

      <div className={classes.block}>
        <div className={classes.label}>
          <FormattedMessage id="shared.label.phoneNumber" />:
        </div>
        <Phone value={settings.phone} onChange={(value) => handleChange('phone', value)} isDisabled={isDisabled} />
      </div>
    </div>
  );
}

NotificationSettings.propTypes = {
  settings: PropTypes.shape({
    notifications: PropTypes.bool,
    phone: PropTypes.string,
    frequency: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    method: PropTypes.string,
    auctionNotificationType: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NotificationSettings;
