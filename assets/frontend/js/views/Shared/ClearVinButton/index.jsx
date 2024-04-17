/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import get from 'lodash/get';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import LotService from 'frontend/js/api/LotService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';

const ClearVinReportCheckoutModal = React.lazy(() => import('frontend/js/views/Shared/ClearVinReportCheckoutModal'));
const ClearVinCreditsModal = React.lazy(() => import('frontend/js/views/Shared/ClearVinCreditsModal'));

function ClearVinButton({ lot, component: Component }) {
  const { customer } = window;
  const { id: lotId, inventoryAuction } = lot || {};

  const [creditsCount, setCreditsCount] = useState(customer && customer.cvCredits);
  const [isCvInfoLoading, setIsCvInfoLoading] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [reportHash, setReportHash] = useState(null);
  const [requestedAt, setRequestedAt] = useState(null);
  const [requestedAtTs, setRequestedAtTs] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(null);
  const [isFreeReport, setIsFreeReport] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function updateCreditsCount(count) {
    setCreditsCount(count);
    window.dispatchEvent(new CustomEvent('cvCreditsUpdated', { detail: count }));
  }

  useEventListener('cvCreditsUpdated', (e) => {
    setCreditsCount(e.detail);
  });

  async function getClearvinInfo() {
    setIsCvInfoLoading(true);

    try {
      const cvInfo = await LotService.getCvCredits(lotId, inventoryAuction);
      updateCreditsCount(cvInfo.creditsRemaining);
      setReportHash(cvInfo.reportHash);
      setIsFirstTime(cvInfo.firstTime);
      setRequestedAt(cvInfo.requestedAt);
      setRequestedAtTs(cvInfo.requestedAtTs);
      setIsFreeReport(cvInfo.freeReport);

      if (creditsCount > 0 || cvInfo.requestedAt || cvInfo.freeReport) {
        setIsCreditsModalOpen(true);
      } else {
        setIsCheckoutModalOpen(true);
      }
    } catch (error) {
      const errorText = get(error.response, 'data.errors.error');
      if (errorText) {
        enqueueSnackbar(errorText, { variant: 'error' });
      }
    }

    setIsCvInfoLoading(false);
  }

  return (
    <>
      <Component onClick={getClearvinInfo} creditsCount={creditsCount} isLoading={isCvInfoLoading} />

      <SuspenseWrap fallback={null} init={isCheckoutModalOpen}>
        <ClearVinReportCheckoutModal
          lot={lot || {}}
          isOpen={isCheckoutModalOpen}
          setOpen={setIsCheckoutModalOpen}
          reportHash={reportHash}
        />
      </SuspenseWrap>

      <SuspenseWrap fallback={null} init={isCreditsModalOpen}>
        <ClearVinCreditsModal
          lotId={lotId}
          auction={inventoryAuction}
          isOpen={isCreditsModalOpen}
          setOpen={setIsCreditsModalOpen}
          setCheckoutModalOpen={setIsCheckoutModalOpen}
          reportHash={reportHash}
          creditsCount={creditsCount}
          requestedAt={requestedAt}
          requestedAtTs={requestedAtTs}
          isFirstTime={isFirstTime}
          freeReport={isFreeReport}
          updateCreditsCount={updateCreditsCount}
        />
      </SuspenseWrap>
    </>
  );
}

ClearVinButton.propTypes = {
  component: PropTypes.elementType.isRequired,
  lot: PropTypes.object,
};

ClearVinButton.defaultProps = {
  lot: {},
};

export default ClearVinButton;
