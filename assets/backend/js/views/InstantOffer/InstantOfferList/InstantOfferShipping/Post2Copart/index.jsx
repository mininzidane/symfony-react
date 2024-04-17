import React, { useState } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Amount from 'frontend/js/components/Amount';
import ModalLink from 'backend/js/components/ModalLink';
import RouterService from 'backend/js/api/RouterService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import CopartLogo from 'backend/js/views/_Shared/Micro/LotDescription/img/copartLogo.svg';
import CopyButton from 'backend/js/components/CopyButton';
import ConfirmModal from 'backend/js/components/ConfirmModal';
import BaseApiService from '../../../../../api/BaseApiService';
import SubmitButton from '../../../../../components/SubmitButton';
import InstantOfferService from '../../../../../api/InstantOfferService';
import Input from '../../../../../components/Form/Input';
import Button from '../../../../../components/Button';
import InstantOfferPost2CopartFormValidationSchema from './InstantOfferPost2CopartFormValidationSchema';

const COPART_MARKUP = 1000;

function InstantOfferPost2Copart({ instantOffer, setInstantOffer, setModalContent }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [removeConsignmentSubmitting, setRemoveConsignmentSubmitting] = useState(false);
  const instantOfferService = new InstantOfferService();
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmitPost2Copart(values, { setSubmitting }) {
    setSubmitting(true);

    try {
      const response = await instantOfferService.post2Copart(values.ref, {
        copartMinimumBid: values.copartMinimumBid,
      });
      enqueueSnackbar('Vehicle was posted to Copart.', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
      setSubmitting(false);
    }
  }

  async function removeConsignment(instantOfferRef) {
    setRemoveConsignmentSubmitting(true);

    try {
      const response = await instantOfferService.removeConsignment(instantOfferRef);
      enqueueSnackbar('Consignment removed.', { variant: 'success' });
      setInstantOffer(response.instantOffer);
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }
    setRemoveConsignmentSubmitting(false);
  }

  const post2CopartModalForm = (
    <Formik
      initialValues={{
        ref: instantOffer.ref,
        copartMinimumBid: instantOffer.copartMinimumBid ?? instantOffer.acceptedPrice + COPART_MARKUP,
      }}
      enableReinitialize
      validationSchema={InstantOfferPost2CopartFormValidationSchema}
      onSubmit={onSubmitPost2Copart}
    >
      {({ values, touched, errors, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Input
            id="copartMinimumBid"
            name="copartMinimumBid"
            placeholder="Copart's Minimum Bid"
            value={values.copartMinimumBid}
            error={errors.copartMinimumBid}
            touched={touched.copartMinimumBid}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            onError={setFieldError}
          />

          <SubmitButton label="Submit" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
        </form>
      )}
    </Formik>
  );
  return (
    <>
      {instantOffer.copartLot && (
        <>
          <br />
          Copart{' '}
          {instantOffer.nearestLocation ? (
            <ModalLink
              route={RouterService.getRoute(
                'backendLocation',
                { auction: 'Copart' },
                { id: instantOffer.nearestLocation.id },
              )}
              title="View location detail information"
              label={instantOffer.nearestLocation.name}
            />
          ) : (
            '...'
          )}{' '}
          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={() => {
              removeConsignment(instantOffer.ref);
              setIsConfirmOpen(false);
            }}
            title="Do you want to remove the consignment?"
            subtitle={<>This action can&apos;t be undone.</>}
          />
          <SubmitButton
            isLoading={removeConsignmentSubmitting}
            disabled={removeConsignmentSubmitting}
            type="button"
            className="btn btn-danger btn-xs"
            onClick={() => setIsConfirmOpen(true)}
            label="x"
          />
          <br />
          Lot#{' '}
          <a
            href={RouterService.getRoute('consignment', { tab: 'all', lot_or_vin: instantOffer.copartLot })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {instantOffer.copartLot}
          </a>{' '}
          <a href={`https://www.copart.com/lot/${instantOffer.copartLot}/`} target="_blank" rel="noopener noreferrer">
            <img src={CopartLogo} alt="Copart Logo" width="16px" height="16px" />
          </a>
          <CopyButton value={instantOffer.copartLot} />
          <br />
          Min Bid: <Amount value={instantOffer.copartMinimumBid} hasCurrency />
        </>
      )}

      {instantOffer.auctionDate && (
        <>
          <br />
          Sale Date: {DateTimeService.formatFromISOString(instantOffer.auctionDate)}
        </>
      )}

      {!instantOffer.copartLot &&
        instantOffer.acceptedPrice &&
        instantOffer.nearestLocation &&
        instantOffer.vehicleVin && (
          <>
            <Button
              className="m-t btn-danger"
              label="Post to Copart"
              onClick={() =>
                setModalContent({
                  title: 'Post to Copart',
                  content: post2CopartModalForm,
                })
              }
            />
          </>
        )}
    </>
  );
}

InstantOfferPost2Copart.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  setInstantOffer: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default InstantOfferPost2Copart;
