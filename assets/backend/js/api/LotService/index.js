import { BaseApiServiceInstance } from 'backend/js/api/BaseApiService';
import RouterService from 'frontend/js/api/RouterService';

const LotService = {
  getHistory(vin, withPurchases = false) {
    const params = {};
    if (withPurchases) {
      params.withPurchases = true;
    }
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/lots/${vin}/sale-history`),
      { params },
    ).then((data) => data.data);
  },
  getFees(lotId, customerId, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/lots/${lotId}/list-fees`),
      { params: { customerId, auction } },
    ).then((data) => data.data);
  },
  getCvReport(lotId, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/lots/${lotId}/cv-report`),
      { params: { auction } },
    )
      .catch(() => {})
      .then((data) => data.data);
  },
  getLotInfo({ query: q, auction, customerId }) {
    const params = { q, auction, customerId };
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(
        `api/v1/lot-search?${RouterService.serializeQueryParams(params)}`,
      ),
    )
      .catch(() => {})
      .then((data) => data.data);
  },
};

LotService.titleCategoryCleanTitle = 'C';
LotService.titleCategorySalvageTitle = 'S';
LotService.titleCategoryNonRepairableTitle = 'J';

LotService.CONDITION_RUN_AND_DRIVE_CODE = 'D';
LotService.CONDITION_ENGINE_START_PROGRAM_CODE = 'S';
LotService.CONDITION_ENHANCED_VEHICLES_CODE = 'E';

LotService.titleCategories = {
  [LotService.titleCategoryCleanTitle]: 'Clean Title',
  [LotService.titleCategorySalvageTitle]: 'Salvage Title',
  [LotService.titleCategoryNonRepairableTitle]: 'Non-repairable Title',
};

LotService.STATUS_NOT_APPLICABLE = 0;
LotService.STATUS_PREBIDDING = 1;
LotService.STATUS_PREBIDDING_CLOSED = 2;
LotService.STATUS_LIVE_BIDDING = 3;
LotService.STATUS_AWAITING_APPROVAL = 4;
LotService.STATUS_SELLER_COUNTERED = 5;
LotService.STATUS_AWAITING_SELLER_RESPONSE = 6;
LotService.STATUS_YOU_WON = 7;
LotService.STATUS_SOLD = 8;
LotService.COUNTER_BID_STATUSES = [
  LotService.STATUS_AWAITING_APPROVAL,
  LotService.STATUS_SELLER_COUNTERED,
  LotService.STATUS_AWAITING_SELLER_RESPONSE,
];

LotService.isCounterBidStatus = (status) => LotService.COUNTER_BID_STATUSES.includes(status);

LotService.AUCTION_COPART = 'Copart';
LotService.AUCTION_IAA = 'IAA';
LotService.AUCTION_ABM = 'ABM';

export default LotService;
