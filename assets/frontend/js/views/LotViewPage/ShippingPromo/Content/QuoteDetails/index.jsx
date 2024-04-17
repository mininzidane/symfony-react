/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import get from 'lodash/get';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import ShippingQuoteContextProvider from 'frontend/js/context/ShippingQuoteContext';
import CustomQuote from './CustomQuote';
import Preorder from './Preorder';
import RouteSection from './RouteSection';
import useStyles from './useStyles';

function QuoteDetails({ lot }) {
  const classes = useStyles();
  const { shippingQuote, requiresCustomQuote, getState } = useContext(ShippingQuoteContext);

  if (!requiresCustomQuote && !shippingQuote) {
    return null;
  }

  if (requiresCustomQuote) {
    return (
      <div className="mt-10">
        <ShippingQuoteContextProvider values={getState()}>
          <CustomQuote lot={lot} />
        </ShippingQuoteContextProvider>
      </div>
    );
  }

  const { transit, quote, destination, us_port } = shippingQuote;

  return (
    <>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <FormattedMessage id="lotPage.shipping.transitTime" />:
          <div>
            {transit.ground}
            <TooltipOnHover
              badgeTop={-1}
              maxWidth={320}
              isFlipEnabled={false}
              content={<FormattedMessage id="lotPage.shipping.transitTime.tooltip" />}
            />
          </div>
        </div>
        {transit.ocean && (
          <div className={classes.stat}>
            <FormattedMessage id="shared.label.sailTime" />:
            <div>
              {transit.ocean}
              <TooltipOnHover
                badgeTop={-1}
                maxWidth={320}
                isFlipEnabled={false}
                content={<FormattedMessage id="lotPage.shipping.sailTime.tooltip" />}
              />
            </div>
          </div>
        )}

        {us_port && (
          <div className={classes.priceDesc}>
            <RouteSection from={lot.physicalLocationName} to={us_port.name} price={quote.ground} />
            <RouteSection
              from={us_port.name}
              to={`${destination.name}, ${get(destination, 'country.iso_2')}`}
              price={quote.ocean}
            />
          </div>
        )}

        <div className={classes.stat}>
          <FormattedMessage id="shipping.shippingQuote" />:
          <div className={classes.total}>
            <strong>{NumberService.formatCurrency(quote.total)}</strong> USD
          </div>
        </div>
      </div>

      <Preorder lot={lot} />
    </>
  );
}

export default QuoteDetails;
