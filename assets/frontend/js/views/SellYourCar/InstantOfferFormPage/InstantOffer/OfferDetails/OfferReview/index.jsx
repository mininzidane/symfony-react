import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import PickupInfoForm from '../_Shared/PickupInfoForm';
import HelpfulReminders from '../_Shared/HelpfulReminders';
import Header from '../_Shared/Header';
import ClockSvg from './img/clock.svg';
import WatchSvg from './img/watch.svg';
import useStyles from './useStyles';

function OfferReview({ instantOffer }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.icon}>
          <img src={ClockSvg} width="33" height="31" alt="Clock" className={classes.clockIcon} />
        </div>
        <Header
          title={intl.formatMessage(
            { id: 'sellYourCarPage.instantOffer.offerReview.title' },
            { ymm: instantOffer.title },
          )}
          subtitle={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.offerReview.subtitle' })}
        />
        <div className={classes.content}>
          <PickupInfoForm instantOffer={instantOffer} className={classes.pickupInfo} />
          <div className={classes.card}>
            <div className={classes.cardIcon}>
              <img src={WatchSvg} alt="Watch" width="148" height="152" />
            </div>
            <div className={classes.cardContent}>
              <div className={classes.cardTitle}>
                {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.offerReview.backToYouASAP' })}
              </div>
              <div>
                {intl.formatMessage(
                  { id: 'sellYourCarPage.instantOffer.offerReview.backToYouASAP.desc' },
                  { br: <br /> },
                )}
              </div>
            </div>
          </div>
        </div>
        <Contacts className={classes.contacts} />
      </div>
      <HelpfulReminders />
    </>
  );
}

OfferReview.propTypes = {
  instantOffer: PropTypes.object.isRequired,
};

export default OfferReview;
