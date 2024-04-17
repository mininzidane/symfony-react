import React, { Suspense, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactService from 'frontend/js/lib/utils/ReactService';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';
import { useFiltersContext } from '../_Context/FiltersContext';
import DesktopSidebarLoading from './Desktop/Loading';

const MobileSidebar = ReactService.lazyWithPreload(() => import('./Mobile'));
const DesktopSidebar = ReactService.lazyWithPreload(() => import('./Desktop'));

function Sidebar() {
  const [{ filters, isFiltersPanelOpen, areFiltersEmpty }] = useFiltersContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true });

  useEffect(() => {
    if (isMobile) {
      DelayedLoadService.onPermissionGranted(() => {
        MobileSidebar.preload();
      });
    } else {
      DesktopSidebar.preload();
    }
  }, []);

  if (filters && areFiltersEmpty) {
    return null;
  }

  if (!isFiltersPanelOpen) {
    return null;
  }

  if (isMobile) {
    return (
      <Suspense fallback={null}>
        <MobileSidebar />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<DesktopSidebarLoading />}>
      <DesktopSidebar />
    </Suspense>
  );
}

export default Sidebar;
