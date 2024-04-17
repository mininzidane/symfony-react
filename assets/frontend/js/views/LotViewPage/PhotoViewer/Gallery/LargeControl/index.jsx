import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Control from '../Control';
import ModalGallery from './ModalGallery';
import useStyles from './useStyles';

function LargeControl({ id, auction, images }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  if (!images || !images.length) {
    return null;
  }

  const trigger = (
    <Control className={classes.root}>
      <FormattedMessage id="lotPage.gallery.large" values={{ total: images.length }} />
    </Control>
  );

  if (!isAuthenticated) {
    return React.cloneElement(trigger, {
      onClick: () => {
        const eventTrackingService = new EventTrackingService();
        eventTrackingService.sendEvent({ name: 'large_image_button_click', step: 'abm_lotpage' });
        window.dispatchEvent(new CustomEvent('openAuthModal'));
      },
    });
  }

  return <ModalGallery id={id} auction={auction} trigger={trigger} />;
}

LargeControl.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
};

export default LargeControl;
