import React from 'react';
import classnames from 'classnames';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import { useLotWonContext } from 'frontend/js/context/LotWonContext';
import ShippingQuote from './ShippingQuote';
import useStyles from './useStyles';

function CtaSecondary() {
  const classes = useStyles();
  const { invoice } = useLotWonContext();
  const { lotPurchase } = invoice;
  const isLotPurchase = Boolean(lotPurchase);

  if (!isLotPurchase) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        {lotPurchase.activeShippingOrder || lotPurchase.cancelledAndUnpaidShippingOrder || !lotPurchase.pickedUp ? (
          <ShippingQuote />
        ) : (
          <>
            {lotPurchase.pickedUp && (
              <div className={classnames(classes.ctaStatus, 'is-gray')}>
                <FormattedMessage
                  id="shipping.status.lotPickedUpOn"
                  values={{ datePickedUp: DateTimeService.formatFromISOString(lotPurchase.pickedUp) }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CtaSecondary;
