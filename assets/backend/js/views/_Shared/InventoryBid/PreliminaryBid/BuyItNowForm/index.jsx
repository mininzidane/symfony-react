import React from 'react';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import useStyles from './useStyles';

function BuyItNowForm() {
  const { inventoryItem, submitBuyItNow } = useBidContext();
  const { buyItNow, prebiddingClosed } = inventoryItem;
  const classes = useStyles();
  if (prebiddingClosed || !buyItNow) {
    return null;
  }

  const formik = useFormik({
    initialValues: {
      buyItNow,
    },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      await submitBuyItNow(inventoryItem);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mt-15">
        <div className="col-sm-2">
          <label htmlFor="buyItNow">Amount</label>
        </div>
        <div className="col-sm-10">
          <div className={classes.bidInput}>
            <BidInformationInput
              delta={{ increment: 0, decrement: 0 }}
              onChange={() => null}
              value={buyItNow}
              minValue={buyItNow}
              disabled
              displayCurrencyGroup
            />
            <SubmitButton label="Buy It Now" className="btn btn-primary" isLoading={formik.isSubmitting} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default BuyItNowForm;
