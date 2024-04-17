import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ContentPopover from 'frontend/js/components/ContentPopover';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import RouterService from 'frontend/js/api/RouterService';
import OrderShippingForm from './OrderShippingForm';

function OrderShipping({ onOrderIntent }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated } = useCustomerHelper(window.customer);
  const { refinements, values } = useContext(CalculatorContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { lot, shipping, source, additionalCharges = {} } = values;
  const shippingQuote = shipping.quote;
  const isDisabled = !lot || !shippingQuote;

  useEffect(() => {
    setIsSubmitted(false);
  }, [shippingQuote, lot]);

  function getShippingQuotePayload() {
    return {
      ...shippingQuote,
      additionalCharges,
    };
  }

  function handleOrderIntent() {
    const queryParams = RouterService.serializeQueryParams(refinements);
    const url = `${window.location.pathname}?${queryParams}${window.location.hash}`;
    window.history.pushState(null, '', url);

    onOrderIntent(lot.id, lot.inventoryAuction, getShippingQuotePayload());
  }

  function handleOrderSuccess() {
    setIsSubmitted(true);
    enqueueSnackbar(intl.formatMessage({ id: 'shipping.shippingOrderHasBeenPlaced' }), { variant: 'success' });
  }

  if (!isAuthenticated) {
    return (
      <Button
        label={<FormattedMessage id="shipping.orderShipping" />}
        onClick={handleOrderIntent}
        isDisabled={isDisabled}
        isShadowless={isDisabled}
      />
    );
  }

  if (isSubmitted) {
    return <Button label="VIEW MY ORDER" href={RouterService.getRoute('lotsWon')} />;
  }

  if (isDisabled) {
    return <Button label={<FormattedMessage id="shipping.orderShipping" />} isDisabled isShadowless />;
  }

  return (
    <ContentPopover
      trigger={<Button label={<FormattedMessage id="shipping.orderShipping" />} />}
      popoverTitle={intl.formatMessage({ id: 'shipping.confirmShippingOrder' })}
      keepMounted={false}
    >
      <OrderShippingForm onSuccess={handleOrderSuccess} lotId={lot.id} auction={lot.inventoryAuction} source={source} />
    </ContentPopover>
  );
}

OrderShipping.propTypes = {
  onOrderIntent: PropTypes.func.isRequired,
};

export default OrderShipping;
