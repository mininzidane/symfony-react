import React from 'react';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import useStyles from './useStyles';

function KeepCurrentForm() {
  const { currentBid, keepCurrentBid } = useBidContext();
  const { currentBid: amount } = currentBid;
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      await keepCurrentBid();

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-sm-4">
          <label htmlFor="keepBid">Current Bid</label>
        </div>
        <div className="col-sm-8">
          <div className={classes.bidInput}>
            <BidInformationInput
              delta={{ increment: 0, decrement: 0 }}
              onChange={() => null}
              value={amount}
              minValue={amount}
              disabled
              displayCurrencyGroup
            />
            <SubmitButton className="btn-primary" label="Keep Current Bid" isLoading={formik.isSubmitting} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default KeepCurrentForm;
