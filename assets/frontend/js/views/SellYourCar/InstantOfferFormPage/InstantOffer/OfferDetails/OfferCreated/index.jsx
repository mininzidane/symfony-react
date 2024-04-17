import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import Header from '../_Shared/Header';
import AcceptOfferBtn from '../_Shared/AcceptOfferBtn';
import MoneySvg from '../_Shared/img/money.svg';
import CarPriceSvg from './img/car-price.svg';
import CarBetterOfferSvg from './img/car-better-offer.svg';
import useStyles from './useStyles';

function OfferCreated({ instantOffer, updateInstantOffer }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <img src={MoneySvg} alt="Money" width="33" height="21" className={classes.moneyIcon} />
      </div>
      <Header
        title={intl.formatMessage(
          { id: 'sellYourCarPage.instantOffer.offerCreated.title' },
          { ymm: instantOffer.title },
        )}
        subtitle={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.offerCreated.subtitle' })}
      />
      <div className={classes.cards}>
        <div className={classes.card}>
          <div className={classes.cardIcon}>
            <img src={CarBetterOfferSvg} alt="Car" width="149" height="86" />
          </div>
          <div className={classes.cardContent}>
            <div className={classes.cardTitle}>
              {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.wantABetterOffer.title' }, { br: <br /> })}
            </div>
            <div>{intl.formatMessage({ id: 'sellYourCarPage.instantOffer.wantABetterOffer.subtitle' })}</div>
          </div>
          <div className={classes.cardFooter}>
            <ButtonOutlined
              isBackgroundWhite
              isThinBorder
              label={intl.formatMessage({ id: 'shared.cta.uploadCarPhotos' })}
              isNowrap
              href={RouterService.getRoute('sellYourCarUpload', null, false, {
                ref: instantOffer.ref,
                hash: instantOffer.hash,
                contentType: InstantOfferService.FILE_CONTENT_TYPES.PHOTO,
              })}
            />
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.cardIcon}>
            <img src={CarPriceSvg} alt="Car" width="145" height="84" />
          </div>
          <div className={classes.cardContent}>
            <div className={classes.cardAmount}>{NumberService.formatCurrency(instantOffer.offerAmount)} USD</div>
            <div>{intl.formatMessage({ id: 'sellYourCarPage.instantOffer.forYMM' }, { ymm: instantOffer.title })}</div>
          </div>
          <div className={classes.cardFooter}>
            <AcceptOfferBtn instantOfferRef={instantOffer.ref} onAcceptOffer={updateInstantOffer} />
          </div>
        </div>
      </div>
      <Contacts className={classes.contacts} />
    </div>
  );
}

OfferCreated.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  updateInstantOffer: PropTypes.func.isRequired,
};

export default OfferCreated;
