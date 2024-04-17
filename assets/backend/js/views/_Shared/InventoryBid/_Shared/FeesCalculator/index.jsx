/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';
import useBidFeeCalculator from 'frontend/js/hooks/useBidFeeCalculator';
import ButtonLink from 'backend/js/components/ButtonLink';
import TooltipOnHover from 'backend/js/components/TooltipOnHover';
import LotService from 'backend/js/api/LotService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import FeeRow from './FeeRow';
import useStyles from './useStyles';

function FeesCalculator({ inventoryItem, amount, customer, triggerLabel, triggerClass }) {
  const classes = useStyles();
  const [fees, setFees] = useState({});
  const [loading, setLoading] = useState(false);
  const { id: lotId, currency, inventoryAuction } = inventoryItem;

  const customerId = get(customer, 'id');
  const customerCountryId = get(customer, 'country.id');

  const {
    copartAuctionFees,
    transactionFee,
    documentationFee,
    intlWirePaymentFee,
    hasStateTax,
    stateTax,
    surtax,
    gstFee,
    hstFee,
    total,
  } = useBidFeeCalculator(fees, amount, customerCountryId);

  function handleOpen() {
    if (!isEmpty(fees) || loading) {
      return;
    }

    setLoading(true);

    LotService.getFees(lotId, customerId, inventoryAuction)
      .then((data) => setFees(data.fees))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  return (
    <TooltipOnHover
      onOpen={handleOpen}
      trigger={
        <div>
          <ButtonLink isDashed label={triggerLabel} className={classnames('mt-5', triggerClass)} />
        </div>
      }
      className={classes.tooltip}
      placement="bottom-start"
      content={
        <>
          {loading ? (
            <SpinnerWheel size={24} thickness={2} className="is-centered" />
          ) : (
            <div>
              <FeeRow label="Final Bid" value={amount} currency={currency} />

              <FeeRow label="HST tax" value={hstFee} currency={currency} />

              <FeeRow label="GST tax" value={gstFee} currency={currency} />

              <FeeRow label="Copart Auction Fees" value={copartAuctionFees} currency={currency} />

              <FeeRow label="Autobidmaster Transaction Fee" value={transactionFee} currency={currency} />

              <FeeRow label="Documentation Fee" value={documentationFee} currency={currency} />

              <FeeRow label="International Wire Payment" value={intlWirePaymentFee} currency={currency} />

              {hasStateTax === true && (
                <>
                  <FeeRow label={`${fees.salesTaxState} Sales Tax`} value={stateTax} currency={currency} />

                  <FeeRow label="Discretionary Surtax" value={surtax} currency={currency} />
                </>
              )}

              <div className={classes.separator} />

              <FeeRow label="Total" value={total} className="fw-7" currency={currency} />
            </div>
          )}
        </>
      }
    />
  );
}

FeesCalculator.defaultProps = {
  triggerLabel: 'Final Price Estimator',
  triggerClass: '',
};

export default FeesCalculator;
