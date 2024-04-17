import React from 'react';
import ReactMetaTags from 'react-meta-tags';
import MembershipService from 'frontend/js/api/MembershipService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function Congratulations() {
  const { membershipType, firstName } = useCustomerHelper();
  const membershipName = membershipType.name;

  let title = `Congratulations, ${firstName}`;

  if (
    [
      MembershipService.TYPE.PREMIUM_UA,
      MembershipService.TYPE.PREMIUM_BY,
      MembershipService.TYPE.PREMIUM_RU,
      MembershipService.TYPE.PREMIUM_GE,
    ].includes(membershipName)
  ) {
    title = `Здравствуйте, ${firstName}!`;
  } else if (MembershipService.TYPE.PREMIUM_PL === membershipName) {
    title = `Gratulacje, ${firstName}!`;
  }

  return (
    <ReactMetaTags>
      <title>{title}</title>
    </ReactMetaTags>
  );
}

export default Congratulations;
