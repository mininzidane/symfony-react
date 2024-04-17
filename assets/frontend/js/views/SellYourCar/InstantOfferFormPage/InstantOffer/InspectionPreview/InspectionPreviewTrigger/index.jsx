/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import Triangle from 'frontend/js/components/Triangle';
import CarSvg from './img/car.svg';
import useStyles from './useStyles';

function InspectionPreviewTrigger({ onClick, isActive, duration, instantOfferRef }) {
  const classes = useStyles({ duration });

  return (
    <div className={classnames(classes.root, isActive && 'is-active')}>
      <button type="button" className={classes.button} onClick={onClick}>
        <img src={CarSvg} alt="Car" />
        <span className={classes.label}>
          <FormattedMessage id="sellYourCarPage.leadForm.myCar" />
          {instantOfferRef && (
            <>
              {' '}
              <FormattedMessage id="sellYourCarPage.instantOffer.ref" values={{ ref: instantOfferRef }} />
            </>
          )}
        </span>
        <Triangle className={classes.triangle} color="#FFF" isFlipped={isActive} />
      </button>
    </div>
  );
}

InspectionPreviewTrigger.propTypes = {};

export default InspectionPreviewTrigger;
