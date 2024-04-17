import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import { useSnackbar } from 'notistack';
import FormikTickbox from 'backend/js/components/Form/FormikTickbox';
import InstantOfferSendFileNotificationFormValidationSchema from './InstantOfferSendFileNotificationFormValidationSchema';

const CHANNEL_TYPES = [
  { label: 'Email', value: 'email' },
  { label: 'Sms', value: 'sms' },
];

function SendFileNotificationForm({ instantOffer, fileContentType, setModalContent }) {
  const instantOfferService = new InstantOfferService();
  const { enqueueSnackbar } = useSnackbar();
  const [sendTimes, setSendTimes] = useState({});

  async function fetchSendTimes() {
    try {
      const response = await instantOfferService.getFileUploadNotificationTimes(instantOffer.ref);
      setSendTimes(response.sendTimes);
    } catch (e) {
      // skip
    }
  }

  useEffect(() => {
    fetchSendTimes();
  }, []);

  async function onSubmitSendFileNotification(values, { setSubmitting }) {
    setSubmitting(true);

    const channelTypes = Object.entries(values.channelType)
      .filter(([, value]) => value)
      .map(([type]) => type);

    try {
      await instantOfferService.sendFileUploadNotification(instantOffer.ref, {
        fileContentType,
        channelTypes,
      });
      enqueueSnackbar('Request successful', { variant: 'success' });
      setModalContent(null);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      enqueueSnackbar(message, { variant: 'error' });
    }

    setSubmitting(false);
  }

  function getSendTimesLabel(channelTypeValue) {
    if (!sendTimes[channelTypeValue] || !sendTimes[channelTypeValue][fileContentType]) {
      return '';
    }

    const date = new Date(sendTimes[channelTypeValue][fileContentType] * 1000).toLocaleString();

    return `[Last sent at ${date}]`;
  }

  const { values, setFieldValue, setFieldTouched, setFieldError, isSubmitting, handleSubmit } = useFormik({
    initialValues: {
      channelType: {
        email: true,
      },
    },
    enableReinitialize: true,
    validationSchema: InstantOfferSendFileNotificationFormValidationSchema,
    onSubmit: onSubmitSendFileNotification,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-md mb-10">Channel:</div>

      {CHANNEL_TYPES.map((channelType) => (
        <FormikTickbox
          key={channelType.value}
          id={`channelType-${channelType.value}`}
          name="channelType"
          className="mr-10"
          value={Boolean(values.channelType[channelType.value])}
          onBlur={setFieldTouched}
          onChange={(name, value) => {
            const newValue = { ...values.channelType, [channelType.value]: value };
            setFieldValue('channelType', newValue);
          }}
          onError={setFieldError}
        >
          {channelType.label} {getSendTimesLabel(channelType.value)}
        </FormikTickbox>
      ))}

      <SubmitButton label="Send" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
    </form>
  );
}

SendFileNotificationForm.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  fileContentType: PropTypes.string.isRequired,
  setModalContent: PropTypes.func.isRequired,
};

export default SendFileNotificationForm;
