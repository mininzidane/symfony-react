import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl-phraseapp';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FinishRegistrationFormModal from 'frontend/js/views/Shared/FinishRegistrationFormModal';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Congratulations from './Congratulations';
import Meta from './Meta';

const CongratulationsPage = () => {
  const ga = new GoogleAnalyticsService();

  const { fbId, ggId, phoneNumber } = useCustomerHelper();
  const { enqueueSnackbar } = useSnackbar();
  const isModalRequired = !phoneNumber && Boolean(fbId || ggId);
  const [isFinishRegistrationModalOpen, setIsFinishRegistrationModalOpen] = useState(isModalRequired);

  function handleSubmitSuccess() {
    setIsFinishRegistrationModalOpen(false);
    enqueueSnackbar(<FormattedMessage id="shared.form.informationHasBeenSaved" />, { variant: 'success' });
  }

  useEffect(() => {
    ga.sendEvent('submit', 'sendform', 'registration');
  }, []);

  return (
    <>
      <Meta />
      <Congratulations />
      <FinishRegistrationFormModal isOpen={isFinishRegistrationModalOpen} onSubmitSuccess={handleSubmitSuccess} />
    </>
  );
};

export default CongratulationsPage;
