import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import MembershipService from 'frontend/js/api/MembershipService';
import LotService from 'frontend/js/api/LotService';
import { useQuery } from 'react-query';
import get from 'lodash/get';

function useRecommendedBid(lotId, auction) {
  const { isAuthenticated, membershipType } = useCustomerHelper();
  const isGuestMembership = membershipType.level === MembershipService.LEVEL.GUEST;

  const { data, isLoading } = useQuery(
    ['recommended-bids-data', `${lotId}_${auction}`],
    () => LotService.getRecommendedBid(Number(lotId), auction),
    { enabled: Boolean(lotId) && isAuthenticated && !isGuestMembership },
  );

  return [get(data, 'recommendedBid'), isLoading];
}

export default useRecommendedBid;
