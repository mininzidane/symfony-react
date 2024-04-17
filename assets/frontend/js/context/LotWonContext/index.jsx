import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ShippingQuoteContextProvider from 'frontend/js/context/ShippingQuoteContext';
import useShippingOrder from './helpers/useShippingOrder';
import useShippingStatus from './helpers/useShippingStatus';

const LotWonContext = createContext();

const LotWonContextProvider = ({ invoice, children }) => {
  const { paid, amountApplied, balanceRemaining } = invoice;

  const shippingStatus = useShippingStatus();
  const shippingOrder = useShippingOrder(invoice);

  const amountAppliedShipping = get(shippingOrder, 'shippingOrder.invoice.amountApplied', null);
  const balanceRemainingShipping = get(shippingOrder, 'shippingOrder.invoice.balanceRemaining', null);

  const isCombineShippingWithLotPurchase =
    parseFloat(amountApplied, 10) === 0 && parseFloat(amountAppliedShipping, 10) === 0;

  const invoiceAmount = parseFloat(paid ? amountApplied : balanceRemaining, 10);
  const invoiceAmountShipping = parseFloat(balanceRemainingShipping, 10);
  const total = invoiceAmount + (isCombineShippingWithLotPurchase ? invoiceAmountShipping : 0);

  return (
    <LotWonContext.Provider
      value={{
        amount: total,
        invoice,
        isCombineShippingWithLotPurchase,
        shippingOrder,
        shippingStatus,
      }}
    >
      <ShippingQuoteContextProvider>{children}</ShippingQuoteContextProvider>
    </LotWonContext.Provider>
  );
};

LotWonContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  invoice: PropTypes.object.isRequired,
};

function useLotWonContext() {
  return useContext(LotWonContext);
}

export { LotWonContextProvider, useLotWonContext };
