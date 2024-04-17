import React from 'react';

import chevyImg from '../img/chevy.png';
import chevyImg2x from '../img/chevy@2x.png';
import Item from '../Item';

const Chevy = () => (
  <Item
    srcSet={[chevyImg, chevyImg2x]}
    title="Chevy Silverado"
    priceNew="$39,500 USD"
    priceUsed="$30,800 USD"
    priceAbm="$17,500 USD"
    width={280}
    imgHeight="124px"
    right={160}
    labelOffset={60}
  />
);

export default Chevy;
