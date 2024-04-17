import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const MembershipService = {
  TYPE: {
    GUEST: 'Guest',
    BASIC: 'Basic',
    PREMIUM: 'Premium',
    ADVANCED: 'Advanced',
    PREMIUM_NG: 'Premium (NG)',
    PREMIUM_UA: 'Premium (UA)',
    PREMIUM_BY: 'Premium (BY)',
    PREMIUM_LATIN_AMERICA: 'Premium (Latin America)',
    PREMIUM_PL: 'Premium (PL)',
    PREMIUM_RU: 'Premium (RU)',
    PREMIUM_GE: 'Premium (GE)',
    PREMIUM_BG: 'Premium (BG)',
    PREMIUM_RO: 'Premium (RO)',
    PREMIUM_AL: 'Premium (AL)',
    PREMIUM_GH: 'Premium (GH)',
    PREMIUM_KR: 'Premium (KR)',
    PREMIUM_HN: 'Premium (HN)',
    PREMIUM_GT: 'Premium (GT)',
  },
  LEVEL: {
    GUEST: 1,
    BASIC: 2,
    ADVANCED: 3,
    PREMIUM: 4,
    BUSINESS: 8,
  },

  getMembershipTypes() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('membership/types', true)).then(
      ({ data }) => data,
    );
  },
};

export default MembershipService;
