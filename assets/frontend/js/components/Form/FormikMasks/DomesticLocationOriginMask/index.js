const DomesticLocationOriginMask = (value) => {
  if (typeof value !== 'object') {
    return value;
  }

  let maskedValue = value.city ? value.city.toUpperCase() : '';
  maskedValue += value.state_code ? `, ${value.state_code}`.toUpperCase() : '';
  maskedValue += value.zip ? `, ${value.zip}` : '';
  maskedValue += value.country_code === 'CA' ? `, CANADA` : '';

  return maskedValue;
};

export default DomesticLocationOriginMask;
