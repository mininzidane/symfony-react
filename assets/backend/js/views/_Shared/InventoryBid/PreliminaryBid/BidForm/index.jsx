import React, { useState } from 'react';
import { useFormik } from 'formik';
import useBidDelta from 'backend/js/hooks/useBidDelta';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import FeesCalculator from '../../_Shared/FeesCalculator';
import useStyles from './useStyles';

function BidForm() {
  const { inventoryItem, customer, submitBid, submitLiveBid } = useBidContext();
  const { highBid, startingBid, currentBid, prebiddingClosed, auctionInProgress, inventoryAuction } = inventoryItem;

  const startAmount = startingBid && startingBid > highBid ? startingBid : highBid;
  const currentBidDelta = useBidDelta(startAmount, inventoryAuction);
  const minValue = startAmount + currentBidDelta.increment;
  const [amount, setAmount] = useState(minValue);

  const [startBid, setStartBid] = useState(startingBid);
  const startBidAvailable = Boolean(!prebiddingClosed && startingBid > 0 && currentBid === 0);
  const minStartValue = startAmount + currentBidDelta.increment;

  const bidDelta = useBidDelta(amount, inventoryAuction);
  const startBidDelta = useBidDelta(startBid, inventoryAuction);
  const isLiveBid = auctionInProgress || prebiddingClosed;
  const classes = useStyles();

  const initialValues = { amount };
  if (startBidAvailable) {
    initialValues.startAmount = startBid;
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      if (isLiveBid) {
        await submitLiveBid(values);
      } else {
        await submitBid(values);
      }

      setSubmitting(false);
    },
  });

  function updateStartBid(value) {
    if (!startBidAvailable) {
      return;
    }

    if (value > amount) {
      setAmount(value);
    }

    setStartBid(value);
  }

  function updateBid(value) {
    if (startBidAvailable) {
      if (value < startBid && value >= minStartValue) {
        setStartBid(value);
      }
    }

    setAmount(value);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {startBidAvailable && (
          <div className="row mb-15">
            <div className="col-lg-4">
              <h4 className={classes.bidLabel}>Start Bid</h4>
            </div>
            <div className="col-lg-8">
              <BidInformationInput
                onChange={updateStartBid}
                value={startBid}
                minValue={minStartValue}
                delta={startBidDelta}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-4">
            <div>
              <h4 className={classes.bidLabel}>Place your bid</h4>
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
                onChange={updateBid}
                value={amount}
                minValue={minValue}
                displayCurrencyGroup
              />
              <SubmitButton
                label={isLiveBid ? 'Place Live Bid' : 'Place Bid'}
                className="btn btn-primary"
                isLoading={formik.isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default BidForm;
