import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useScript from 'frontend/js/hooks/useScript';
import useDelayedLoadPermission from 'frontend/js/hooks/useDelayedLoad';
import useStyles from './useStyles';

// Notice: to work with GAds you should have VPN with USA country
function GoogleAd({
  id,
  className,
  withSlot,
  adUnitPath,
  desktopSize,
  mobileSize,
  targetsArray,
  extraTargetingActions,
  placement,
  pubTargetsArray,
  breakpoint,
  size,
  style,
}) {
  const classes = useStyles();
  const delayedLoadingAllowed = useDelayedLoadPermission();

  if (
    !BootstrapService.isFeatureEnabled(BootstrapService.FEATURE.GOOGLEADS) &&
    !BootstrapService.isAdEnabled(placement)
  ) {
    return null;
  }

  useScript(delayedLoadingAllowed && !window.googletag && 'https://securepubads.g.doubleclick.net/tag/js/gpt.js');

  useEffect(() => {
    if (!delayedLoadingAllowed) {
      return () => {};
    }

    window.googletag = window.googletag || { cmd: [] };
    let adPageSlot;

    if (withSlot && adUnitPath) {
      window.googletag.cmd.push(() => {
        const adaptiveSize = window.innerWidth > breakpoint ? desktopSize : mobileSize;
        adPageSlot = window.googletag.defineSlot(adUnitPath, size || adaptiveSize, id);
        if (targetsArray.length) {
          adPageSlot.setTargeting(...targetsArray);
        }
        adPageSlot.addService(window.googletag.pubads());

        extraTargetingActions(adPageSlot);

        window.googletag.pubads().enableSingleRequest();
        if (pubTargetsArray.length) {
          window.googletag.pubads().setTargeting(...pubTargetsArray);
        }

        window.googletag.enableServices();
      });
    }

    window.googletag.cmd.push(() => {
      window.googletag.display(id);
    });

    return () => {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots([adPageSlot]);
      });
    };
  }, [delayedLoadingAllowed]);

  return (
    <div className={classNames(classes.root, className, 'ga-banner')} style={style}>
      <div id={id} />
    </div>
  );
}

GoogleAd.defaultProps = {
  className: '',
  withSlot: false,
  desktopSize: [728, 90],
  mobileSize: [
    [300, 50],
    [300, 100],
    [320, 50],
    [320, 100],
  ],
  breakpoint: 768,
  adUnitPath: '',
  placement: '',
  targetsArray: [],
  pubTargetsArray: [],
  extraTargetingActions: () => {},
  style: {},
  size: null,
};

GoogleAd.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  withSlot: PropTypes.bool,
  adUnitPath: PropTypes.string,
  placement: PropTypes.string,
  desktopSize: PropTypes.array,
  mobileSize: PropTypes.array,
  breakpoint: PropTypes.number,
  targetsArray: PropTypes.array,
  pubTargetsArray: PropTypes.array,
  extraTargetingActions: PropTypes.func,
  style: PropTypes.object,
  size: PropTypes.array,
};

export default memo(GoogleAd, (prevProps, nextProps) => prevProps.id === nextProps.id);
