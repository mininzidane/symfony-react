import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import useIntl from 'backend/js/hooks/useIntl';
import CustomerService from 'backend/js/api/CustomerService';
import Button from 'frontend/js/components/Button';
import useBidderFormContext from 'frontend/js/views/Account/BrokerManagerPage/_Context/useBidderFormContext';
import BrokerService from 'backend/js/api/BrokerService';
import StringService from 'frontend/js/lib/utils/StringService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function Submit({ ctaLabel, additionalParams = {}, customer }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: addBidder } = useMutation((payload) => BrokerService.addBidder(payload));
  const { form, error, onSuccess } = useBidderFormContext();
  const { brokerAllowToChooseSchedule } = useCustomerHelper(customer || window.customer);

  async function handleSubmit() {
    error.hide();
    setIsSubmitting(true);

    let values;
    let files;

    try {
      ({ values, files } = await form.submit());
    } catch (e) {
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...values,
        ...additionalParams,
      };
      delete payload.stateCode;
      delete payload.mailingStateCode;
      delete payload.schedule;

      if (brokerAllowToChooseSchedule) {
        const isVolumeBuyer = values.schedule === 'scheduleA';
        payload.scheduleA = isVolumeBuyer;
        payload.scheduleA2C = !isVolumeBuyer;
      }

      if (typeof payload.customTransactionFeeMinByBroker !== 'undefined') {
        payload.customTransactionFeeMinByBroker =
          parseFloat(StringService.removeNonDigits(payload.customTransactionFeeMinByBroker)) || 0.0;
      }

      if (typeof payload.blAmountFixed !== 'undefined') {
        payload.blAmountFixed = Boolean(parseInt(payload.blAmountFixed, 10));
        if (payload.blAmountFixed) {
          payload.blAmount = parseFloat(StringService.removeNonDigits(payload.blAmount)) || 0.0;
          payload.blCount = parseInt(payload.blCount, 10) || 0;
        } else {
          delete payload.blAmount;
          delete payload.blCount;
        }
      }

      const data = await addBidder(payload);

      const formData = new FormData();
      for (let i = 0; i < files.documents.length; i++) {
        formData.append(`id_document_${i}`, files.documents[i]);
      }

      const customerId = get(data, 'customer.id', 0);

      try {
        const customerService = new CustomerService();
        await customerService.uploadId(customerId, formData);
      } catch (e) {
        enqueueSnackbar(intl.formatMessage({ id: 'form.error.fileUpload.serverError' }), { variant: 'error' });
      }

      enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
      onSuccess(data);
    } catch (e) {
      const result = get(e, 'networkError.result', {});
      const { errors, title = '', status } = result;
      if (status === 400 && typeof errors === 'object') {
        error.setFields(errors);
      }
      error.show(title);
      setIsSubmitting(false);
    }
  }

  return <Button onClick={handleSubmit} label={ctaLabel} size="md" color="blue" isLoading={isSubmitting} />;
}

Submit.propTypes = {
  ctaLabel: PropTypes.string.isRequired,
  additionalParams: PropTypes.object,
  customer: PropTypes.object,
};

Submit.defaultProps = {
  additionalParams: {},
  customer: null,
};

export default Submit;
