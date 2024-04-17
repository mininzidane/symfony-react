import React from 'react';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ShippingCalculator from 'frontend/js/views/Shared/ShippingCalculator';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function CalculatorSection() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <FormattedMessage id="autoShippingInternationalPage.placeShippingOrder" />
        </div>

        <div id="shipping-calculator-container">
          <ShippingCalculator
            isMobileView={isBelowSm}
            defaultValues={{
              lotIdOrVin: ShippingCalculator.DEFAULT_LOT_ID,
              source: 'intl_page_preorder',
              auction: null,
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default CalculatorSection;
