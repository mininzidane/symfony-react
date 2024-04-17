import React from 'react';
import PropTypes from 'prop-types';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import FrequencyLabel from './Label';

function FrequencySelect({ onChange, value, ...rest }) {
  const OPTIONS = [
    {
      label: <FrequencyLabel value="instant" />,
      value: 'instant',
    },
    {
      label: <FrequencyLabel value="daily" />,
      value: 'daily',
    },
  ];

  function handleChange(name, frequency) {
    const googleAnalyticsService = new GoogleAnalyticsService();
    googleAnalyticsService.sendEvent(
      'notification_frequency',
      'saved_search',
      frequency === 'daily' ? 'Once Daily' : 'When Available',
    );

    onChange(name, frequency);
  }

  return <RadioGroup name="frequency" onChange={handleChange} value={value} options={OPTIONS} {...rest} />;
}

FrequencySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FrequencySelect;
