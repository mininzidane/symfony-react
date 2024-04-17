import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';

function MethodLabel({ value }) {
  const inlt = useIntl();

  const LABELS = {
    email: inlt.formatMessage({ id: 'globalNotificationsSettings.results.notifications.howToNotify.email' }),
    text: inlt.formatMessage({ id: 'shared.label.sms' }),
    none: inlt.formatMessage({ id: 'globalNotificationsSettings.results.notifications.howToNotify.disabled' }),
  };

  return LABELS[value] || '';
}

MethodLabel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default MethodLabel;
