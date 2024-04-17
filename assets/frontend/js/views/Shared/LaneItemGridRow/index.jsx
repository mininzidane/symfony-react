/* eslint-disable react/prop-types */
import React from 'react';

function LaneItemGridRow({ lot }) {
  return (
    <>
      {lot.item > 0 ? `${lot.lane}/${lot.item}/` : '-/-/'}
      {lot.gridRow || '-'}
    </>
  );
}

export default LaneItemGridRow;
