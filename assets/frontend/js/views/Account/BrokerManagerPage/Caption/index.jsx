import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BrokerManagerSvg from 'frontend/images/shared/light-blue-set/ic_broker_manager.svg';
import useBidderFormContext from '../_Context/useBidderFormContext';

function Caption({ hasBidders }) {
  const intl = useIntl();
  const { content } = useBidderFormContext();
  const { isFormShown, setIsFormShown } = content;
  const captionLabel = intl.formatMessage({ id: 'brokerManagerPage.title' });

  return (
    <CaptionPanel
      icon={BrokerManagerSvg}
      iconSize={{ width: 23, height: 21 }}
      label={captionLabel}
      fullscreen
      extra={
        !isFormShown &&
        hasBidders && (
          <Button
            color="blue"
            onClick={() => setIsFormShown(true)}
            size="sm"
            label={<FormattedMessage id="brokerManagerPage.addNewBroker" />}
            isInline
            isRegularCase
          />
        )
      }
    />
  );
}

Caption.propTypes = {
  hasBidders: PropTypes.bool.isRequired,
};

export default Caption;
