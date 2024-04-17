import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import get from 'lodash/get';
import useCatalogInventoryItem from 'backend/js/hooks/useCatalogInventoryItem';
import debounce from 'lodash/debounce';
import ValidationService from 'frontend/js/lib/utils/ValidationService';
import SpinnerWheel from '../../../components/SpinnerWheel';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import WonBidFakerFormValidationSchema from './WonBidFakerFormValidationSchema';
import SubmitButton from '../../../components/SubmitButton';

function WonBidFakerForm({ bidders, onSubmit, onSubmitSuccess, onSubmitError, setFlash }) {
  const [lotId, setLotId] = useState('');
  const [lots, isLoading] = useCatalogInventoryItem(lotId);
  const [value, setValue] = useState(lotId);

  const TYPE_PRELIMINARY = 'Preliminary';
  const TYPE_BUY_IT_NOW = 'Buy It Now';
  const TYPE_MAKE_AN_OFFER = 'Make an Offer';
  const TYPE_LIVE_SALE = 'Live Sale';
  const TYPE_COUNTER_BID = 'Counter Bid';

  const BID_LOG_TYPES = [TYPE_PRELIMINARY, TYPE_BUY_IT_NOW, TYPE_MAKE_AN_OFFER, TYPE_LIVE_SALE, TYPE_COUNTER_BID];

  const BID_LOG_TYPES_OPTIONS = BID_LOG_TYPES.map((v) => ({ value: v, label: v }));

  useEffect(() => {
    if (lotId && !isLoading) {
      if (lots) {
        setFlash({ message: 'Lot found', type: 'success' });
      } else {
        setFlash({ message: 'Lot not found', type: 'error' });
      }
    }
  }, [lotId, isLoading]);

  const debounced = useCallback(
    debounce(
      (v) => {
        setLotId(ValidationService.validateStockNumber(v) ? String(v) : '');
      },
      600,
      { leading: true },
    ),
    [],
  );

  function handleChange(v) {
    setValue(v);
    debounced(v);
  }

  async function onFormSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    try {
      const payload = { ...values, lotId };
      await onSubmit(payload);
      onSubmitSuccess();
    } catch (serverError) {
      const defaultMessage = 'An error occurred while processing this request.';
      let messages = null;
      if (serverError) {
        const errors = get(serverError, 'response.data.errors.errors', {});
        messages = Object.values(errors).join(' ');
      }
      onSubmitError(messages || defaultMessage);
    }

    setSubmitting(false);
  }

  return (
    <>
      <Formik
        initialValues={{
          lotId,
          price: '',
          bidderId: '',
          email: '',
          bidLogAttempts: 1,
          bidLogStepPercent: 10,
          bidLogTypes: [],
        }}
        validationSchema={WonBidFakerFormValidationSchema}
        onSubmit={onFormSubmit}
      >
        {({ values, touched, errors, setFieldValue, setFieldTouched, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                {isLoading ? (
                  <SpinnerWheel isCentered size={40} thickness={3} />
                ) : (
                  <Input
                    id="lotId"
                    label="Lot Id"
                    name="lotId"
                    className="required"
                    value={value}
                    error={errors.lotId}
                    touched={touched.lotId}
                    onBlur={setFieldTouched}
                    onChange={(_, v) => handleChange(v)}
                  />
                )}
              </div>
              <div className="col-lg-6">
                <Input
                  id="price"
                  label="Price"
                  name="price"
                  className="required"
                  value={values.price}
                  error={errors.price}
                  touched={touched.price}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Select
                  id="bidderId"
                  label="Bidder ID"
                  name="bidderId"
                  className="required"
                  value={values.bidderId}
                  error={errors.bidderId}
                  touched={touched.bidderId}
                  options={bidders.map((item) => ({
                    value: item.id,
                    label: `#${item.id} ${item.email}`,
                  }))}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  id="email"
                  label="Customer Email"
                  name="email"
                  className="required"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Input
                  id="bidLogAttempts"
                  label="Bid Log Attempts"
                  name="bidLogAttempts"
                  value={values.bidLogAttempts}
                  error={errors.bidLogAttempts}
                  touched={touched.bidLogAttempts}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
              <div className="col-lg-6">
                <Input
                  id="bidLogStepPercent"
                  label="Bid Log Step Percent"
                  name="bidLogStepPercent"
                  value={values.bidLogStepPercent}
                  error={errors.bidLogStepPercent}
                  touched={touched.bidLogStepPercent}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
              </div>
            </div>
            <div className="row m-b-lg">
              <div className="col-lg-6">
                <Select
                  id="bidLogTypes"
                  label="Bid Log Types"
                  name="bidLogTypes"
                  value={values.bidLogTypes}
                  error={errors.bidLogTypes}
                  touched={touched.bidLogTypes}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  options={BID_LOG_TYPES_OPTIONS}
                  isMulti
                />
              </div>
            </div>

            <div className="row m-b-lg">
              <div className="col-lg-12">
                <SubmitButton
                  label="Submit"
                  className="btn-primary pull-right"
                  isLoading={isSubmitting}
                  disabled={!lots || isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

WonBidFakerForm.propTypes = {
  bidders: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  setFlash: PropTypes.func.isRequired,
};

WonBidFakerForm.defaultProps = {
  bidders: [],
};

export default WonBidFakerForm;
