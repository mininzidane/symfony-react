import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import PickupInfoForm from '../_Shared/PickupInfoForm';
import HelpfulReminders from '../_Shared/HelpfulReminders';
import Header from '../_Shared/Header';
import AcceptOfferBtn from '../_Shared/AcceptOfferBtn';
import MoneySvg from '../_Shared/img/money.svg';
import CarPriceSvg from './img/car-price.svg';
import useStyles from './useStyles';

function NewOffer({ instantOffer, updateInstantOffer }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.icon}>
          <img src={MoneySvg} alt="Money" width="33" height="21" className={classes.moneyIcon} />
        </div>
        <Header
          title={intl.formatMessage(
            { id: 'sellYourCarPage.instantOffer.newOffer.title' },
            { ymm: instantOffer.title, br: <br className="sm-up-hide" /> },
          )}
          subtitle={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.newOffer.subtitle' })}
        />
        <div className={classes.content}>
          <PickupInfoForm instantOffer={instantOffer} className={classes.pickupInfo} />
          <div className={classes.card}>
            <div className={classes.cardIcon}>
              <img src={CarPriceSvg} alt="Car" width="196" height="118" />
            </div>
            <div className={classes.cardContent}>
              <div className={classes.cardAmount}>{NumberService.formatCurrency(instantOffer.offerAmount)} USD</div>
              {instantOffer.firstOfferedAmount && instantOffer.firstOfferedAmount < instantOffer.offerAmount ? (
                <div>
                  {intl.formatMessage(
                    { id: 'sellYourCarPage.instantOffer.oldOffer' },
                    { amount: <s>{NumberService.formatCurrency(instantOffer.firstOfferedAmount)} USD</s> },
                  )}
                </div>
              ) : (
                <div>
                  {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.forYMM' }, { ymm: instantOffer.title })}
                </div>
              )}
            </div>
            <AcceptOfferBtn instantOfferRef={instantOffer.ref} onAcceptOffer={updateInstantOffer} />
          </div>
        </div>
        <Contacts className={classes.contacts} />
      </div>
      <HelpfulReminders />
    </>
  );
}

NewOffer.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  updateInstantOffer: PropTypes.func.isRequired,
};

export default NewOffer;
