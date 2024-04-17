/* eslint-disable react/prop-types */
import React from 'react';

function SellingBranch({ lot }) {
  const { location } = lot;
  const { name, stateCode } = location;

  return (
    <div>
      {name}&nbsp;
      {stateCode && <>({stateCode})</>}
    </div>
  );
}

export default SellingBranch;
