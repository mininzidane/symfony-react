import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonLink from 'frontend/js/components/ButtonLink';
import ContentPopover from 'frontend/js/components/ContentPopover';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import Content from './Content';

function CancelOrderBtn({ className, token, vehicle }) {
  const intl = useIntl();
  function handleEventTracking() {
    const eventTrackingService = new EventTrackingService();
    eventTrackingService.sendEvent({
      name: 'cancel_order_link_click',
      step: 'abm_shipping',
    });
  }

  return (
    <div className={className}>
      <ContentPopover
        trigger={
          <ButtonLink
            label={intl.formatMessage({ id: 'shared.cta.cancelOrder' })}
            size="sm"
            onClick={handleEventTracking}
          />
        }
        popoverTitle={intl.formatMessage({ id: 'shared.cta.cancelOrder' })}
        popoverClass=""
        popoverOptions={{ placement: 'bottom' }}
      >
        {({ close }) => <Content close={close} token={token} vehicle={vehicle} />}
      </ContentPopover>
    </div>
  );
}

CancelOrderBtn.propTypes = {
  className: PropTypes.string,
  token: PropTypes.string,
  vehicle: PropTypes.string,
};

CancelOrderBtn.defaultProps = {
  className: '',
  token: '',
  vehicle: '',
};

export default CancelOrderBtn;
