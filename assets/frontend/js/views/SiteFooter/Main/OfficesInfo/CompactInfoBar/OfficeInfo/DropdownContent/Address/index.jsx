import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import CommaWrapText from 'frontend/js/components/CommaWrapText';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';

function Address({ data, icon }) {
  const { address, city, zip } = data;
  const state = get(data, 'state.code');
  const country = get(data, 'country.name');

  const values = [address, city, [state, ...(state ? [zip, country] : [country, zip])].filter(Boolean).join(' ')];
  const value = values.filter(Boolean).join(', ');

  if (!value) {
    return null;
  }

  return (
    <div className="d-f">
      {icon && <img src={PinSvg} alt="Location" width="22" height="22" className="mr-10" />}
      <CommaWrapText value={value} />
    </div>
  );
}

Address.defaultProps = {
  data: {},
  icon: false,
};

Address.propTypes = {
  data: OfficeLocationShape,
  icon: PropTypes.bool,
};

export default Address;
