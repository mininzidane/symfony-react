import React from 'react';

import subaruImg from '../img/subaru.png';
import subaruImg2x from '../img/subaru@2x.png';
import Item from '../Item';

const Subaru = () => (
  <Item
    srcSet={[subaruImg, subaruImg2x]}
    title="Subaru WRX"
    priceNew="$36,500 USD"
    priceUsed="$24,800 USD"
    priceAbm="$7,100 USD"
    width={280}
    right={160}
    labelOffset={60}
    imgHeight="124px"
  />
);

export default Subaru;
