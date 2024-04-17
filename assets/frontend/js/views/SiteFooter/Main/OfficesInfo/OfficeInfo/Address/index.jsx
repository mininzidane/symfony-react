import React from 'react';
import get from 'lodash/get';
import CommaWrapText from 'frontend/js/components/CommaWrapText';
import CountryService from 'frontend/js/api/CountryService';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';
import PinSvg from 'frontend/images/shared/squared-blue-set/pin.svg';
import useStyles from './useStyles';

function Address({ data }) {
  const classes = useStyles();
  const { address, city, zip } = data;
  const state = get(data, 'state.code');
  const country = get(data, 'country.name');
  const isUsa = CountryService.isCountry(data.country.iso_2, 'usa');

  const addressString = isUsa ? `AutoBidMaster ${address}` : address;

  return (
    <div className={classes.root}>
      <img src={PinSvg} alt="Location" width="22" height="22" />
      <div>
        <CommaWrapText value={[addressString, city].filter(Boolean).join(', ')} />
        {[state, ...(state ? [zip, country] : [country, zip])].filter(Boolean).join(' ')}
      </div>
    </div>
  );
}

Address.propTypes = {
  data: OfficeLocationShape,
};

Address.defaultProps = {
  data: {},
};

export default Address;
