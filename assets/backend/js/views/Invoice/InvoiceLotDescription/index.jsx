import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import LotDescription from 'backend/js/views/_Shared/Micro/LotDescription';
import ReactQueryProvider from 'backend/js/providers/ReactQueryProvider';
import TranslationProvider from 'backend/js/providers/TranslationProvider';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import ShippingInformation from '../../Bid/CounterBid/BidsTable/ShippingInformation';

function InvoiceLotDescription({ lot, lotPurchase, customer, bid, shippingOrder }) {
  return (
    <>
      <ThemeProvider>
        <TranslationProvider>
          <ReactQueryProvider>
            <LotDescription
              lot={lot}
              lotPurchase={lotPurchase}
              customer={customer}
              isVisibleSaleData={false}
              shippingOrder={shippingOrder}
            />
            <ShippingInformation bid={bid} />
          </ReactQueryProvider>
        </TranslationProvider>
      </ThemeProvider>
    </>
  );
}

InvoiceLotDescription.propTypes = {
  lot: PropTypes.object,
  lotPurchase: PropTypes.object,
  customer: PropTypes.object,
  bid: PropTypes.object,
  shippingOrder: PropTypes.object,
};

InvoiceLotDescription.defaultProps = {
  lot: {},
  lotPurchase: {},
  customer: {},
  bid: {},
  shippingOrder: {},
};

const $elements = document.getElementsByClassName('invoice-lot-description');

if ($elements.length > 0) {
  for (let i = 0; i < $elements.length; i++) {
    const $element = $elements.item(i);
    const lot = $element.dataset.lot ? JSON.parse($element.dataset.lot) : {};
    const lotPurchase = $element.dataset.lotPurchase ? JSON.parse($element.dataset.lotPurchase) : {};
    const customer = $element.dataset.customer ? JSON.parse($element.dataset.customer) : {};
    const bid = $element.dataset.bid ? JSON.parse($element.dataset.bid) : {};
    const shippingOrder = $element.dataset.shippingOrder ? JSON.parse($element.dataset.shippingOrder) : {};

    ReactDOM.render(
      <InvoiceLotDescription
        lot={lot}
        lotPurchase={lotPurchase}
        customer={customer}
        bid={bid}
        shippingOrder={shippingOrder}
      />,
      $element,
    );
  }
}

export default InvoiceLotDescription;
