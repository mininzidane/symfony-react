import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Button from 'frontend/js/components/Button';
import CreditCardsService from 'frontend/js/api/CreditCardsService';
import useBillingInformationContext from '../../../_Context/useBillingInformationContext';

function Submit({ ctaLabel }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, error, onSuccess } = useBillingInformationContext();
  const { isLoading, cardToken } = form;
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
        expMonth: parseInt(values.expDate.split(/ \/ /)[0], 10),
        expYear: values.expDate.split(/ \/ /)[1],
        ...(!cardToken && {
          number: values.cardNumber.replace(/\s/g, ''),
          cvv: values.cvv,
        }),
        billingAsProfile: values.isBillingAsProfile,
        ...(!values.isBillingAsProfile && {
          country: values.countryId,
          city: values.city,
          zip: values.zip,
          state: values.state,
          address: values.address,
        }),
      };

      const data = cardToken
        ? await CreditCardsService.editCard(payload, cardToken)
        : await CreditCardsService.addNewCard(payload);

      enqueueSnackbar(
        cardToken
          ? intl.formatMessage(
              { id: 'billingInformationPage.form.cardUpdated' },
              { card: (data.creditCard && `${data.creditCard.type} **** **** **** ${data.creditCard.last4}`) || '' },
            )
          : intl.formatMessage({ id: 'billingInformationPage.form.newCardSaved' }),
        { variant: 'success' },
      );
      setCustomer(data.customer);
      setIsSubmitting(false);
      onSuccess(data);
    } catch (e) {
      const { response: { data: { errors, title = '' } = {}, status } = {} } = e;

      let messages = title;
      if (status === 400 && typeof errors === 'object') {
        messages = Object.values(errors).join(' ');
      }
      error.show(messages);
      setIsSubmitting(false);
    }
  }

  return (
    <Button onClick={handleSubmit} label={ctaLabel} color="yellow" isLoading={isSubmitting} isDisabled={isLoading} />
  );
}

Submit.propTypes = {
  ctaLabel: PropTypes.string.isRequired,
};

export default Submit;
