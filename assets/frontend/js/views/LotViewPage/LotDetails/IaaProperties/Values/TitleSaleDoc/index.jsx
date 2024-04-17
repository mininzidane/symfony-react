/* eslint-disable react/prop-types */
import React from 'react';

function TitleSaleDoc({ lot }) {
  const { titleType, titleState } = lot;
  return (
    <div>
      <div>
        {titleType}&nbsp;
        {titleState && <>({titleState})</>}
      </div>
    </div>
  );
}

export default TitleSaleDoc;
