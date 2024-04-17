import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CustomerService from 'frontend/js/api/CustomerService';
import useContactInformationContext from '../../../_Context/useContactInformationContext';

function Submit({ ctaLabel }) {
  const intl = useIntl();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, error, onSuccess } = useContactInformationContext();
  const { enqueueSnackbar } = useSnackbar();
  const { setCustomer } = useCustomerHelper();

  async function handleSubmit() {
    error.hide();
    setIsSubmitting(true);

    let values;

    try {
      values = await form.submit();
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

      const data = await CustomerService.updateCustomer(payload);
      enqueueSnackbar(intl.formatMessage({ id: 'form.message.informationSaved' }), { variant: 'success' });
      onSuccess(data);
      setCustomer(data.customer);
    } catch (e) {
      const { response: { data: { errors, title = '' } = {}, status } = {} } = e;
      if (status === 400 && typeof errors === 'object') {
        error.setFields(errors);
      }
      error.show(title);
    }

    setIsSubmitting(false);
  }

  return <Button onClick={handleSubmit} label={ctaLabel} color="blue" isLoading={isSubmitting} />;
}

Submit.propTypes = {
  ctaLabel: PropTypes.string.isRequired,
};

export default Submit;
