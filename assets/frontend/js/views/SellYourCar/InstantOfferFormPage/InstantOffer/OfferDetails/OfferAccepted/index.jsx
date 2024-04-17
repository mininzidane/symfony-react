import React from 'react';
import PropTypes from 'prop-types';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import PickupInfoForm from '../_Shared/PickupInfoForm';
import PayMethodForm from '../_Shared/PayMethodForm';
import HelpfulReminders from '../_Shared/HelpfulReminders';
import Header from '../_Shared/Header';
import TrackingBar from './TrackingBar';
import useOfferAccepted from './useOfferAccepted';
import useStyles from './useStyles';

function OfferAccepted({ instantOffer, updateInstantOffer }) {
  const classes = useStyles();

  const { step, title, subtitle } = useOfferAccepted(instantOffer);

  return (
    <>
      <div className={classes.root}>
        <TrackingBar step={step} className={classes.trackingBar} />
        <Header title={title} subtitle={subtitle} />
        <div className={classes.content}>
          <PickupInfoForm instantOffer={instantOffer} />
          <PayMethodForm instantOffer={instantOffer} onSuccess={updateInstantOffer} />
        </div>
        <Contacts className={classes.contacts} />
      </div>
      <HelpfulReminders />
    </>
  );
}

OfferAccepted.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  updateInstantOffer: PropTypes.func.isRequired,
};

export default OfferAccepted;
