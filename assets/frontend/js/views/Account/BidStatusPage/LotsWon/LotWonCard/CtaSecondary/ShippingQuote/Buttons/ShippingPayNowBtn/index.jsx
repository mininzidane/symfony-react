import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';

function ShippingPayNowBtn({ className, token }) {
  function handleEventTracking() {
    const eventTrackingService = new EventTrackingService();
    eventTrackingService.sendEvent({
      name: 'shipping_status_button_click',
      step: 'abm_shipping',
    });
  }

  return (
    <div className={className}>
      <Button
        label={<FormattedMessage id="shared.cta.payNow" />}
        href={RouterService.getRoute('shippingPayment', null, false, {
          token,
        })}
        onClick={handleEventTracking}
        size="sm"
      />
    </div>
  );
}

ShippingPayNowBtn.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string,
};

ShippingPayNowBtn.defaultProps = {
  className: '',
  token: '',
};

export default ShippingPayNowBtn;
