import React from 'react';
import ImageBlock from './ImageBlock';
import Description from './Description';
import BidColumn from './BidColumn';

function BodyRow() {
  return (
    <div className="row">
      <ImageBlock />
      <Description />
      <BidColumn />
    </div>
  );
}

export default BodyRow;
