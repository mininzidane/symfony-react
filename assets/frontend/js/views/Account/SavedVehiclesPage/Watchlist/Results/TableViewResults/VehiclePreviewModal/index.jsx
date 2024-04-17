/* eslint-disable react/prop-types */
import React, { useEffect, Suspense, useState } from 'react';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';

const VehiclePreviewLargeModalWindow = React.lazy(() =>
  import('frontend/js/views/Shared/VehiclePreviewLargeModalWindow'),
);

function VehiclePreviewModal({ lots }) {
  const [{ setPreviewModalLots, setIsModalOpen, isModalOpen }] = usePreviewModalContext();
  const [init, setInit] = useState(isModalOpen);

  useEffect(() => {
    setPreviewModalLots(lots);
  }, [lots]);

  useEffect(() => {
    if (isModalOpen && !init) {
      setInit(true);
    }
  }, [isModalOpen]);

  if (!init) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <VehiclePreviewLargeModalWindow onClose={() => setIsModalOpen(false)} isOpen={isModalOpen} />
    </Suspense>
  );
}

export default VehiclePreviewModal;
