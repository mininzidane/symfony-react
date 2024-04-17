import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import { useShippingContext } from 'backend/js/context/ShippingContext';
import NumberService from 'backend/js/lib/utils/NumberService';
import Tickbox from 'backend/js/components/Form/FormikTickbox';
import ButtonLink from 'backend/js/components/ButtonLink';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import useBidContext from '../_Context/useBidContext';
import ShippingLocationForm from '../../Forms/ShippingLocationForm';

function ShippingPreorder() {
  const { currentBid, allowShippingPreorder, preorderEnabled, updateShippingPreorder } = useBidContext();
  if (!allowShippingPreorder) {
    return null;
  }

  const {
    destination,
    shippingQuote,
    getShipToLabel,
    isQuoteValid,
    isQuoteInformationValid,
    getPreorderParams,
    triggerQuoteUpdate,
  } = useShippingContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeShippingPreorder } = currentBid || {};
  const preorderTotal = get(activeShippingPreorder, 'orderInformation.quote.quote.total');
  const preorderDestination = get(activeShippingPreorder, 'destination');
  const quoteTotal = get(shippingQuote, 'quote.total');

  function handleOnModalClose() {
    setIsModalOpen(false);
  }

  function updateShippingAddress() {
    setIsModalOpen(true);
  }

  useEffect(() => {
    if (isQuoteInformationValid && !activeShippingPreorder) {
      triggerQuoteUpdate();
    }
  }, [destination, isQuoteInformationValid]);

  return (
    <>
      <div>
        {activeShippingPreorder ? (
          <>
            <div>
              Order placed for <b>{NumberService.formatCurrency(preorderTotal)} USD</b>&nbsp;to {preorderDestination}
            </div>
          </>
        ) : (
          <>
            <Tickbox
              id="bid-shipping-preorder"
              name="preorderShipping"
              onChange={(name, value) => {
                if (isQuoteValid && value) {
                  updateShippingPreorder(getPreorderParams(), true);
                } else {
                  updateShippingPreorder(null, false);
                }
              }}
              value={preorderEnabled}
            >
              {isQuoteValid ? (
                <>
                  Order Shipping: <b>{NumberService.formatCurrency(quoteTotal)}</b> USD
                </>
              ) : (
                <>Quote unavailable</>
              )}
            </Tickbox>

            <div>
              To:&nbsp;
              <ButtonLink label={getShipToLabel()} onClick={updateShippingAddress} />
            </div>
          </>
        )}
      </div>

      <ModalWindow onClose={handleOnModalClose} isOpen={isModalOpen} size="lg">
        <ModalWindowHeader title="Update Shipping Address" onClose={handleOnModalClose} />
        <ModalWindowBody>
          <ShippingLocationForm onLocationUpdate={handleOnModalClose} />
        </ModalWindowBody>
      </ModalWindow>
    </>
  );
}

export default ShippingPreorder;
