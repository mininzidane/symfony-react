/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import Offsite from '../Value';

function Preview({ lot }) {
  const data = get(lot, 'offsite.preview');

  return <Offsite data={data} />;
}

export default Preview;
