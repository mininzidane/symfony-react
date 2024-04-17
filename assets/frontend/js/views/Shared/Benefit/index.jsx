import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

// Destop backgrounds
// x1
import CopartDesktopBgJpg from './img/desktop/background/x1/copart.jpg';
import LiveAuctionDesktopBgJpg from './img/desktop/background/x1/live_auction.jpg';
import ServicesDesktopBgJpg from './img/desktop/background/x1/services.jpg';
import ShippingDesktopBgJpg from './img/desktop/background/x1/shipping.jpg';
import SupportDesktopBgJpg from './img/desktop/background/x1/support.jpg';
import WebsiteDesktopBgJpg from './img/desktop/background/x1/website.jpg';
import InsuranceDesktopBgJpg from './img/desktop/background/x1/insurance.jpg';
import OceanAgentDesktopBgJpg from './img/desktop/background/x1/ocean_agent.jpg';
// x2
import CopartDesktopBg2xJpg from './img/desktop/background/x2/copart.jpg';
import LiveAuctionDesktopBg2xJpg from './img/desktop/background/x2/live_auction.jpg';
import ServicesDesktopBg2xJpg from './img/desktop/background/x2/services.jpg';
import ShippingDesktopBg2xJpg from './img/desktop/background/x2/shipping.jpg';
import SupportDesktopBg2xJpg from './img/desktop/background/x2/support.jpg';
import WebsiteDesktopBg2xJpg from './img/desktop/background/x2/website.jpg';
import InsuranceDesktopBg2xJpg from './img/desktop/background/x2/insurance.jpg';
import OceanAgentDesktopBg2xJpg from './img/desktop/background/x2/ocean_agent.jpg';

// Destop icons
import CopartDesktopIconSvg from './img/desktop/icon/copart.svg';
import LiveAuctionDesktopIconSvg from './img/desktop/icon/live_auction.svg';
import ServicesDesktopIconSvg from './img/desktop/icon/services.svg';
import WebsiteDesktopIconSvg from './img/desktop/icon/website.svg';
import SupportDesktopIconSvg from './img/desktop/icon/support.svg';
import ShippingDesktopIconSvg from './img/desktop/icon/shipping.svg';
import InsuranceDesktopIconSvg from './img/desktop/icon/insurance.svg';
import OceanAgentDesktopIconSvg from './img/desktop/icon/ocean_agent.svg';
import CreditDesktopIconSvg from './img/desktop/icon/credit.svg';

// Mobile backgrounds
import CopartMobileBgJpg from './img/mobile/background/copart.jpg';
import LiveAuctionMobileBgJpg from './img/mobile/background/live_auction.jpg';
import ServicesMobileBgJpg from './img/mobile/background/services.jpg';
import ShippingMobileBgJpg from './img/mobile/background/shipping.jpg';
import SupportMobileBgJpg from './img/mobile/background/support.jpg';
import WebsiteMobileBgJpg from './img/mobile/background/website.jpg';
import InsuranceMobileBgJpg from './img/mobile/background/insurance.jpg';
import OceanAgentMobileBgJpg from './img/mobile/background/ocean_agent.jpg';

// Mobile Icons
import CopartMobileIconSvg from './img/mobile/icon/copart.svg';
import LiveAuctionMobileIconSvg from './img/mobile/icon/live_auction.svg';
import ServicesMobileIconSvg from './img/mobile/icon/services.svg';
import WebsiteMobileIconSvg from './img/mobile/icon/website.svg';
import SupportMobileIconSvg from './img/mobile/icon/support.svg';
import ShippingMobileIconSvg from './img/mobile/icon/shipping.svg';
import InsuranceMobileIconSvg from './img/mobile/icon/insurance.svg';
import OceanAgentMobileIconSvg from './img/mobile/icon/ocean_agent.svg';
import CreditMobileIconSvg from './img/mobile/icon/credit.svg';

import useStyles from './useStyles';

function Benefit({ type, title, subtitle }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();
  const { isHighDPI } = ViewportService;

  const desktopBackroundMap = {
    copart: isHighDPI ? CopartDesktopBg2xJpg : CopartDesktopBgJpg,
    liveAuction: isHighDPI ? LiveAuctionDesktopBg2xJpg : LiveAuctionDesktopBgJpg,
    services: isHighDPI ? ServicesDesktopBg2xJpg : ServicesDesktopBgJpg,
    shipping: isHighDPI ? ShippingDesktopBg2xJpg : ShippingDesktopBgJpg,
    support: isHighDPI ? SupportDesktopBg2xJpg : SupportDesktopBgJpg,
    website: isHighDPI ? WebsiteDesktopBg2xJpg : WebsiteDesktopBgJpg,
    insurance: isHighDPI ? InsuranceDesktopBg2xJpg : InsuranceDesktopBgJpg,
    oceanAgent: isHighDPI ? OceanAgentDesktopBg2xJpg : OceanAgentDesktopBgJpg,
    credit: isHighDPI ? WebsiteDesktopBg2xJpg : WebsiteDesktopBgJpg,
  };

  const backgroundMap = {
    copart: isBelowSm ? CopartMobileBgJpg : desktopBackroundMap.copart,
    liveAuction: isBelowSm ? LiveAuctionMobileBgJpg : desktopBackroundMap.liveAuction,
    services: isBelowSm ? ServicesMobileBgJpg : desktopBackroundMap.services,
    shipping: isBelowSm ? ShippingMobileBgJpg : desktopBackroundMap.shipping,
    support: isBelowSm ? SupportMobileBgJpg : desktopBackroundMap.support,
    website: isBelowSm ? WebsiteMobileBgJpg : desktopBackroundMap.website,
    insurance: isBelowSm ? InsuranceMobileBgJpg : desktopBackroundMap.insurance,
    oceanAgent: isBelowSm ? OceanAgentMobileBgJpg : desktopBackroundMap.oceanAgent,
    credit: isBelowSm ? WebsiteMobileBgJpg : desktopBackroundMap.credit,
  };

  const iconMap = {
    copart: isBelowSm ? CopartMobileIconSvg : CopartDesktopIconSvg,
    liveAuction: isBelowSm ? LiveAuctionMobileIconSvg : LiveAuctionDesktopIconSvg,
    services: isBelowSm ? ServicesMobileIconSvg : ServicesDesktopIconSvg,
    website: isBelowSm ? WebsiteMobileIconSvg : WebsiteDesktopIconSvg,
    support: isBelowSm ? SupportMobileIconSvg : SupportDesktopIconSvg,
    shipping: isBelowSm ? ShippingMobileIconSvg : ShippingDesktopIconSvg,
    insurance: isBelowSm ? InsuranceMobileIconSvg : InsuranceDesktopIconSvg,
    oceanAgent: isBelowSm ? OceanAgentMobileIconSvg : OceanAgentDesktopIconSvg,
    credit: isBelowSm ? CreditMobileIconSvg : CreditDesktopIconSvg,
  };

  return (
    <div className={classes.root}>
      <div className={classes.backgroundImage} style={{ backgroundImage: `url(${backgroundMap[type]})` }}>
        <img src={iconMap[type]} className={classes.icon} alt="Background" />
        {!isBelowSm && (
          <svg className={classes.triangle} viewBox="0 0 34 150" fill="none" preserveAspectRatio="none">
            <path d="M34 0L34 150H0L34 0Z" />
          </svg>
        )}
      </div>
      <div className={classes.title}>{title}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
  );
}

Benefit.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
};

export default Benefit;
