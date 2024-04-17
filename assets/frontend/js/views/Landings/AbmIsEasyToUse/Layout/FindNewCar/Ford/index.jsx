import React from 'react';

import fordImg from '../img/ford.png';
import fordImg2x from '../img/ford@2x.png';
import Item from '../Item';

const Ford = () => (
  <Item
    isBig
    srcSet={[fordImg, fordImg2x]}
    title="Ford F-150"
    priceNew="$43,800 USD"
    priceUsed="$34,900 USD"
    priceAbm="$15,500 USD"
    right={45}
    zIndex={1}
    imgHeight="159px"
  />
);

export default Ford;
