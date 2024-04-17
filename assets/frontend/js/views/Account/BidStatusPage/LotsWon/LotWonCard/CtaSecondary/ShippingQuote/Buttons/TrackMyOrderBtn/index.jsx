import React from 'react';
import PropTypes from 'prop-types';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import RouterService from 'frontend/js/api/RouterService';
import useIntl from 'frontend/js/hooks/useIntl';

function TrackMyOrderBtn({ token, vin, className }) {
  const intl = useIntl();

  return (
    <ButtonOutlined
      label={intl.formatMessage({ id: 'shared.cta.trackMyOrder' })}
      href={RouterService.getRoute('shippingTracking', null, false, { emailOrToken: token, vin })}
      size="sm"
      className={className}
      isTargetBlank
      isThinBorder
    />
  );
}

TrackMyOrderBtn.propTypes = {
  token: PropTypes.string.isRequired,
  vin: PropTypes.string.isRequired,
  className: PropTypes.string,
};

TrackMyOrderBtn.defaultProps = {
  className: '',
};

export default TrackMyOrderBtn;
