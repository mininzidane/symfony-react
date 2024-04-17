import React from 'react';

import bmwImg from '../img/bmw.png';
import bmwImg2x from '../img/bmw@2x.png';
import Item from '../Item';

const Bmw = () => (
  <Item
    srcSet={[bmwImg, bmwImg2x]}
    title="BMW 3 Series"
    priceNew="$34,000 USD"
    priceUsed="$18,900 USD"
    priceAbm="$12,100 USD"
    width={240}
    labelOffset={-40}
    imgHeight="120px"
  />
);

export default Bmw;
