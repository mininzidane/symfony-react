import React, { useState } from 'react';
import { useFormik } from 'formik';
import useBidDelta from 'backend/js/hooks/useBidDelta';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import FeesCalculator from '../../_Shared/FeesCalculator';
import useStyles from './useStyles';

function CounterBidForm() {
  const { inventoryItem, customer, currentBid, increaseCounterBid } = useBidContext();
  const { inventoryAuction } = inventoryItem;
  const { currentBid: currentCustomerBid } = currentBid;

  const currentBidDelta = useBidDelta(currentCustomerBid, inventoryAuction);
  const minValue = currentCustomerBid + currentBidDelta.increment;
  const [amount, setAmount] = useState(minValue);
  const bidDelta = useBidDelta(amount, inventoryAuction);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      amount,
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      await increaseCounterBid(values);

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-lg-4">
          <div>
            <h4 className={classes.bidLabel}>Counterbid</h4>
            <div className="subtitle">(${bidDelta.increment}) Bid increment</div>
            <FeesCalculator
              inventoryItem={inventoryItem}
              customer={customer}
              amount={amount}
              triggerLabel="Fee Calculator"
              triggerClass={classes.feeCalculatorTrigger}
            />
          </div>
        </div>
        <div className="col-lg-8">
          <div className={classes.bidInput}>
            <BidInformationInput
              delta={bidDelta}
              onChange={(value) => setAmount(value)}
              value={amount}
              minValue={minValue}
              displayCurrencyGroup
            />
            <SubmitButton label="Increase Bid" className="btn btn-primary" isLoading={formik.isSubmitting} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CounterBidForm;
