import React from 'react';
import PropTypes from 'prop-types';
import { ShippingProvider } from 'backend/js/context/ShippingContext';
import BidContextProvider from './_Context';
import PlaceBid from './PlaceBid';

function InventoryBid({
  inventoryItem,
  customer,
  currentBid,
  onSubmitSuccess,
  onSubmitError,
  allowShippingPreorder,
  shippingAutoInit,
}) {
  if (!inventoryItem) {
    return null;
  }

  return (
    <ShippingProvider lot={inventoryItem} customer={customer} triggerAutoInit={shippingAutoInit}>
      <BidContextProvider
        inventoryItem={inventoryItem}
        customer={customer}
        currentBid={currentBid}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        allowShippingPreorder={allowShippingPreorder}
      >
        <PlaceBid />
      </BidContextProvider>
    </ShippingProvider>
  );
}

InventoryBid.propTypes = {
  inventoryItem: PropTypes.object.isRequired,
  customer: PropTypes.object,
  currentBid: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  allowShippingPreorder: PropTypes.bool,
  shippingAutoInit: PropTypes.bool,
};

InventoryBid.defaultProps = {
  customer: null,
  currentBid: null,
  allowShippingPreorder: false,
  shippingAutoInit: false,
  onSubmitSuccess: () => null,
  onSubmitError: () => null,
};

export default InventoryBid;
