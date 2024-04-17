import React from 'react';
import MembershipService from 'frontend/js/api/MembershipService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import CongratulationsInternational from './CongratulationsInternational';
import CongratulationsCountryBased from './CongratulationsCountryBased';
import CongratulationsLatin from './CongratulationsLatin';
import CongratulationsBy from './CongratulationsBy';
import CongratulationsNg from './CongratulationsNg';
import CongratulationsUa from './CongratulationsUa';
import CongratulationsPl from './CongratulationsPl';
import CongratulationsRu from './CongratulationsRu';
import CongratulationsGe from './CongratulationsGe';

function Congratulations() {
  const { membershipType } = useCustomerHelper();
  const membershipName = membershipType.name;
  const country = BootstrapService.getAppValue('countryName');

  if (MembershipService.TYPE.PREMIUM_NG === membershipName) {
    return <CongratulationsNg country={country} />;
  }

  if (MembershipService.TYPE.PREMIUM_UA === membershipName) {
    return <CongratulationsUa country={country} />;
  }

  if (MembershipService.TYPE.PREMIUM_BY === membershipName) {
    return <CongratulationsBy country={country} />;
  }

  if ([MembershipService.TYPE.PREMIUM_LATIN_AMERICA, MembershipService.TYPE.PREMIUM_GT].includes(membershipName)) {
    return <CongratulationsLatin country={country} />;
  }

  if (MembershipService.TYPE.PREMIUM_PL === membershipName) {
    return <CongratulationsPl country={country} />;
  }

  if (MembershipService.TYPE.PREMIUM_RU === membershipName) {
    return <CongratulationsRu country={country} />;
  }

  if (MembershipService.TYPE.PREMIUM_GE === membershipName) {
    return <CongratulationsGe country={country} />;
  }

  if (
    [
      MembershipService.TYPE.PREMIUM_BG,
      MembershipService.TYPE.PREMIUM_RO,
      MembershipService.TYPE.PREMIUM_AL,
      MembershipService.TYPE.PREMIUM_GH,
      MembershipService.TYPE.PREMIUM_KR,
      MembershipService.TYPE.PREMIUM_HN,
    ].includes(membershipName)
  ) {
    return <CongratulationsCountryBased country={country} />;
  }

  return <CongratulationsInternational />;
}

export default Congratulations;
