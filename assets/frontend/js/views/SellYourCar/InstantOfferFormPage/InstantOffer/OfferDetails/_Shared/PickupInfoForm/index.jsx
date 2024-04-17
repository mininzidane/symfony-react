import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonLink from 'frontend/js/components/ButtonLink';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import ConfirmOfferCancellationModal from './ConfirmOfferCancellationModal';
import ConfirmAddressModal from './ConfirmAddressModal';
import ConfirmPickUpTimeModal from './ConfirmPickUpTimeModal';
import ConfirmNoteModal from './ConfirmNoteModal';
import UploadCard from './UploadCard';
import useCarPhotos from './useCarPhotos';
import WarningSvg from './img/warning.svg';
import useStyles from './useStyles';

function PickupInfoForm({ instantOffer, className }) {
  const classes = useStyles();
  const intl = useIntl();
  const [instantOfferCurrent, setInstantOfferCurrent] = useState(instantOffer);
  const { enqueueSnackbar } = useSnackbar();

  const [isConfirmCancellationModalOpen, setIsConfirmCancellationModalOpen] = useState(false);
  const [isConfirmAddressModalOpen, setIsConfirmAddressModalOpen] = useState(false);
  const [isConfirmPickUpTimeModalOpen, setIsConfirmPickUpTimeModalOpen] = useState(false);
  const [isConfirmNoteModalOpen, setIsConfirmNoteModalOpen] = useState(false);
  const { FILE_CONTENT_TYPES } = InstantOfferService;

  async function onSubmitPickupInfo(values) {
    try {
      const response = await InstantOfferService.editPickupInfo(instantOfferCurrent.ref, {
        pickupAddress: instantOfferCurrent.pickupAddress || '',
        zip: instantOfferCurrent.zip || '',
        pickupDate: instantOfferCurrent.pickupDate || '',
        pickupTime: instantOfferCurrent.pickupTime || '',
        pickupNote: instantOfferCurrent.pickupNote || '',
        ...values,
      });
      setInstantOfferCurrent(response.instantOffer);
      return true;
    } catch (err) {
      const error = Object.values(err.response?.data?.errors || {})[0];
      enqueueSnackbar(error || intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
      return false;
    }
  }

  const isPickupDateRequired = !instantOfferCurrent.pickupDate || !instantOfferCurrent.pickupTime;
  const isPickupAddressRequired = !instantOfferCurrent.pickupAddress;
  const isPickupNoteRequired = !instantOfferCurrent.pickupNote;
  const isAllowToEditPickupAddress =
    instantOfferCurrent.activeShippingOrders.length === 0 ||
    instantOfferCurrent.activeShippingOrders[0].scheduledPickup === null;

  const pickupAddress = !isPickupAddressRequired
    ? `${[instantOfferCurrent.pickupAddress, instantOfferCurrent.pickupCity, instantOfferCurrent.pickupStateCode]
        .filter(Boolean)
        .join(', ')} ${instantOfferCurrent.zip ? instantOfferCurrent.zip : ''}`
    : null;

  const isNeedCopyOfTitle = !instantOfferCurrent?.instantOfferFiles?.some(
    (file) => file.contentType === FILE_CONTENT_TYPES.DOCUMENT,
  );

  const { isAllPhotosUploaded, uploadedPhotoCount, requiredPhotoCount } = useCarPhotos(
    instantOfferCurrent?.instantOfferFiles,
  );

  const hasAcceptedPrice = Boolean(instantOfferCurrent?.acceptedPrice);

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.title}>{intl.formatMessage({ id: 'sellYourCarPage.pickupInfoForm.title' })}</div>
      <div>
        <UploadCard
          label={intl.formatMessage({ id: 'shared.label.copyOfTitle' })}
          instantOfferRef={instantOfferCurrent.ref}
          hash={instantOfferCurrent.hash}
          contentType={FILE_CONTENT_TYPES.DOCUMENT}
          isAccepted={!isNeedCopyOfTitle}
        />

        <UploadCard
          label={
            <>
              {intl.formatMessage({ id: 'shared.label.carPhotos' })} ({uploadedPhotoCount}/{requiredPhotoCount})
            </>
          }
          instantOfferRef={instantOfferCurrent.ref}
          hash={instantOfferCurrent.hash}
          contentType={FILE_CONTENT_TYPES.PHOTO}
          isAccepted={isAllPhotosUploaded}
        />

        <div className={classes.row}>
          <div>{intl.formatMessage({ id: 'shared.label.vehicle' })}:</div>
          <div>
            <strong>
              {instantOfferCurrent.title} ({instantOfferCurrent.vehicleVin})
            </strong>
          </div>
        </div>

        <div className={classes.row}>
          <div>
            {isPickupAddressRequired && (
              <img src={WarningSvg} width={18} height={18} alt="Warning" className={classes.warningIcon} />
            )}{' '}
            {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.addressForPickUp' })}:
          </div>
          <div>
            {isPickupAddressRequired ? (
              <ButtonLink
                label={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmAddressForPickUp' })}
                onClick={() => setIsConfirmAddressModalOpen(true)}
              />
            ) : (
              <strong>
                {pickupAddress}{' '}
                {isAllowToEditPickupAddress && (
                  <span className="ws-n">
                    (
                    <ButtonLink
                      label={intl.formatMessage({ id: 'shared.cta.edit' })}
                      onClick={() => setIsConfirmAddressModalOpen(true)}
                    />
                    )
                  </span>
                )}
              </strong>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div>
            {isPickupDateRequired && (
              <img src={WarningSvg} width={18} height={18} alt="Warning" className={classes.warningIcon} />
            )}{' '}
            {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.dateAndTimeForPickUp' })}:
          </div>
          <div>
            {isPickupDateRequired ? (
              <ButtonLink
                label={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmPickUpTime' })}
                onClick={() => setIsConfirmPickUpTimeModalOpen(true)}
              />
            ) : (
              <strong>
                {DateTimeService.toLocaleDate(instantOfferCurrent.pickupDate, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
                , {instantOfferCurrent.pickupTime}{' '}
                <span className="ws-n">
                  (
                  <ButtonLink
                    label={intl.formatMessage({ id: 'shared.cta.edit' })}
                    onClick={() => setIsConfirmPickUpTimeModalOpen(true)}
                  />
                  )
                </span>
              </strong>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div>{intl.formatMessage({ id: 'sellYourCarPage.instantOffer.noteForDriver' })}:</div>
          <div className={classes.note}>
            {isPickupNoteRequired ? (
              <ButtonLink
                label={intl.formatMessage({ id: 'sellYourCarPage.instantOffer.confirmNoteForDriver' })}
                onClick={() => setIsConfirmNoteModalOpen(true)}
              />
            ) : (
              <>
                {instantOfferCurrent.pickupNote}{' '}
                <span className="ws-n">
                  (
                  <ButtonLink
                    label={intl.formatMessage({ id: 'shared.cta.edit' })}
                    onClick={() => setIsConfirmNoteModalOpen(true)}
                  />
                  )
                </span>
              </>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div>{hasAcceptedPrice && <>{intl.formatMessage({ id: 'shared.label.price' })}:</>}</div>
          <div>
            {hasAcceptedPrice && (
              <div className={classes.acceptedPrice}>
                <strong>{NumberService.formatCurrency(instantOfferCurrent.acceptedPrice)}</strong> USD
              </div>
            )}
            <div className={classes.cancel}>
              {intl.formatMessage({ id: 'sellYourCarPage.instantOffer.notInterested' })}{' '}
              <ButtonLink label="Cancel" onClick={() => setIsConfirmCancellationModalOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmOfferCancellationModal
        isOpen={isConfirmCancellationModalOpen}
        onClose={() => setIsConfirmCancellationModalOpen(false)}
        instantOfferRef={instantOfferCurrent.ref}
        ymm={instantOfferCurrent.title}
      />
      <ConfirmAddressModal
        isOpen={isConfirmAddressModalOpen}
        onClose={() => setIsConfirmAddressModalOpen(false)}
        onSubmitPickupInfo={onSubmitPickupInfo}
        pickupAddress={instantOfferCurrent.pickupAddress}
        pickupApartment={instantOfferCurrent.pickupApartment}
        pickupCity={instantOfferCurrent.pickupCity}
        pickupStateCode={instantOfferCurrent.pickupStateCode}
        pickupState={instantOfferCurrent.pickupState?.id}
        zip={instantOfferCurrent.zip}
      />
      <ConfirmPickUpTimeModal
        isOpen={isConfirmPickUpTimeModalOpen}
        onClose={() => setIsConfirmPickUpTimeModalOpen(false)}
        onSubmitPickupInfo={onSubmitPickupInfo}
        pickupDate={instantOfferCurrent.pickupDate}
        pickupTime={instantOfferCurrent.pickupTime}
      />
      <ConfirmNoteModal
        isOpen={isConfirmNoteModalOpen}
        onClose={() => setIsConfirmNoteModalOpen(false)}
        onSubmitPickupInfo={onSubmitPickupInfo}
        pickupNote={instantOfferCurrent.pickupNote}
      />
    </div>
  );
}

PickupInfoForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  className: PropTypes.string,
};

PickupInfoForm.defaultProps = {
  className: '',
};

export default PickupInfoForm;
