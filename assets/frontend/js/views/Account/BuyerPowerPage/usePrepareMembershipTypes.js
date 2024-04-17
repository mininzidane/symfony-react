import { useMemo } from 'react';
import useMembershipTypes from 'frontend/js/hooks/useMembershipTypes';

function usePrepareMembershipTypes() {
  const data = useMembershipTypes();
  const membershipTypes = useMemo(() => {
    if (!data) {
      return null;
    }

    return data
      .filter((item) => item.active)
      .map((item) => ({
        level: item.level,
        name: item.name,
        biddingAmountLimit: item?.biddingLimitAmount || null,
        price: parseFloat(item.price, 10),
        purchaseLimit: item?.biddingLimitCount || null,
      }));
  }, [data]);

  return membershipTypes;
}

export default usePrepareMembershipTypes;
