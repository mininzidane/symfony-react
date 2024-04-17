/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import VehicleTitleSvg from './img/vehicle-title.svg';
import VehiclePhotosSvg from './img/vehicle-photos.svg';
import PickUpInformationSvg from './img/pick-up-information.svg';
import PaymentMethodSvg from './img/payment-method.svg';
import MoneySvg from './img/money.svg';
import useStyles from './useStyles';

function Step({ isCompleted, isActive, stepNumber, isLast }) {
  const classes = useStyles();
  const intl = useIntl();

  const iconMap = {
    1: VehicleTitleSvg,
    2: VehiclePhotosSvg,
    3: PickUpInformationSvg,
    4: PaymentMethodSvg,
    6: MoneySvg,
  };

  const labelTranslationKeyMap = {
    1: 'shared.label.vehicleTitle',
    2: 'shared.label.vehiclePhotos',
    3: 'shared.label.pickUpInformation',
    4: 'shared.label.paymentMethod',
    6: 'shared.label.paymentIssued',
  };

  const label = intl.formatMessage({ id: labelTranslationKeyMap[stepNumber] });

  return (
    <div className={classnames(classes.root, isCompleted && 'is-completed', isActive && 'is-active')} title={label}>
      {(isActive || isLast) && iconMap[stepNumber] && <img src={iconMap[stepNumber]} alt="Icon" />}
      {isActive && <div className={classes.label}>{label}</div>}
    </div>
  );
}

export default Step;
