import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';
import RouterService from 'frontend/js/api/RouterService';

const AuctionService = {
  auctionsPath: 'current-auctions',
  calendarPath: 'auction-calendar',
  calendarListPath: 'auction-calendar-list',
  dashboardPath: 'auction/dashboard',
  locationsPath: 'locations',
  vsaTokenPath: 'auction/vsa-token',

  auctionNames: {
    COPART: 'Copart',
  },

  getTodayAuctions(auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`${AuctionService.auctionsPath}?auction=${auction}`),
    ).then(({ data }) => data);
  },

  getAuctionCalendar() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(AuctionService.calendarPath, true)).then(
      ({ data }) => data,
    );
  },

  getAuctionCalendarList(params) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(AuctionService.calendarListPath, true), {
      params,
    }).then(({ data }) => data);
  },

  getAuctionDashboard({ id, lane, lotId, auction }) {
    const query = RouterService.serializeQueryParams({ id, lane, lotId, auction });

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath([AuctionService.dashboardPath, query].join('?'), true),
    ).then(({ data }) => data);
  },

  getAuctionLocations(auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`${AuctionService.locationsPath}?auction=${auction}`, true),
    ).then(({ data }) => data);
  },

  getNearestAuctionLocations(auction, lat, lng) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(
        `${AuctionService.locationsPath}/nearest?auction=${auction}&lat=${lat}&lng=${lng}`,
        true,
      ),
    ).then(({ data }) => data);
  },

  getAuctionLocation(id, date) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`${AuctionService.locationsPath}/${id}/${date}`, true),
    ).then(({ data }) => data);
  },

  getAuctionLocationDetails(slug) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`${AuctionService.locationsPath}/${slug}/details`, true),
    ).then(({ data }) => data);
  },

  getVsaToken() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(AuctionService.vsaTokenPath, true)).then(
      ({ data }) => data,
    );
  },
  getLocation({ id, date, auction }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`locations/${id}/${date}?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
};

AuctionService.AUCTION_US = 'us';
AuctionService.AUCTION_DE = 'de';

AuctionService.AUCTIONS = {
  IAA: 'IAA',
  COPART: 'Copart',
  COPART_DE: 'Copart_DE',
  COPART_US: 'copart_US',
  COPART_CA: 'copart_CA',
  ABM: 'ABM',
  NPA: 'NPA',
};

AuctionService.SRP_FILTER_AUCTIONS = {
  COPART_USA: 'main',
  COPART_DE: 'main_DE',
  ABM_INVENTORY: 'abm_inventory',
  NPA: 'npa',
};

export default AuctionService;
