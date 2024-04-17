import React, { memo, Suspense } from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import CountryService from 'frontend/js/api/CountryService';

import BalanceDue from './BalanceDue';
import Phone from '../Shared/Phone';
import SocialLinks from '../Shared/SocialLinks';
import BuyerPower from './BuyerPower';
import Watchlist from './Watchlist';
import BidStatus from './BidStatus';
import CustomerInfo from './CustomerInfo';

const HelpForm = React.lazy(() => import('../Shared/HelpForm'));

function AccountStats({ isAccountMenuOpen, setAccountMenuOpen, accountMenuTriggerRef }) {
  const isIntl = !CountryService.isDomestic();
  const toggleMenuOpenState = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  const { isBelowSm } = useBreakpoint();

  return isBelowSm ? (
    <div className="d-f ai-ct">
      {isIntl ? (
        <Phone />
      ) : (
        <Suspense fallback={null}>
          <HelpForm />
        </Suspense>
      )}
      {isIntl && <SocialLinks />}
    </div>
  ) : (
    <>
      <BalanceDue />
      <BuyerPower />
      <Watchlist />
      <BidStatus />
      <CustomerInfo
        onClick={toggleMenuOpenState}
        isAccountMenuOpen={isAccountMenuOpen}
        accountMenuTriggerRef={accountMenuTriggerRef}
      />
    </>
  );
}

AccountStats.propTypes = {
  setAccountMenuOpen: PropTypes.func.isRequired,
  isAccountMenuOpen: PropTypes.bool.isRequired,
  accountMenuTriggerRef: PropTypes.object.isRequired,
};

export default memo(AccountStats);
