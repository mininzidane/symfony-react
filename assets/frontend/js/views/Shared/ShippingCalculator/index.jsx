import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, useTheme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl-phraseapp';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Stepper from 'frontend/js/components/Stepper';
import Calculator from './Calculator';
import CompleteOrder from './CompleteOrder';
import OrderPlaced from './OrderPlaced';

const STEPPER_ID = 'shipping-stepper';

function ShippingCalculator({ isMobileView, defaultValues }) {
  const { isAuthenticated } = useCustomerHelper(window.customer);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const outerTheme = useTheme();
  const theme = useMemo(
    () =>
      createTheme({
        ...outerTheme,
        isMobileView,
      }),
    [outerTheme, isMobileView],
  );

  function changeStep(number) {
    setStep(number);

    const $el = document.getElementById(STEPPER_ID);
    if (ViewportService.isElementAboveHeader($el)) {
      ScrollService.scrollIntoViewById(STEPPER_ID);
    }
  }

  function handleOrderIntent(lotId, auction, quote) {
    if (lotId && auction && quote) {
      setData({ lotId, auction, quote });
      changeStep(1);
    }
  }

  return (
    <div className="wide">
      <ThemeProvider theme={theme}>
        {!isAuthenticated && (
          <Stepper
            className="mb-20"
            active={step}
            steps={[
              <FormattedMessage id="shippingCalculator.step1" />,
              <FormattedMessage id="shippingCalculator.step2" />,
              <FormattedMessage id="shippingCalculator.step3" />,
            ]}
            id={STEPPER_ID}
          />
        )}

        {step === 0 && (
          <Calculator onOrderIntent={handleOrderIntent} isMobileView={isMobileView} defaultValues={defaultValues} />
        )}
        {step === 1 && (
          <CompleteOrder onSuccess={() => changeStep(2)} lotId={data.lotId} auction={data.auction} quote={data.quote} />
        )}
        {step === 2 && <OrderPlaced setStep={setStep} />}
      </ThemeProvider>
    </div>
  );
}

ShippingCalculator.DEFAULT_LOT_ID = 64352661;

ShippingCalculator.defaultProps = {
  defaultValues: {
    source: null,
  },
  isMobileView: false,
};

ShippingCalculator.propTypes = {
  defaultValues: PropTypes.shape({}),
  isMobileView: PropTypes.bool,
};

export default ShippingCalculator;
