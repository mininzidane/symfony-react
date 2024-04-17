import React from 'react';

import bmwImg from '../img/bmw-sport.png';
import bmwImg2x from '../img/bmw-sport@2x.png';
import Item from '../Item';

const BmwSport = () => (
  <Item
    isBig
    srcSet={[bmwImg, bmwImg2x]}
    title="BMW 330i"
    priceNew="$38,000 USD"
    priceUsed="$26,000 USD"
    priceAbm="$7,500 USD"
    right={45}
    zIndex={1}
    imgHeight="159px"
  />
);

export default BmwSport;
