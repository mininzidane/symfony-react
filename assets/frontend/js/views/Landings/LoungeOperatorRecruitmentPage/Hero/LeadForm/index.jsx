import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import get from 'lodash/get';
import Loader from 'frontend/js/views/Shared/Loader';
import useIntl from 'frontend/js/hooks/useIntl';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import LeadService from 'frontend/js/api/LeadService';
import Form from './Form';
import SuccessView from './SuccessView';
import useForm from './useForm';
import useStyles from './useStyles';

function LeadForm() {
  const intl = useIntl();
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit(payload) {
    const leadService = new LeadService();
    const formData = new FormData();

    for (let i = 0; i < payload.officePhotos.length; i++) {
      formData.append(`image_${i}`, payload.officePhotos[i]);
    }

    delete payload.officePhotos;

    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    setIsSubmitting(true);

    try {
      await leadService.createLoungeLead(formData);
      setIsSubmitted(true);
      enqueueSnackbar(<FormattedMessage id="form.message.informationSent" />, { variant: 'success' });
    } catch (serverError) {
      if (serverError) {
        const error = get(
          serverError,
          'response.data.errors.error',
          'An error occurred while processing this request.',
        );
        enqueueSnackbar(error, { variant: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const { formik, activeStep, prevStep } = useForm({ onSubmit });

  return (
    <div className={classes.root} id="lounge-lead-form">
      {isSubmitted ? (
        <SuccessView />
      ) : (
        <>
          {isSubmitting ? (
            <Loader className={classes.loader} />
          ) : (
            <>
              <div className={classes.header}>
                <div className={classes.title}>
                  {intl.formatMessage({ id: 'landings.loungeOperatorRecruitmentPage.leadForm.title' })}
                </div>
                <div className={classes.stepLabel}>
                  {intl.formatMessage(
                    { id: 'landings.loungeOperatorRecruitmentPage.leadForm.stepLabel' },
                    { currentStep: activeStep, totalSteps: 4, strong: (chunk) => <strong>{chunk}</strong> },
                  )}
                </div>
              </div>

              <Form formik={formik} activeStep={activeStep} />

              <div className={classes.footer}>
                <div className={classes.actions}>
                  {activeStep > 1 && (
                    <ButtonOutlined
                      label={intl.formatMessage({ id: 'shared.label.back' })}
                      isThinBorder
                      isBackgroundWhite
                      onClick={prevStep}
                    />
                  )}
                  <Button
                    color="yellow"
                    label={intl.formatMessage({ id: 'shared.label.next' })}
                    isLoading={isSubmitting}
                    onClick={formik?.submitForm}
                  />
                </div>
                <div className={classes.footerDesc}>
                  {intl.formatMessage({ id: 'sellYourCarPage.leadForm.footerDesc' })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default LeadForm;
