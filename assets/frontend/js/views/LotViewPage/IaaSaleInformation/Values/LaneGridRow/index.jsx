/* eslint-disable react/prop-types */
import React from 'react';

function LaneGridRow({ lot }) {
  const { lane, item } = lot;
  return (
    <>
      {lane}
      {lane && item && '-'}
      {item && `#${item}`}
    </>
  );
}

export default LaneGridRow;
