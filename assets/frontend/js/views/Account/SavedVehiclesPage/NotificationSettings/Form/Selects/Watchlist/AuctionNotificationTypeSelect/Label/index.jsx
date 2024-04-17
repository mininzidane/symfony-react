import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';

function ModeLabel({ value }) {
  const intl = useIntl();

  const LABELS = {
    on: intl.formatMessage({ id: 'globalNotificationsSettings.results.notifications.on' }),
    off: intl.formatMessage({ id: 'globalNotificationsSettings.results.notifications.off' }),
  };

  return LABELS[value] || '';
}

ModeLabel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ModeLabel;
