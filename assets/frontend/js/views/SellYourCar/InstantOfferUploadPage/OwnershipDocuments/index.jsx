/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import validationSchema from './validationSchema';
import UploadForm from './UploadForm';
import OwnershipDocumentsForm from './OwnershipDocumentsForm';
import useStyles from './useStyles';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';

function OwnershipDocuments({ instantOffer }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { FILE_CONTENT_TYPES } = InstantOfferService;
  const contentType = FILE_CONTENT_TYPES.DOCUMENT;

  const formik = useFormik({
    initialValues: {
      files: [],
      contentType,
      titleName: instantOffer?.titleName || '',
      titleState: instantOffer?.titleState ? instantOffer.titleState.code : '',
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        values.files?.forEach((file, i) => {
          formData.append(`file_${i}`, file);
        });

        const payload = { titleName: values.titleName, titleState: values.titleState };

        await Promise.all([
          InstantOfferService.uploadFiles(instantOffer.ref, instantOffer.hash, contentType, formData),
          InstantOfferService.title(instantOffer.ref, instantOffer.hash, payload),
        ]);

        enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
        RouterService.redirect('sellYourCarOffer', null, false, { ref: instantOffer.ref, hash: instantOffer.hash });
        setIsSubmitted(true);
      } catch (err) {
        const errors = Object.values(err.response?.data?.errors || {}).join(' ');
        enqueueSnackbar(errors || intl.formatMessage({ id: 'form.error.fileUpload.serverError' }), {
          variant: 'error',
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {intl.formatMessage({ id: 'sellYourCarPage.upload.document.title' }, { firstName: instantOffer.firstName })}
      </div>
      <div className={classes.subtitle}>
        {intl.formatMessage({ id: 'sellYourCarPage.upload.document.subtitle' }, { br: <br /> })}
      </div>
      <div className={classes.card}>
        <div className={classes.vehicleInfoWithoutIcon}>
          <div className={classes.details}>
            <div>{intl.formatMessage({ id: 'shared.label.vehicle' })}:</div>
            <div>
              {instantOffer.vehicleYear} {instantOffer.vehicleMake} {instantOffer.vehicleModel}
            </div>
            <div>{intl.formatMessage({ id: 'shared.label.vin' })}:</div>
            <div>{instantOffer.vehicleVin}</div>
            <div>{intl.formatMessage({ id: 'shared.label.refNumber' })}:</div>
            <div>{instantOffer.ref}</div>
          </div>
        </div>
        <OwnershipDocumentsForm formik={formik} />
        <div className={classes.form}>
          <UploadForm formik={formik} contentType={contentType} />
        </div>
        <div className={classes.action}>
          <ButtonOutlined
            className={classes.backBtn}
            color="blue"
            label={intl.formatMessage({ id: 'shared.label.back' })}
            href={RouterService.getRoute('sellYourCarOffer', null, false, {
              ref: instantOffer.ref,
              hash: instantOffer.hash,
            })}
            isNowrap
            isInline
            isThinBorder
            isBackgroundTransparent
          />
          <Button
            className={classes.cta}
            color="blue"
            label={intl.formatMessage({ id: 'shared.cta.continue' })}
            isLoading={formik.isSubmitting}
            onClick={formik.handleSubmit}
            isNowrap
            isInline
            isDisabled={!formik.isValid || !formik.dirty || isSubmitted}
          />
        </div>
      </div>
    </div>
  );
}

export default OwnershipDocuments;
