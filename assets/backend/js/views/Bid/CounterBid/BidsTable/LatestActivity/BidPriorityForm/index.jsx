import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import BidPriorityTag from 'backend/js/views/_Shared/Tags/BidPriorityTag';
import useCounterBidContext from 'backend/js/views/Bid/CounterBid/_Context/useCounterBidContext';

function BidPriorityForm({ bid }) {
  const { handlePriorityUpdate, enableRefresh, disableRefresh } = useCounterBidContext();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      priority: bid.priority,
    },
    onSubmit: async (values, { setSubmitting, setFieldValue }) => {
      setSubmitting(true);
      disableRefresh();
      try {
        await handlePriorityUpdate(bid, values);

        enqueueSnackbar('Bid priority updated', { variant: 'success' });
      } catch (e) {
        setFieldValue('priority', bid.priority);
        enqueueSnackbar('An error occurred while updating bid priority', { variant: 'error' });
      }

      setSubmitting(false);
      enableRefresh();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>Priority:</div>
      <BidPriorityTag
        bidId={bid.id}
        priority={formik.values.priority}
        onChange={(name, value) => {
          formik.setFieldValue(name, value);
          (async () => {
            await formik.submitForm();
          })();
        }}
        disabled={formik.isSubmitting}
        onBlur={formik.setFieldTouched}
        onMenuOpen={disableRefresh}
        onMenuClose={enableRefresh}
      />
    </form>
  );
}

BidPriorityForm.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default BidPriorityForm;
