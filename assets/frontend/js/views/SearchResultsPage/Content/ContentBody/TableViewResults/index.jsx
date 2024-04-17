/* eslint-disable react/prop-types */
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { AllPhotosModalProvider } from 'frontend/js/context/AllPhotosModal';
import AllPhotosModal from 'frontend/js/views/Shared/AllPhotosModal';
import MobileView from './MobileView';
import DesktopView from './DesktopView';
import useStyles from './useStyles';

function TableViewResults({ lots, lastVisitedLotId }) {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'), { noSsr: true });

  return (
    <div className={classes.root}>
      {isMobile ? (
        <AllPhotosModalProvider>
          <MobileView lots={lots} lastVisitedLotId={lastVisitedLotId} />
          <AllPhotosModal />
        </AllPhotosModalProvider>
      ) : (
        <DesktopView lots={lots} lastVisitedLotId={lastVisitedLotId} />
      )}
    </div>
  );
}

export default TableViewResults;
