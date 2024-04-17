import React from 'react';
import IBox from 'backend/js/components/IBox';
import InventoryGallery from 'backend/js/views/_Shared/InventoryDetails/InventoryGallery';
import useInventoryPageContext from '../../_Context/useInventoryPageContext';

function ImageBlock() {
  const { inventoryItem } = useInventoryPageContext();

  const { images } = inventoryItem;
  return (
    <div className="col-lg-4">
      <IBox title="Images" contentClassName="no-padding">
        <InventoryGallery images={images} />
      </IBox>
    </div>
  );
}

export default ImageBlock;
