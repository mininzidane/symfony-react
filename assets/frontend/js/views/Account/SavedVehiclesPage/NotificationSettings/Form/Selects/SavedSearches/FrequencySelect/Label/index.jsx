import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';

function FrequencyLabel({ value }) {
  const intl = useIntl();

  const LABELS = {
    instant: intl.formatMessage({
      id: 'globalNotificationsSettings.results.notifications.notificationFrequency.instant',
    }),
    daily: intl.formatMessage({ id: 'globalNotificationsSettings.results.notifications.notificationFrequency.daily' }),
  };

  return LABELS[value] || '';
}

FrequencyLabel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default FrequencyLabel;
