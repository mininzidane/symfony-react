/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import useIntl from 'frontend/js/hooks/useIntl';
import Amount from 'frontend/js/components/Amount';
import ContentPopover from 'frontend/js/components/ContentPopover';
import NumberService from 'frontend/js/lib/utils/NumberService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function QuoteDetails({ quote, ...props }) {
  const intl = useIntl();
  const classes = useStyles(props);
  const { formatCurrency } = NumberService;

  const translationSets = {
    shippingQuote: intl.formatMessage({ id: 'shippingCalculator.completeOrder.quote.shippingQuote' }),
    shippingCost: intl.formatMessage({ id: 'shared.fee.shippingCost' }),
    sailingTime: intl.formatMessage({ id: 'shared.label.sailTime' }),
    estimatedDelivery: intl.formatMessage({ id: 'shippingCalculator.completeOrder.quote.estimatedDelivery' }),
    groundTransportation: intl.formatMessage({ id: 'shippingCalculator.completeOrder.quote.groundTransportation' }),
    oceanTransportation: intl.formatMessage({ id: 'shippingCalculator.completeOrder.quote.oceanTransportation' }),
    shippingCostIntlTooltip: intl.formatMessage({ id: 'shipping.shippingCost.intlShipping.tooltip' }),
    total: intl.formatMessage({ id: 'shared.label.total' }),
    peakSeasonFee: intl.formatMessage({ id: 'shippingCalculator.peakSeasonFee' }),
  };
  const { total = 0, ground: groundCost = 0, ocean: oceanCost = 0 } = (quote && quote.quote) || {};
  const { ground = '', ocean = '' } = (quote && quote.transit) || {};
  const isInternational = quote && quote.type === ShippingOrderService.TypeInternational;

  function getTotalCharges() {
    const additionalCharges = get(quote, 'additionalCharges.total', 0);
    return additionalCharges + total + Object.values(quote?.fees || {}).reduce((acc, curr) => acc + curr, 0);
  }

  return (
    <div className={classes.root}>
      <div className={classes.details}>
        <ContentPopover
          trigger={
            <button type="button" className={classes.trigger}>
              {translationSets.shippingQuote}&nbsp;
              <span className={classes.currency}>
                <span>(USD)</span>&nbsp;{' '}
                <svg
                  width="8"
                  height="4"
                  viewBox="0 0 8 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.triggerTriangle}
                >
                  <path d="M6 0H0L3 3L6 0Z" />
                </svg>
              </span>
            </button>
          }
          isInline
          popoverTitle={
            <div>
              {translationSets.shippingCost}
              {isInternational && <TooltipOnHover badgeTop={-1} content={translationSets.shippingCostIntlTooltip} />}
            </div>
          }
          popoverClass={classes.popover}
          activeTriggerClassName="is-active"
          offsetTop={5}
          popoverOptions={{ placement: 'bottom-start' }}
        >
          <div className={classes.shippingCost}>
            <div>{translationSets.groundTransportation}</div>
            <div className="is-amount">{formatCurrency(groundCost)} USD</div>
            {ocean && (
              <>
                <div>{translationSets.oceanTransportation}</div>
                <div className="is-amount">{formatCurrency(oceanCost)} USD</div>
              </>
            )}
            {quote.fees?.peakSeasonFee && (
              <>
                <div>{translationSets.peakSeasonFee}</div>
                <div className="is-amount">{formatCurrency(quote.fees.peakSeasonFee)} USD</div>
              </>
            )}
            <hr />
            <div>{translationSets.total}</div>
            <div className="is-amount">
              <strong>{formatCurrency(getTotalCharges())}</strong> USD
            </div>
          </div>
        </ContentPopover>

        <div className={classes.deliveryTime}>
          {isInternational ? (
            <>
              {translationSets.sailingTime} {ocean}
            </>
          ) : (
            <>
              {translationSets.estimatedDelivery} {ground}
            </>
          )}
        </div>
      </div>

      <div className={classes.price}>
        <Amount value={getTotalCharges()} hasCurrency />
      </div>
    </div>
  );
}

QuoteDetails.defaultProps = {
  quote: null,
};

QuoteDetails.propTypes = {
  quote: PropTypes.shape({
    quote: PropTypes.shape({
      total: PropTypes.number,
      ground: PropTypes.number,
      ocean: PropTypes.number,
    }),
    transit: PropTypes.shape({
      ocean: PropTypes.string,
      ground: PropTypes.string,
    }),
    type: PropTypes.string,
    fees: PropTypes.objectOf(PropTypes.number),
  }),
};

export default QuoteDetails;
