import React from 'react';
import { useFormik } from 'formik';
import SubmitButton from 'backend/js/components/SubmitButton';
import useBidContext from '../../_Context/useBidContext';
import BidInformationInput from '../../_Shared/BidInformationInput';
import useStyles from './useStyles';

function SellersMinForm() {
  const { inventoryItem, acceptMinimumBid } = useBidContext();
  const { minimumBid } = inventoryItem;
  if (!minimumBid) {
    return null;
  }

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      await acceptMinimumBid();

      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-sm-4">
          <label htmlFor="sellerMin">Seller&apos;s Min</label>
        </div>

        <div className="col-sm-8">
          <div className={classes.bidInput}>
            <BidInformationInput
              delta={{ increment: 0, decrement: 0 }}
              onChange={() => null}
              value={minimumBid}
              minValue={minimumBid}
              disabled
              displayCurrencyGroup
            />
            <SubmitButton className="btn-primary" label="Accept Minimum" isLoading={formik.isSubmitting} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SellersMinForm;
