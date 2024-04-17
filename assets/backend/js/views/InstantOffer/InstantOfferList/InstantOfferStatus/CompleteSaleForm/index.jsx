import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import Input from 'backend/js/components/Form/Input';
import InstantOfferCompleteSaleFormValidationSchema from './InstantOfferCompleteSaleFormValidationSchema';
import DatePicker from '../../../../../components/DatePicker';

function CompleteSaleForm({ instantOffer, setFlash, setInstantOfferChangeLogs, setModalContent }) {
  async function onSubmitCompleteSale(values, { setSubmitting }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.completeSale(values.ref, {
        auctionFeesAmount: values.auctionFeesAmount,
        soldAmount: values.soldAmount,
        soldDate: values.soldDate,
        revenueAmount: values.revenueAmount,
      });
      setFlash({ message: 'The offer was Complete sale successfully', type: 'success' });
      instantOffer.auctionFeesAmount = response.instantOffer.auctionFeesAmount;
      instantOffer.soldAmount = response.instantOffer.soldAmount;
      instantOffer.soldDate = response.instantOffer.soldDate;
      instantOffer.revenueAmount = response.instantOffer.revenueAmount;
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } =
    useFormik({
      initialValues: {
        ref: instantOffer.ref,
        auctionFeesAmount: instantOffer.auctionFeesAmount || '',
        soldAmount: instantOffer.soldAmount || '',
        soldDate: instantOffer.soldDate || '',
      },
      enableReinitialize: true,
      validationSchema: InstantOfferCompleteSaleFormValidationSchema,
      onSubmit: onSubmitCompleteSale,
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-md mb-10">Sold date:</div>
      <div className="form-group">
        <DatePicker
          placeholder="Sold date"
          value={values.soldDate ? new Date(values.soldDate) : null}
          onChange={(value) => {
            setFieldValue('soldDate', value);
          }}
          onBlur={() => setFieldTouched('soldDate')}
        />
      </div>

      <div className="text-md mb-10">Auction Fees, USD:</div>
      <Input
        id="auctionFeesAmount"
        name="auctionFeesAmount"
        placeholder="Auction Fees"
        value={values.auctionFeesAmount}
        error={errors.auctionFeesAmount}
        touched={touched.auctionFeesAmount}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
      />

      <div className="text-md mb-10">Sold, USD:</div>
      <Input
        id="soldAmount"
        name="soldAmount"
        placeholder="Sold"
        value={values.soldAmount}
        error={errors.soldAmount}
        touched={touched.soldAmount}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        onError={setFieldError}
      />

      <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

CompleteSaleForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setFlash: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default CompleteSaleForm;
