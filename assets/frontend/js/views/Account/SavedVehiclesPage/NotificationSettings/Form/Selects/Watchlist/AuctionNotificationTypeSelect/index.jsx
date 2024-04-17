import RadioGroup from 'frontend/js/components/Form/RadioGroup';
import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

function AuctionNotificationTypeSelect({ onChange, value, ...rest }) {
  const OPTIONS = [
    {
      label: <Label value="on" />,
      value: 'sms',
    },
    {
      label: <Label value="off" />,
      value: 'none',
    },
  ];

  return <RadioGroup name="auctionNotificationType" onChange={onChange} value={value} options={OPTIONS} {...rest} />;
}

AuctionNotificationTypeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuctionNotificationTypeSelect;
