import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'frontend/js/components/Button';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function QuickView({ className, onClick }) {
  const classes = useStyles();
  const eventTrackingService = new EventTrackingService();

  function handleClick() {
    onClick();
    eventTrackingService.sendEvent({
      step: 'abm_carfinder_filters',
      substep: 'view_button_carcard_click',
    });
  }

  return (
    <Button
      label={<FormattedMessage id="shared.cta.quickView" />}
      onClick={handleClick}
      className={classnames(classes.root, className)}
      isShadowless
      isRegularCase
    />
  );
}

QuickView.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default QuickView;
