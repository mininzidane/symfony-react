function prepareInstantOfferData(instantOffer) {
  if (!instantOffer) {
    return null;
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    zip,
    carPaidOff,
    keysAvailable,
    make,
    model,
    year,
    mileage,
    mirrorsGlassOrLightsDamage,
    removedOrLooseExteriorPanels,
    vehicleColor,
    color,
    vin,
    vehicleVin,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    wheelsAndTires,
    titleType,
    underTheHood,
    conditionType,
    bodyDamage,
    damagesDescription,
    flatTireDriverSideFront,
    flatTirePassengerSideFront,
    flatTireDriverSideRear,
    flatTirePassengerSideRear,
    floodOrFireDamage,
    pickupAddress,
    pickupCity,
    pickupStateCode,
    pickupTime,
    pickupDate,
  } = instantOffer;

  const preparedValues = {
    firstName,
    lastName,
    email,
    phoneNumber,
    zip,
    make: vehicleMake || make || '',
    model: vehicleModel || model || '',
    year: String(vehicleYear || year || ''),
    vehicleColor,
    color,
    wheelsAndTires,
    titleType,
    underTheHood,
    mileage,
    conditionType,
    flatTireDriverSideFront,
    flatTirePassengerSideFront,
    flatTireDriverSideRear,
    flatTirePassengerSideRear,
    floodOrFireDamage,
    damagesDescription: damagesDescription || {},
    bodyDamage: (bodyDamage !== null && (bodyDamage === 'Yes' ? '1' : '0')) || '',
    carPaidOff: (carPaidOff !== null && (carPaidOff ? '1' : '0')) || '',
    keys: (keysAvailable !== null && (keysAvailable ? '1' : '0')) || '',
    removedOrLooseExteriorPanels:
      (removedOrLooseExteriorPanels !== null && (removedOrLooseExteriorPanels ? '1' : '0')) || '',
    mirrorsGlassOrLightsDamage: (mirrorsGlassOrLightsDamage !== null && (mirrorsGlassOrLightsDamage ? '1' : '0')) || '',
    vin: vin || vehicleVin || '',
    unableToVerifyMileage: mileage === null ? '1' : '0',
    pickupAddress: pickupAddress || '',
    pickupTime: pickupTime || '',
    pickupDate: pickupDate || '',
    pickupCity: pickupCity || '',
    pickupStateCode: pickupStateCode || '',
  };
  preparedValues.zipValid = Boolean(preparedValues.zip);
  preparedValues.vinValid = Boolean(preparedValues.vin);
  if (preparedValues.vinValid) {
    preparedValues.vinYMM = `${vehicleYear} ${vehicleMake} ${vehicleModel}`;
  }

  return preparedValues;
}

export default prepareInstantOfferData;
