import useMediaQuery from '@material-ui/core/useMediaQuery';

/**
 * Hook for easy import and usage media breakpoints.
 */

function useBreakpoint() {
  // XS extra-small: 480px
  const isAboveXs = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const isBelowXs = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  // SM small: 768px
  const isAboveSm = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // MD medium: 992px
  const isAboveMd = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // LG large: 1200px
  const isAboveLg = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const isBelowLg = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return {
    isAboveXs,
    isBelowXs,
    isAboveSm,
    isBelowSm,
    isAboveMd,
    isBelowMd,
    isAboveLg,
    isBelowLg,
  };
}

export default useBreakpoint;
