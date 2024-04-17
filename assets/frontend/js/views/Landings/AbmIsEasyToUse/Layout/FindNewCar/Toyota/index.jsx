import React from 'react';

import toyotaImg from '../img/toyota-camry.png';
import toyotaImg2x from '../img/toyota-camry@2x.png';
import Item from '../Item';

const Toyota = () => (
  <Item
    srcSet={[toyotaImg, toyotaImg2x]}
    title="Toyota Camry"
    priceNew="$25,800 USD"
    priceUsed="$16,400 USD"
    priceAbm="$7,300 USD"
    left={-75}
    imgHeight="144px"
  />
);

export default Toyota;
