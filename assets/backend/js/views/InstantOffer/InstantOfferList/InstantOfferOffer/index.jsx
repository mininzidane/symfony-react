import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Amount from 'frontend/js/components/Amount';
import InstantOfferAcceptPriceFormValidationSchema from './InstantOfferAcceptPriceFormValidationSchema';
import InstantOfferChangeOfferAmountFormValidationSchema from './InstantOfferChangeOfferAmountFormValidationSchema';
import BaseApiService from '../../../../api/BaseApiService';
import SubmitButton from '../../../../components/SubmitButton';
import InstantOfferService from '../../../../api/InstantOfferService';
import Input from '../../../../components/Form/Input';
import Button from '../../../../components/Button';

function InstantOfferOffer({ instantOffer, setInstantOffer, setInstantOfferChangeLogs, setModalContent }) {
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmitAcceptPrice(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.acceptOffer(values.ref, {
        acceptedPrice: values.acceptedPrice,
      });
      enqueueSnackbar('Offer was Accepted successfully', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  async function onSubmitChangeOfferAmount(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.changeOfferAmount(values.ref, {
        offerAmount: values.offerAmount,
      });
      enqueueSnackbar('Offer amount was changed successfully', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });

      setSubmitting(false);
    }
  }

  async function cancelAcceptedOffer(values) {
    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.cancelAcceptedPrice(values.ref, {});
      enqueueSnackbar('Accepted offer was cancelled', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
  }

  async function declineOffer(values) {
    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.declineOffer(values.ref, {});
      enqueueSnackbar('Offer marked as declined', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
  }
  async function moveToBargainLeads(values) {
    try {
      const instantOfferService = new InstantOfferService();
      const response = await instantOfferService.moveToBargainLeads(values.ref, {});
      enqueueSnackbar('Offer moved to Bargain leads', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
  }

  const acceptPriceModalForm = (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        acceptedPrice: instantOffer.acceptedPrice || instantOffer.offerAmount,
      }}
      enableReinitialize
      validationSchema={InstantOfferAcceptPriceFormValidationSchema}
      onSubmit={onSubmitAcceptPrice}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-md mb-10">Accepted Price, USD:</div>
          <Input
            id="acceptedPrice"
            name="acceptedPrice"
            placeholder="Accepted Price"
            value={values.acceptedPrice}
            error={errors.acceptedPrice}
            touched={touched.acceptedPrice}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />

          <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
  const changeOfferAmountModalForm = (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        offerAmount: instantOffer.offerAmount || '',
      }}
      enableReinitialize
      validationSchema={InstantOfferChangeOfferAmountFormValidationSchema}
      onSubmit={onSubmitChangeOfferAmount}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="text-md mb-10">Offer, USD:</div>
          <Input
            id="offerAmount"
            name="offerAmount"
            placeholder="Offer Amount"
            value={values.offerAmount}
            error={errors.offerAmount}
            touched={touched.offerAmount}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />

          <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
  return (
    <>
      {instantOffer.acceptedPrice && (
        <>
          Accepted offer: <Amount value={instantOffer.acceptedPrice} hasCurrency /> <br />
        </>
      )}
      {!instantOffer.acceptedPrice && instantOffer.offerAmount > 0 && (
        <>
          Offer Amount: <Amount value={instantOffer.offerAmount} hasCurrency />
        </>
      )}

      <div>
        {instantOffer.acceptedPrice > 0 && instantOffer.status === InstantOfferService.STATUS.OFFER_ACCEPTED && (
          <Button className="m-t" label="Cancel Accepted Offer" onClick={() => cancelAcceptedOffer(instantOffer)} />
        )}

        {!instantOffer.acceptedPrice && (
          <>
            <div>
              <Button
                className="m-t btn-danger"
                label="Accept Offer"
                onClick={() =>
                  setModalContent({
                    title: 'Edit Accept Modal',
                    content: acceptPriceModalForm,
                  })
                }
              />
            </div>
            <div>
              <Button
                className="m-t btn-danger"
                label="Send New Offer"
                onClick={() =>
                  setModalContent({
                    title: 'Send New Offer',
                    content: changeOfferAmountModalForm,
                  })
                }
              />
            </div>
          </>
        )}
        {InstantOfferService.ALLOW_TO_DECLINE_STATUSES.includes(instantOffer.status) && (
          <>
            <div>
              <Button className="m-t" label="Decline" onClick={() => declineOffer(instantOffer)} />
            </div>
          </>
        )}
        {InstantOfferService.ALLOW_TO_MOVE_TO_BARGAIN_STATUSES.includes(instantOffer.status) && (
          <>
            <div>
              <Button className="m-t" label="Move to bargain" onClick={() => moveToBargainLeads(instantOffer)} />
            </div>
          </>
        )}
      </div>

      <div className="m-t">
        {instantOffer.firstOfferedAmount && (
          <div className="m-t-xs">
            Instant offer: <Amount value={instantOffer.firstOfferedAmount} hasCurrency />
          </div>
        )}

        {instantOffer.rangeLow > 0 && instantOffer.rangeHigh > 0 && (
          <>
            <div className="m-t-xs">
              Range: <Amount value={instantOffer.rangeLow} hasCurrency /> -{' '}
              <Amount value={instantOffer.rangeHigh} hasCurrency />
            </div>
          </>
        )}
      </div>
    </>
  );
}

InstantOfferOffer.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setInstantOfferChangeLogs: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default InstantOfferOffer;
