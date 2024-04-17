import React from 'react';
import PropTypes from 'prop-types';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import MethodLabel from './Label';

function MethodSelect({ onChange, value, ...rest }) {
  const OPTIONS = [
    {
      label: <MethodLabel value="email" />,
      value: 'email',
    },
    {
      label: <MethodLabel value="sms" />,
      value: 'sms',
    },
    {
      label: <MethodLabel value="email_and_sms" />,
      value: 'email_and_sms',
    },
  ];

  function handleChange(name, method) {
    const googleAnalyticsService = new GoogleAnalyticsService();
    googleAnalyticsService.sendEvent('notification', 'watchlist', method);

    onChange(name, method);
  }

  return <RadioGroup name="method" onChange={handleChange} value={value} options={OPTIONS} {...rest} />;
}

MethodSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MethodSelect;
