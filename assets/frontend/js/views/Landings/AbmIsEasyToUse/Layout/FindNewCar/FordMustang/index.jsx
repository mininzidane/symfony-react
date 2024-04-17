import React from 'react';

import mustangImg from '../img/ford-sport.png';
import mustangImg2x from '../img/ford-sport@2x.png';
import Item from '../Item';

const FordMustang = () => (
  <Item
    srcSet={[mustangImg, mustangImg2x]}
    title="Ford Mustang"
    priceNew="$35,800 USD"
    priceUsed="$24,000 USD"
    priceAbm="$6,900 USD"
    left={-75}
    imgHeight="145px"
  />
);

export default FordMustang;
