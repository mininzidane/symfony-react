import { useContext } from 'react';
import MembershipRenewalContext from './MembershipRenewalContext';

function useMembershipRenewalContext() {
  return useContext(MembershipRenewalContext);
}

export default useMembershipRenewalContext;
