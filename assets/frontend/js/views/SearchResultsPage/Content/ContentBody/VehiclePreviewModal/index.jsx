/* eslint-disable react/prop-types */
import React, { useEffect, Suspense, useState } from 'react';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import EventTrackingService from 'frontend/js/api/EventTrackingService';

const VehiclePreviewLargeModalWindow = React.lazy(() =>
  import('frontend/js/views/Shared/VehiclePreviewLargeModalWindow'),
);

function VehiclePreviewModal({ lots }) {
  const [{ setPreviewModalLots, setIsModalOpen, isModalOpen }] = usePreviewModalContext();
  const [init, setInit] = useState(isModalOpen);
  const eventTrackingService = new EventTrackingService();

  function track(substep) {
    eventTrackingService.sendEvent({ step: 'abm_carfinder_filters', substep });
  }

  useEffect(() => {
    setPreviewModalLots(lots);
  }, [lots]);

  useEffect(() => {
    if (isModalOpen) {
      eventTrackingService.sendEvent({
        step: 'abm_carfinder_filters',
        substep: 'car_details_popup_show',
      });
      if (!init) {
        setInit(true);
      }
    }
  }, [isModalOpen]);

  if (!init) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <VehiclePreviewLargeModalWindow
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        onWatchlistButtonClick={() => track('watchlist_on_popup_click')}
        onNextLotButtonClick={() => track('nextlot_on_popup_click')}
        onNextSlideClick={() => track('nextphoto_on_popup_click')}
        onViewDetailsClick={() => track('fulldetails_on_popup_click')}
        onVinDetailsClick={() => track('clearvin_link_popup_click')}
      />
    </Suspense>
  );
}

export default VehiclePreviewModal;
