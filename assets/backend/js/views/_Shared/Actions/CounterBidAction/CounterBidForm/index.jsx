import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import NumberService from 'backend/js/lib/utils/NumberService';
import SubmitButton from 'backend/js/components/SubmitButton';
import BidInput from 'backend/js/views/_Shared/BidInput';
import { TYPE_INCREASE_BID } from 'backend/js/views/_Shared/Actions/CounterBidAction/types';
import useBidDelta from 'backend/js/hooks/useBidDelta';
import CounterBidValidationSchema from './CounterBidValidationSchema';
import useStyles from './useStyles';

function CounterBidForm({ bid, onIncrementUpdate, onSubmit }) {
  const { currentBid, auction } = bid;
  const currentBidDelta = useBidDelta(currentBid, auction);
  const minValue = currentBid + currentBidDelta.increment;

  const [newBid, setNewBid] = useState(minValue);
  const bidDelta = useBidDelta(newBid, auction);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      newBid,
    },
    enableReinitialize: true,
    validationSchema: CounterBidValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        type: TYPE_INCREASE_BID,
        amount: values.newBid,
      };

      onSubmit(payload);
    },
  });

  function handleBidChange(value) {
    setNewBid(value);
  }

  useEffect(() => {
    onIncrementUpdate(bidDelta.increment);
  }, [newBid]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.input}>
          <BidInput
            onChange={handleBidChange}
            value={formik.values.newBid}
            delta={bidDelta}
            onBlur={() => {
              formik.setFieldTouched('newBid', true);
            }}
            minValue={minValue}
          />
        </div>

        <div className={classes.submitWrapper}>
          <span className={classes.minValue}>({NumberService.formatCurrency(minValue)} min)</span>
          <SubmitButton className="btn btn-primary" label="Increase Bid" disabled={formik.errors.newBid} />
        </div>
      </form>
    </>
  );
}

CounterBidForm.propTypes = {
  bid: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onIncrementUpdate: () => null,
};

CounterBidForm.defaultProps = {
  onSubmit: () => null,
  onIncrementUpdate: () => null,
};

export default CounterBidForm;
