/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import Offsite from '../Value';

function Pickup({ lot }) {
  const data = get(lot, 'offsite.pickup');

  return <Offsite data={data} />;
}

export default Pickup;
