import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import STEPS from '../../useInstantOffer/steps';
import useStyles from './useStyles';
import CarPicture from './img/car_picture.svg';

function Actions({
  className,
  instantOffer,
  step,
  prevStep,
  isSubmitting,
  isDraftSubmitting,
  formik,
  saveDraft,
  restart,
  onAccept,
}) {
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowSm } = useBreakpoint();
  const { FILE_CONTENT_TYPES } = InstantOfferService;
  const { enqueueSnackbar } = useSnackbar();
  const [isAcceptSubmitting, setIsAcceptSubmitting] = useState(false);

  async function handleAccept() {
    formik.validateForm().then(async (val) => {
      if (formik.values.schedulePickUp && (!!val.address || !!val.pickupDate || !!val.pickupTime)) {
        formik.setTouched({ address: true, pickupDate: true, pickupTime: true }, false);
        return;
      }

      setIsAcceptSubmitting(true);

      if (formik.values.schedulePickUp) {
        const { pickupAddress, zip, pickupDate, pickupTime } = formik.values;
        try {
          await InstantOfferService.editPickupInfo(instantOffer.ref, {
            zip,
            pickupAddress,
            pickupDate,
            pickupTime,
          });
        } catch (err) {
          const error = Object.values(err.response?.data?.errors || {})[0];
          enqueueSnackbar(error || intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
          setIsAcceptSubmitting(false);
          return;
        }
      }

      try {
        const response = await InstantOfferService.accept(instantOffer.ref);
        onAccept(response.instantOffer);
      } catch (error) {
        const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
        enqueueSnackbar(errors, { variant: 'error' });
      }

      setIsAcceptSubmitting(false);
    });
  }

  function handleSubmit() {
    formik.validateForm().then((err) => {
      const fields = [
        'bodyDamage',
        'titleType',
        'carPaidOff',
        'wheelsAndTires',
        'keys',
        'conditionType',
        'underTheHood',
        'removedOrLooseExteriorPanels',
        'mirrorsGlassOrLightsDamage',
        'floodOrFireDamage',
      ];
      const isErrorShown = Object.keys(err).some((key) => fields.includes(key));
      if (isErrorShown) {
        enqueueSnackbar(intl.formatMessage({ id: 'form.error.pleaseSelectTheAppropriateStatement' }), {
          variant: 'error',
        });
      }
    });
    formik.submitForm();
  }

  const hasPrice = Boolean(instantOffer?.offerAmount) || Boolean(instantOffer?.rangeLow);

  return (
    <div className={className}>
      {step === STEPS.ACCEPT_OFFER && !hasPrice ? (
        <div className={classnames(classes.content, 'is-upload-car-pictures')}>
          <div className={classes.descContent}>
            <p className={classes.uploadTitle}>{intl.formatMessage({ id: 'shared.cta.uploadTitle' })}</p>
            <p className={classes.uploadDesc}>{intl.formatMessage({ id: 'shared.cta.uploadDesc' })}</p>
            <Button
              color="blue"
              label={intl.formatMessage({ id: 'shared.cta.uploadCarPictures' })}
              href={RouterService.getRoute('sellYourCarUpload', null, false, {
                ref: instantOffer.ref,
                hash: instantOffer.hash,
                contentType: FILE_CONTENT_TYPES.PHOTO,
              })}
              className={classes.btnAddCarPhotos}
            />
          </div>
          <img src={CarPicture} alt="CarPicture" />
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.btnBack}>
            {step > 2 && (
              <ButtonLink size="md" label={intl.formatMessage({ id: 'shared.label.back' })} onClick={prevStep} />
            )}
          </div>
          <div className={classes.btnContinue}>
            {step === STEPS.ACCEPT_OFFER || step === STEPS.MISSING_OWNERSHIP_DOCUMENTS ? (
              <>
                {step === STEPS.ACCEPT_OFFER && hasPrice ? (
                  <Button
                    color="blue"
                    label={intl.formatMessage({ id: isBelowSm ? 'shared.cta.accept' : 'shared.cta.acceptOffer' })}
                    isLoading={isAcceptSubmitting}
                    onClick={handleAccept}
                  />
                ) : (
                  <Button
                    color="blue"
                    label={intl.formatMessage({ id: 'membershipSettings.ctaGotIt' })}
                    href={RouterService.getRoute('home')}
                  />
                )}
              </>
            ) : (
              <Button
                color="blue"
                label={
                  step === STEPS.OFFER_CREATED
                    ? intl.formatMessage({ id: isBelowSm ? 'shared.cta.add' : 'shared.cta.addMoreInfo' })
                    : intl.formatMessage({ id: 'shared.cta.continue' })
                }
                isLoading={isSubmitting}
                onClick={handleSubmit}
                isNowrap
              />
            )}
          </div>
          <div className={classes.btnSave}>
            {step > 2 && (
              <>
                {step === STEPS.ACCEPT_OFFER || step === STEPS.MISSING_OWNERSHIP_DOCUMENTS ? (
                  <>
                    {!hasPrice && (
                      <ButtonLink label={intl.formatMessage({ id: 'shared.cta.startOver' })} onClick={restart} />
                    )}
                  </>
                ) : (
                  <ButtonLink
                    isLoading={isDraftSubmitting}
                    label={intl.formatMessage({ id: isBelowSm ? 'shared.cta.save' : 'shared.cta.saveForLater' })}
                    onClick={saveDraft}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
      {step === STEPS.ACCEPT_OFFER && hasPrice && (
        <div className={classes.agreement}>
          {intl.formatMessage(
            { id: 'sellYourCarPage.instantOffer.agreement' },
            {
              terms: (chunks) => (
                <Link href={RouterService.getRoute('terms')} isTargetBlank isNoWrap>
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link href={RouterService.getRoute('privacy')} isTargetBlank isNoWrap>
                  {chunks}
                </Link>
              ),
            },
          )}
        </div>
      )}
    </div>
  );
}

Actions.propTypes = {
  instantOffer: PropTypes.object,
  step: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  isDraftSubmitting: PropTypes.bool,
  formik: PropTypes.object,
  className: PropTypes.string,
};

Actions.defaultProps = {
  instantOffer: {},
  isSubmitting: false,
  isDraftSubmitting: false,
  formik: {},
  className: '',
};

export default Actions;
