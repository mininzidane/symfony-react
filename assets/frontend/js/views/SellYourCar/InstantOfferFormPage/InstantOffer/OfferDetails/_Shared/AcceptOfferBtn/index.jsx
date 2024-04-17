import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Button from 'frontend/js/components/Button';
import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function AcceptOfferBtn({ instantOfferRef, onAcceptOffer, ...props }) {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function acceptOffer() {
    setIsSubmitting(true);
    try {
      const response = await InstantOfferService.accept(instantOfferRef);
      onAcceptOffer(response.instantOffer);
    } catch (error) {
      const errors = error.response?.data?.title || intl.formatMessage({ id: 'form.error.general' });
      enqueueSnackbar(errors, { variant: 'error' });
    }
    setIsSubmitting(false);
  }

  return (
    <Button
      color="blue"
      label={
        <>
          {intl.formatMessage({ id: 'shared.cta.acceptOffer' })}{' '}
          <svg className="ml-10" width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7.308h14M8 1.308l6 6-6 6" stroke="#fff" strokeWidth="2" />
          </svg>
        </>
      }
      isNowrap
      isLoading={isSubmitting}
      onClick={acceptOffer}
      {...props}
    />
  );
}

AcceptOfferBtn.propTypes = {
  instantOfferRef: PropTypes.string.isRequired,
  onAcceptOffer: PropTypes.func.isRequired,
};

export default AcceptOfferBtn;
