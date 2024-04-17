import React, { useState } from 'react';
import { useFormik } from 'formik';
import useBidDelta from 'backend/js/hooks/useBidDelta';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import useStyles from './useStyles';

function MakeAnOfferForm() {
  const { inventoryItem, submitMakeAnOffer } = useBidContext();
  const { makeAnOffer, buyItNow, prebiddingClosed, highBid, inventoryAuction } = inventoryItem;
  const classes = useStyles();
  if (prebiddingClosed || (!buyItNow && !makeAnOffer)) {
    return false;
  }

  const currentBidDelta = useBidDelta(highBid, inventoryAuction);
  const minValue = makeAnOffer + currentBidDelta.increment;
  const [amount, setAmount] = useState(minValue);
  const bidDelta = useBidDelta(amount, inventoryAuction);

  const formik = useFormik({
    initialValues: {
      amount,
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await submitMakeAnOffer(values);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mt-15">
        <div className="col-sm-2">
          <label className="mb-0" htmlFor="makeAnOffer">
            Amount
          </label>
        </div>
        <div className="col-sm-10">
          <div className={classes.bidInput}>
            <BidInformationInput
              delta={bidDelta}
              onChange={(value) => setAmount(value)}
              value={amount}
              minValue={minValue}
              displayCurrencyGroup
            />
            <SubmitButton label="Make An Offer" className="btn btn-primary" isLoading={formik.isSubmitting} />
          </div>
          <div className="subtitle">(${bidDelta.increment}) Bid increment</div>
        </div>
      </div>
    </form>
  );
}

export default MakeAnOfferForm;
