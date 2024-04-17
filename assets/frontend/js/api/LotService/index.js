import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import SessionStorageService from 'frontend/js/lib/utils/SessionStorageService';
import RouterService from '../RouterService';

const { serializeQueryParams } = RouterService;

const LotService = {
  getLotDetails(lotId) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/${lotId}`, true)).then(
      ({ data }) => data,
    );
  },
  getRecommendedBid(lotId, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/recommend-bid?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  getSearchSuggestions(searchQuery, auctions, requestOptions) {
    const params = { q: searchQuery };
    if (auctions) {
      params.auctions = auctions;
    }

    const queryParams = BaseApiServiceInstance.objectToQueryParams(params);
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/suggest?${queryParams}`, true),
      requestOptions,
    ).then(({ data }) => data);
  },
  getPopularSearches(market) {
    const query = market ? `?market=${market}` : '';
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/popular-suggest${query}`, true),
    ).then(({ data }) => data);
  },
  getUsersCurrentlyWonLot() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lot-purchase/current-won`, false)).then(
      ({ data }) => data,
    );
  },
  getYmmSearchResults(searchQuery, requestOptions) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/search/criteria${searchQuery ? `?${searchQuery}` : ''}`, false),
      requestOptions,
    ).then(({ data }) => data);
  },
  getCurrentBidInformation(lotId) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/current-bid`, true)).then(
      ({ data }) => data,
    );
  },
  getCurrentCustomerBidInformation(lotId) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/customer-bid`, true)).then(
      ({ data }) => data,
    );
  },
  getLotFees(lotId, queryParams) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/list-fees?${serializeQueryParams(queryParams)}`, true),
    ).then(({ data }) => data);
  },
  getSoldLotRecommendations(lotId) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/sold-recommendations`, true),
    ).then(({ data }) => data);
  },
  getLotPurchase(lotId, auction, includeShippingQuote = false) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(
        `lots/${lotId}/lot-purchase?includeShippingQuote=${includeShippingQuote}&auction=${auction}`,
        true,
      ),
    ).then(({ data }) => data);
  },
  getCvCredits(lotId, auction) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/cv-credit`, true), {
      params: { auction },
    }).then(({ data }) => data);
  },
  getCvReport(lotId, payload) {
    const queryString = BaseApiServiceInstance.objectToQueryParams(payload);

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/cv-report?${queryString}`, true),
      payload,
    ).then(({ data }) => data);
  },
  getSeoContent({ lotId, auction }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/seo-content?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  getLotHrefByVinOrId(lotIdOrVin) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotIdOrVin}/lot-href`, true),
    ).then(({ data }) => data);
  },
  getVinByYearMakeModel(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`vehicle-vin-ymm?${queryString}`, true),
    ).then(({ data }) => data);
  },
  getCurrentBids(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`bids/current?${queryString}`, true),
    ).then(({ data }) => data);
  },
  getLotsWon(queryString) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots-won?${queryString}`, true)).then(
      ({ data }) => data,
    );
  },
  getLotsLost(queryString) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`bids/lost?${queryString}`, true)).then(
      ({ data }) => data,
    );
  },
  vinDecode(vin) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/vin-decode/${vin}`, true)).then(
      ({ data }) => data,
    );
  },
  getRelatedVehicles(lotId, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/similar-recent?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  getSalesHistory({ vin, auction }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${vin}/sale-history?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  getVinDetails(vin) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`vin-decode/${vin}`)).then(
      ({ data }) => data,
    );
  },
  getLotInfo({ query: q, auction, navdata }) {
    const params = { q, auction, navdata };
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lot-search?${RouterService.serializeQueryParams(params)}`, true),
    ).then(({ data }) => data);
  },
  getLargeImages({ id, auction }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${id}/large-images?auction=${auction}`),
    ).then(({ data }) => data);
  },
  getCurrentBidInfo({ id, auction, force }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${id}/current-bid?auction=${auction}&force=${force}`, true),
    ).then(({ data }) => data);
  },
  getVehicleTypes() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('lots/search/criteria')).then(
      ({ data }) => data,
    );
  },
  addToWatchlist({ id, auction }) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`watchlist/${id}?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  removeFromWatchlist({ id, auction }) {
    return BaseApiServiceInstance.delete(
      BaseApiServiceInstance.buildRequestPath(`watchlist/${id}?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
};

LotService.FAKE_LOT_ID = 546630813254;

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

LotService.SALE_STATUS_PURE_SALE_CODE = 'P';
LotService.SALE_STATUS_ON_APPROVAL_CODE = 'A';
LotService.SALE_STATUS_ON_MINIMUM_BID_CODE = 'M';

LotService.CONDITION_RUN_AND_DRIVE_CODE = 'D';
LotService.CONDITION_ENGINE_START_PROGRAM_CODE = 'S';
LotService.CONDITION_ENHANCED_VEHICLES_CODE = 'E';

LotService.TITLE_TYPE_BIDDING_ALL = 0;
LotService.TITLE_TYPE_NO_BIDDING = 1;
LotService.TITLE_TYPE_NO_BIDDING_DOMESTIC = 2;
LotService.TITLE_TYPE_NO_BIDDING_INTERNATIONAL = 3;

LotService.AUCTION_DATE_TYPE_UPCOMING = 'U';
LotService.AUCTION_DATE_TYPE_FUTURE = 'F';

// Keep in sync with Utils/Slugger.php map
LotService.AUCTION_COPART = 'Copart';
LotService.AUCTION_COPART_DE = 'Copart_DE';
LotService.AUCTION_IAA = 'IAA';
LotService.AUCTION_ABM = 'ABM';
LotService.AUCTION_NPA = 'NPA';

LotService.KEY_STATUS_YES = 'YES';
LotService.KEY_STATUS_NO = 'NO';

LotService.prefixToAuctionType = (prefix = '') => {
  switch (prefix.toLowerCase()) {
    case 'add':
      return LotService.AUCTION_IAA;
    case 'copartde':
      return LotService.AUCTION_COPART_DE;
    case 'abm':
      return LotService.AUCTION_ABM;
    case 'npa':
    case 'npae':
    case 'npas':
    case 'npal':
    case 'npac':
      return LotService.AUCTION_NPA;
    default:
      return LotService.AUCTION_COPART;
  }
};

LotService.FUEL_TYPES = {
  HYBRID: ['HYBRID ENGINE', 'HYBRID'],
  GAS: 'GAS',
  GASOLINE_TYPES: ['GAS', 'GASOLINE'],
  DIESEL: 'DIESEL',
  FLEXIBLE_FUEL: 'FLEXIBLE FUEL',
  ELECTRIC: 'ELECTRIC',
};

LotService.VEHICLE_CATEGORY = {
  AUTOMOBILE: 'Automobile',
  MOTORCYCLE: 'Motorcycle',
  DIRT_BIKE: 'Dirt Bike',
  INDUSTRIAL: 'Industrial',
  MEDIUM_DUTY_TRUCKS: 'Medium Duty Trucks',
  HEAVY_DUTY_TRUCKS: 'Heavy Duty Trucks',
  TRAILER: 'Trailer',
  JET_SKI: 'Jet Ski',
  BOAT: 'Boat',
  RV: 'RV',
};

LotService.VEHICLE_TYPE = {
  CAR: 'V',
  MOTORCYCLE: 'C',
  INDUSTRIAL_EQUIPMENT: 'E',
  JET_SKI: 'J',
  BOAT: 'M',
  RECREATIONAL_VEHICLE: 'R',
  SNOWMOBILE: 'S',
  ATV: 'A',
  DIRT_BIKE: 'D',
  HOMEOWNERS: 'H',
  MEDIUM_DUTY_TRUCK: 'K',
  TRAILER: 'L',
  HEAVY_DUTY_TRUCK: 'U',
};

LotService.isMotorcycle = (vehicleCategory) =>
  [LotService.VEHICLE_CATEGORY.MOTORCYCLE, LotService.VEHICLE_CATEGORY.DIRT_BIKE].includes(vehicleCategory);

LotService.isAutomobile = (vehicleCategory) => LotService.VEHICLE_CATEGORY.AUTOMOBILE === vehicleCategory;

LotService.isTruck = (vehicleCategory) =>
  [
    LotService.INDUSTRIAL,
    LotService.VEHICLE_CATEGORY.RV,
    LotService.VEHICLE_CATEGORY.MEDIUM_DUTY_TRUCKS,
    LotService.VEHICLE_CATEGORY.TRAILER,
    LotService.VEHICLE_CATEGORY.HEAVY_DUTY_TRUCK,
  ].includes(vehicleCategory);

LotService.isJetSki = (vehicleCategory) => LotService.VEHICLE_CATEGORY.JET_SKI === vehicleCategory;
LotService.isBoat = (vehicleCategory) => LotService.VEHICLE_CATEGORY.BOAT === vehicleCategory;

LotService.TITLE_STATUS = {
  AUCTION: 'Auction',
};

LotService.MARKET_US_CAN = 'us_can';
LotService.MARKET_DE = 'de';
LotService.MARKETS = [LotService.MARKET_US_CAN, LotService.MARKET_DE];

LotService.isCounterBidStatus = (status) => LotService.COUNTER_BID_STATUSES.includes(status);

LotService.getFormattedOdometerString = (lot) => {
  const { inventoryAuction, odometer, odometerType, odometerBrand, odometerNote } = lot;

  const isNpaAuction = inventoryAuction === LotService.AUCTION_NPA;
  const displayNote = Boolean(isNpaAuction && odometerNote && !odometer);

  const odometerValues = displayNote
    ? [odometerNote, odometerType]
    : [NumberService.formatNumber(odometer), odometerType, odometerBrand];

  return odometerValues.filter(Boolean).join(' ');
};

LotService.LAST_VIEWED_LOT_STORAGE_KEY = 'searchResultsLastViewed';
LotService.removeLastViewedLot = () => SessionStorageService.delete(LotService.LAST_VIEWED_LOT_STORAGE_KEY);

export default LotService;
