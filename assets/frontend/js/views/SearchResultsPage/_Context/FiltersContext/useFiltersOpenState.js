import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import { useState } from 'react';

function useFiltersOpenState() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'), { noSsr: true });

  return useState(!isMobile);
}

export default useFiltersOpenState;
