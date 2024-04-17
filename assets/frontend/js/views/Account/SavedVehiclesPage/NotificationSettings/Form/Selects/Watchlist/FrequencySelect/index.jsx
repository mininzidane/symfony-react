import React from 'react';
import PropTypes from 'prop-types';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import Label from './Label';

function FrequencySelect({ onChange, value, ...rest }) {
  const OPTIONS = [
    {
      label: <Label value="1" />,
      value: '1',
    },
    {
      label: <Label value="2" />,
      value: '2',
    },
  ];

  function sendGaEvent(mode) {
    const googleAnalyticsService = new GoogleAnalyticsService();
    googleAnalyticsService.sendEvent(
      'notification_mode',
      'watchlist',
      {
        [mode === '1']: 'Always',
        [mode === '2']: 'Selected auctions',
      }.true,
    );
  }

  function handleChange(name, mode) {
    sendGaEvent(mode);
    onChange(name, mode);
  }

  return <RadioGroup name="frequency" onChange={handleChange} value={value} options={OPTIONS} {...rest} />;
}

FrequencySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FrequencySelect;
