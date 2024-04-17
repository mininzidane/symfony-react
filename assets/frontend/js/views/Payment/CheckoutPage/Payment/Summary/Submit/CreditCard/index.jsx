import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Button from 'frontend/js/components/Button';
import PaymentService from 'frontend/js/api/PaymentService';
import SecurePaymentService from 'frontend/js/api/SecurePaymentService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';

const SECURE_3D_ENABLED = BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.SECURE3D);

function CreditCardSubmit({ ctaLabel }) {
  const { isBelowSm } = useBreakpoint();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { form, error, amountToPay, payload, onSuccess } = useCheckoutContext();
  const securePaymentService = useRef(new SecurePaymentService());

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
      const isNewCard = values.selectedCard === 'new';

      const paymentPayload = {
        ...payload,
      };

      const ccPayload = {
        method: PaymentService.METHOD.CREDIT_CARD,
      };

      if (isNewCard) {
        ccPayload.cc = {
          new_card: {
            number: values.cardNumber.replace(/\s/g, ''),
            exp_month: values.expDate.split(/ \/ /)[0],
            exp_year: values.expDate.split(/ \/ /)[1],
            cvv: values.cvv,
            billing_as_profile: values.isBillingAsProfile,
            ...(!values.isBillingAsProfile && {
              country: values.countryId,
              city: values.city,
              zip: values.zip,
              state: values.state,
              address: values.address,
            }),
          },
          save_new_card: values.saveCard,
        };
      } else {
        ccPayload.cc = {
          saved_card: values.selectedCard,
        };
      }

      if (SECURE_3D_ENABLED) {
        await securePaymentService.current.initCardinalScript();

        const { orderId, token, collectionUrl, bypass } = await PaymentService.securePaymentGenerate({
          payment: ccPayload,
          amount: amountToPay,
        });

        if (!bypass) {
          const secureConfig = {
            mpiOrderId: orderId,
            mpiToken: token,
            amount: amountToPay,
            collectionUrl,
          };

          if (securePaymentService.current.initialized) {
            await securePaymentService.current.update(secureConfig);
          } else {
            await securePaymentService.current.init(secureConfig);
          }

          await securePaymentService.current.runDataCollection(collectionUrl, token);

          const { jwt } = await securePaymentService.current.handleEnrollment({
            payment: ccPayload,
            amount: amountToPay,
            isMobile: isBelowSm,
          });

          paymentPayload.amount = amountToPay;
          paymentPayload.cmpiResponse = jwt;
          paymentPayload.mpiOrderId = securePaymentService.current.getMpiOrderId();
        }
      }

      paymentPayload.payment = {
        ...ccPayload,
      };

      const data = await PaymentService.creditCardPayment(paymentPayload);

      onSuccess(data);
    } catch (e) {
      error.show();
    }

    setIsSubmitting(false);
  }

  return <Button onClick={handleSubmit} label={ctaLabel} color="yellow" isLoading={isSubmitting} />;
}

CreditCardSubmit.propTypes = {
  ctaLabel: PropTypes.string.isRequired,
};

export default CreditCardSubmit;
