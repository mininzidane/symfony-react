/* eslint-disable react/prop-types */
import React from 'react';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

function SoldViewDetailsButton({ href, onSoldButtonClick }) {
  return (
    <ButtonOutlined
      href={href}
      color="blue"
      label={<FormattedMessage id="shared.cta.soldViewDetails" />}
      onClick={onSoldButtonClick}
    />
  );
}

export default SoldViewDetailsButton;
