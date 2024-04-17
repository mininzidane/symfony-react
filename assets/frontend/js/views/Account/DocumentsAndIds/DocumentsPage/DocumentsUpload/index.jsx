/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import { Collapse } from '@material-ui/core';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import CustomerService from 'frontend/js/api/CustomerService';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Image from 'frontend/js/components/Image';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import TextUnderlined from 'frontend/js/components/TextUnderlined';
import FilesUpload from 'frontend/js/components/Form/FilesUpload';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import SectionTitle from '../SectionTitle';
import DocumentEntry from '../DocumentEntry';
import UploadedMark from './UploadedMark';
import MissingMark from './MissingMark';
import SilhouetteSvg from './img/silhouette.svg';
import useStyles from './useStyles';
import validationSchema from './validationSchema';

function DocumentsUpload({ documents, setModalImageSrc }) {
  const ANIMATION_DURATION = 500;
  const classes = useStyles();
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState(documents);
  const { id: customerId } = useCustomerHelper();
  const { enqueueSnackbar } = useSnackbar();
  const count = uploadedDocuments.length;
  const SilhouetteImage = () => <img src={SilhouetteSvg} alt="Document" />;

  async function onSubmit(values, { resetForm }) {
    const formData = new FormData();
    for (let i = 0; i < values.documents.length; i++) {
      formData.append(`image_${i}`, values.documents[i]);
    }

    setIsSubmitting(true);
    try {
      const { lastUploaded } = await CustomerService.uploadUserId(customerId, formData);
      setUploadedDocuments([lastUploaded]);
      enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
      setIsUploaded(true);
    } catch (e) {
      const { response: { data: { errors } = {}, status } = {} } = e;
      let messages = intl.formatMessage({ id: 'form.error.fileUpload.serverError' });
      if (status === 400 && typeof errors === 'object') {
        messages = Object.values(errors).join(' ');
      }
      enqueueSnackbar(messages, { variant: 'error' });
      resetForm();
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, ANIMATION_DURATION);
  }

  const formik = useFormik({
    initialValues: {
      documents: [],
    },
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <div className={classes.root}>
      <SectionTitle
        text={<FormattedMessage id={count ? 'documentsPage.uploadedDocuments' : 'documentsPage.missingDocuments'} />}
        count={count || 1}
      />

      <div className={classes.documentsList}>
        {count ? (
          <>
            {uploadedDocuments.map(({ image, s3Url }, index) => (
              <DocumentEntry
                image={image ? <Image ratio={100} src={s3Url} alt="Document" fallback /> : SilhouetteImage}
                title={<FormattedMessage id="shared.label.governmentPhotoId" />}
                subtitle={
                  image && (
                    <ButtonLink
                      label={<FormattedMessage id="shared.cta.view" />}
                      onClick={() => setModalImageSrc(s3Url)}
                    />
                  )
                }
                action={<UploadedMark />}
                type="default"
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <DocumentEntry
              icon={<img src={SilhouetteSvg} alt="Document" />}
              title={<FormattedMessage id="shared.label.governmentPhotoId" />}
              subtitle={
                <>
                  <FormattedMessage id="documentsPage.uploadToStartBidding" />
                  &nbsp;&nbsp;
                  <TooltipOnHover
                    content={<FormattedMessage id="documentsPage.whyDoWeNeedThisTooltip" />}
                    trigger={
                      <TextUnderlined>
                        <FormattedMessage id="documentsPage.whyDoWeNeedThis" />
                      </TextUnderlined>
                    }
                  />
                </>
              }
              action={<MissingMark />}
              type="highlighted"
            />

            <Collapse in={!isUploaded} timeout={ANIMATION_DURATION}>
              <div className={classes.filesUpload}>
                <FilesUpload
                  label="UPLOAD FILE(S)"
                  id="documents"
                  name="documents"
                  fileValues={formik.values.documents}
                  accept="image/png,image/jpg,image/jpeg,.pdf"
                  error={formik.errors.documents}
                  touched={formik.touched.documents}
                  onTouched={formik.setFieldTouched}
                  onError={formik.setFieldError}
                  isDropArea
                  isLoading={isSubmitting}
                  isTriggerHidden={!!formik.values.documents.length}
                  dropAreaType="identityDocument"
                  onChange={(name, value) => {
                    formik.setFieldValue(name, value);
                    formik.handleSubmit();
                  }}
                />
              </div>
            </Collapse>
          </>
        )}
      </div>
    </div>
  );
}

export default DocumentsUpload;
