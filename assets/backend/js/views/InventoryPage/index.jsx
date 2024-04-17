import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import ShippingQuoteContextProvider from 'frontend/js/context/ShippingQuoteContext';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import HeaderRow from './HeaderRow';
import InventoryPageContextProvider from './_Context';
import BodyRow from './BodyRow';
import useInventoryPageContext from './_Context/useInventoryPageContext';

function InventoryContent() {
  const { loadingDetails } = useInventoryPageContext();

  if (loadingDetails) {
    return <h5>Loading</h5>;
  }

  return (
    <>
      <div className="wrapper wrapper-content">
        <HeaderRow />
        <BodyRow />
      </div>
    </>
  );
}

function InventoryPage({ inventoryId, customer, auction, assignBidAccess }) {
  return (
    <ShippingQuoteContextProvider>
      <InventoryPageContextProvider
        inventoryId={inventoryId}
        customer={customer}
        auction={auction}
        assignBidAccess={assignBidAccess}
      >
        <InventoryContent />
      </InventoryPageContextProvider>
    </ShippingQuoteContextProvider>
  );
}

InventoryPage.propTypes = {
  inventoryId: PropTypes.number.isRequired,
  customer: PropTypes.object.isRequired,
  auction: PropTypes.string.isRequired,
  assignBidAccess: PropTypes.bool,
};

InventoryPage.defaultProps = {
  assignBidAccess: false,
};

const $el = document.getElementById('inventory-page');
if ($el) {
  const $auction = $el.dataset.auction || null;
  const $inventoryId = $el.dataset.inventoryId ? parseInt($el.dataset.inventoryId, 10) : null;
  const $customer = window.customer || {};
  const $assignBidAccess = $el.dataset.assignBidAccess ? Boolean($el.dataset.assignBidAccess) : false;

  ReactDOM.render(
    <ThemeProvider>
      <TranslationProvider>
        <ReactQueryProvider>
          <InventoryPage
            inventoryId={$inventoryId}
            customer={$customer}
            auction={$auction}
            assignBidAccess={$assignBidAccess}
          />
        </ReactQueryProvider>
      </TranslationProvider>
    </ThemeProvider>,
    $el,
  );
}

export default InventoryPage;
