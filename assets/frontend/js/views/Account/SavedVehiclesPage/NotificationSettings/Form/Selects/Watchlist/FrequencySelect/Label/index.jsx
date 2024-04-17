import useIntl from 'frontend/js/hooks/useIntl';
import PropTypes from 'prop-types';

function ModeLabel({ value }) {
  const intl = useIntl();

  const LABELS = {
    mode0: intl.formatMessage({ id: 'globalNotificationsSettings.defaultNotificatiionMode.never' }),
    mode1: intl.formatMessage({ id: 'globalNotificationsSettings.defaultNotificatiionMode.always' }),
    mode2: intl.formatMessage({ id: 'globalNotificationsSettings.defaultNotificatiionMode.select' }),
  };

  return LABELS[`mode${value}`] || '';
}

ModeLabel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ModeLabel;
