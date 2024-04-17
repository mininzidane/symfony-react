import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';
import useIntl from 'frontend/js/hooks/useIntl';
import BrokerService, { createOrUpdateBidder } from 'frontend/js/api/BrokerService';
import CustomerService from 'frontend/js/api/CustomerService';
import Button from 'frontend/js/components/Button';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import StringService from 'frontend/js/lib/utils/StringService';
import useBidderFormContext from '../../../../_Context/useBidderFormContext';

function Submit({ ctaLabel }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: addBidder } = useMutation((payload) => BrokerService.addBidder(payload), {
    onSuccess: createOrUpdateBidder(queryClient),
  });

  const { form, error, onSuccess } = useBidderFormContext();
  const { brokerAllowToChooseSchedule } = useCustomerHelper();

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
      if (payload.towingMarkup) {
        payload.towingMarkup = parseFloat(StringService.removeNonDigits(payload.towingMarkup));
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
        await CustomerService.uploadUserId(customerId, formData);
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

  return <Button onClick={handleSubmit} label={ctaLabel} color="blue" isLoading={isSubmitting} />;
}

Submit.propTypes = {
  ctaLabel: PropTypes.string.isRequired,
};

export default Submit;
