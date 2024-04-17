import React from 'react';

import nissanImg from '../img/nissan.png';
import nissanImg2x from '../img/nissan@2x.png';
import Item from '../Item';

const Nissan = () => (
  <Item
    srcSet={[nissanImg, nissanImg2x]}
    title="Nissan 370z"
    priceNew="$33,000 USD"
    priceUsed="$23,000 USD"
    priceAbm="$6,500 USD"
    width={240}
    imgHeight="97px"
    labelOffset={-40}
  />
);

export default Nissan;
