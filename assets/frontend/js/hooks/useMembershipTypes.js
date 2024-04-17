import { useQuery } from 'react-query';
import MembershipService from 'frontend/js/api/MembershipService';

function useMembershipTypes() {
  const { data } = useQuery('membership-types-data', () => MembershipService.getMembershipTypes());

  return data;
}

export default useMembershipTypes;
