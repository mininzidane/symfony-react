const RouterService = {
  routes: {
    bidAssign: '/abm-acp/bid/:id/assign',
    bidCounterBid: '/abm-acp/bid/counter-bid/:id/counterbidding',
    customerNotes: '/abm-acp/customer/:id/notes',
    customerDocumentRequested: '/abm-acp/customer/:id/id-document-requested',
    customerAddNote: '/abm-acp/customer/:id/add-note',
    customerSendSms: '/abm-acp/api/v1/customer/:id/send-sms',
    customerSendEmail: '/abm-acp/api/v1/customer/:id/send-email',
    customerInvoices: '/abm-acp/customer/:id/invoices',
    customerLot: '/abm-acp/lot/:lotId/member/:customerId',
    customerShippingOrders: '/abm-acp/customer/:id/shipping-orders',
    customerChangeBiddingLimit: '/abm-acp/customer/:id/change-bidding-limit',
    customerActiveBids: '/abm-acp/customer/:id/bids/active',
    customerWatchlist: '/abm-acp/customer/:id/watchlist',
    customerIpLog: '/abm-acp/customer/:id/log',
    lotDetails: '/abm-acp/lot/:id',
    backendLotPurchaseView: '/abm-acp/lot_purchase/:token',
    backendLocation: '/abm-acp/location/:id',
    backendBrokerEdit: '/abm-acp/customer-parent/:id/edit',
    invoiceView: '/abm-acp/invoice/:token',
    invoiceTextView: '/abm-acp/invoice/:token/text',
    customerParentFile: '/abm-acp/customer-parent/:id/file/:fileId',
    customerParentFileDelete: '/abm-acp/customer-parent/:id/file/:fileId/delete',
    customerParentDelete: '/abm-acp/customer-parent/:id/delete',
    customerParentCreate: '/abm-acp/customer-parent/new',
    customerChangeFees: '/abm-acp/customer/:id/change-fees',
    instantOffersEdit: '/abm-acp/instant-offers/:id',
    instantOffersList: '/abm-acp/instant-offers',
    instantOffersInstructions: '/abm-acp/instant-offers/:ref/instructions',
    instantOffersPowerOfAttorney: '/abm-acp/instant-offers/:ref/power-of-attorney',
    instantOffersHowToSign: '/abm-acp/instant-offers/:ref/how-to-sign',
    titleReport: '/abm-acp/title/report',
    transactionUnapply: '/abm-acp/transaction/unapply/:token',
    inventoryEdit: '/abm-acp/inventory/edit/:stockNumber',
    carrierLabelPrint: '/abm-acp/label/print/:id',
    inventory: '/abm-acp/inventory',
    inventoryLocations: '/abm-acp/inventory/locations',
    inventoryLocationEdit: '/abm-acp/inventory/locations/edit/:id',
    consignment: '/abm-acp/consignment',
    backendCustomerTicketDetailsModal: '/abm-acp/customer/:customer/tickets/:ticket/modal',
    backendWireConfirmationUploadModal: '/abm-acp/wire-confirmations/:id/upload-modal',
    backendCustomerDeleteNote: '/abm-acp/customer/:id/delete-note/:note',
    backendCustomerBidLog: '/abm-acp/customer/:id/bid-log',

    lotPage: '/en/carfinder-online-auto-auctions/lot/:id/',
    lotSlugPage: '/en/carfinder-online-auto-auctions/lot/:id/:slug/',
    copartLotPage: 'https://www.copart.com/lot/:id',

    // Google Maps
    googleMapDirection: 'https://www.google.com/maps/dir/',
  },

  serializeQueryParams(params = {}) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  },

  getRoute(routeName, query, params) {
    const queryString = query ? `?${RouterService.serializeQueryParams(query)}` : '';

    let route = RouterService.routes[routeName];
    if (params && route) {
      route = route.replace(/:(\w+)/g, (_, match) => params[match]);
    }

    return `${route}${queryString}`;
  },

  getCurrentQueryParams() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const queryParams = [...searchParams.keys()].reduce((params, key) => {
        const values = searchParams.getAll(key);
        if (values.length > 1) {
          params[key.replace('[]', '')] = values;
        } else {
          params[key] = values.toString();
        }
        return params;
      }, {});
      return queryParams;
    } catch (e) {
      return {};
    }
  },

  getQueryParam(key) {
    const params = RouterService.getCurrentQueryParams();

    return params[key];
  },

  addQueryParams(params, pushToHistory = false, redirect = false) {
    const currentQueryParams = RouterService.getCurrentQueryParams();
    const newParams = { ...currentQueryParams, ...params };

    const queryString = RouterService.serializeQueryParams(newParams);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString}`;
    if (redirect) {
      window.location.href = newUrl;
      return true;
    }

    if (pushToHistory && window.history.pushState) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    }

    return newUrl;
  },

  replaceQueryParams(params, pushToHistory = false, redirect = false) {
    const queryString = RouterService.serializeQueryParams(params);
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${queryString}`;
    if (redirect) {
      window.location.href = newUrl;
      return true;
    }

    if (pushToHistory && window.history.pushState) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    }

    return newUrl;
  },

  getFullRoute(routeName, query, params) {
    const base = `${window.location.protocol}//${window.location.host}`;
    const route = RouterService.getRoute(routeName, query, params);

    return `${base}${route}`;
  },

  redirect(...routeParams) {
    window.location.href = RouterService.getFullRoute(...routeParams);
  },
};

export default RouterService;
