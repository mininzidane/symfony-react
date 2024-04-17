import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Loader from 'frontend/js/views/Shared/Loader';
import Alert from 'frontend/js/components/Form/Alert';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Card from '../../Card';
import useOrderInfo from '../../useOrderInfo';
import OrderInfo from './OrderInfo';
import CompleteOrder from './CompleteOrder';
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';
import useQuote from './useQuote';

function Checkout({ onSuccess }) {
  const { isBelowSm } = useBreakpoint();
  const { quote, isLoading, isRequestError } = useQuote();
  const { isInternational, lotId, vin, destination, origin, ymm, vehicleImage, estDelivery, price } =
    useOrderInfo(quote);

  if (isLoading) {
    return <Loader minHeight={168} />;
  }

  if (isRequestError || !quote || !isInternational) {
    return (
      <Alert isShown severity="error">
        <FormattedMessage id="shared.label.error" />: <FormattedMessage id="shared.label.quoteNotFound" />
      </Alert>
    );
  }

  return (
    <>
      <OrderInfo
        destination={destination}
        ymm={ymm}
        vehicleImage={vehicleImage}
        origin={origin}
        lotId={lotId}
        vin={vin}
      />

      <Card
        title={<FormattedMessage id="checkoutIntlShippingPage.form.completeYourShippingOrder" />}
        hasPadding={false}
        id="place-order-card"
      >
        <CompleteOrder lotId={lotId} quote={quote} onSuccess={onSuccess} />
      </Card>

      {isBelowSm && (
        <>
          <MobileFooter currency="USD" estDelivery={estDelivery} price={price} />
          <MobileHeader ymm={ymm} />
        </>
      )}
    </>
  );
}

Checkout.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Checkout;
