/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import useStyles from './useStyles';
import DetailsSection from './DetailsSection';
import ActionsSections from './ActionsSections';

function GridView({ lots }) {
  const classes = useStyles();
  const [{ setCurrentLotId, setIsModalOpen }] = usePreviewModalContext();

  const handleQuickViewClick = useCallback((id) => {
    setCurrentLotId(id);
    setIsModalOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      {lots.map((lot) => (
        <VehicleVerticalCard
          lot={lot}
          key={lot.id}
          onQuickViewClick={handleQuickViewClick}
          details={<DetailsSection lot={lot} />}
          controls={<ActionsSections lot={lot} />}
        />
      ))}
    </div>
  );
}

export default GridView;
