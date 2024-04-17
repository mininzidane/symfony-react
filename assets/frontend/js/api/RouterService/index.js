import { pathToRegexp, match } from 'path-to-regexp';
import BootstrapService from 'frontend/js/api/BootstrapService';
import ObjectService from 'frontend/js/lib/utils/ObjectService';
import StringService from 'frontend/js/lib/utils/StringService';
import { isSPAPath } from 'frontend/js/router/utils';
import browserHistory from 'frontend/js/router/browser-history';

import LanguageService from '../LanguageService';
import CountryService from '../CountryService';

const currentLocale = LanguageService.getCurrentLocale();
const RouterService = {
  lang: `/${currentLocale}`,
  routes: {
    home: '/',

    // Authentication
    login: '/login',
    logout: '/logout',
    register: '/register-online-auto-auctions/',
    registerCongrats: '/register-online-auto-auctions/congratulations/',
    forgottenPassword: '/forgot-password/',
    facebookConnect: '/connect/facebook/',
    googleConnect: '/connect/google/',

    // Account
    dashboard: '/myaccount/',
    transactions: '/myaccount/:tab',
    purchases: '/myaccount/purchases',
    invoiceView: '/invoice/:token/view',
    deposits: '/myaccount/deposits',
    refunds: '/myaccount/refunds',
    closedTransactions: '/myaccount/closed-transactions',
    documents: '/myaccount/documents',
    documentsSign: '/myaccount/documents/sign/:token',
    documentDownload: '/myaccount/documents/download/:token',
    billingInfo: '/myaccount/billing-information',
    renewalSettings: '/myaccount/renewal-settings',
    contactInfo: '/myaccount/contact-information',
    security: '/myaccount/security',
    watchlist: '/watchlist',
    watchlistCompleted: '/watchlist/completed',
    buyerPower: '/myaccount/buyer-power',
    bids: '/myaccount/:tab',
    currentBids: '/myaccount/current-bids',
    lotsWon: '/myaccount/lots-won',
    lotsLost: '/myaccount/lots-lost',
    membershipPlans: '/myaccount/membership/plans',

    // Broker manager
    brokerManager: '/myaccount/broker-manager',
    lotsWonDownloadReport: '/myaccount/lots-won/export',
    bosDownload: '/myaccount/broker-admin/shipping-orders/invoices/pdf',
    bolDownload: '/myaccount/broker-admin/shipping-orders/documents',
    reportDownload: '/myaccount/broker-admin/shipping-orders/report',

    // Membership Plans
    membershipContinueGuest: '/myaccount/membership/Guest/receipt',
    membershipUpgradeGuest: '/myaccount/membership/Basic/payment',
    membershipUpgradeBasic: '/myaccount/membership/Basic/payment',
    membershipUpgradeAdvanced: '/myaccount/membership/Advanced/payment',
    membershipUpgradePremium: '/myaccount/membership/Premium/payment',

    // Payment
    invoicePayment: '/invoice/:token/payment',
    buyerPowerPayment: '/myaccount/buyer-power/payment/',
    shippingPayment: '/myaccount/shipping/:token/payment',
    membershipPayment: '/myaccount/membership/:plan/payment',
    cvReportPayment: '/myaccount/cv-report/payment',
    wtUpload: '/wt-upload',

    // Shipping
    shippingTracking: '/shipping-order/:emailOrToken/:vin',
    shippingInvoice: '/myaccount/shipping/:token/invoice',

    // Search
    searchResults: '/carfinder-online-auto-auctions/',
    abmSearch: '/carfinder-online-auto-auctions/autobidmaster-inventory/',
    npaSearch: '/carfinder-online-auto-auctions/new-and-used-powersport-vehicles/',
    copartGermanySearch: '/carfinder-online-auto-auctions/german-car-auctions/',
    abmUsedCars: '/carfinder-online-auto-auctions/autobidmaster-used-cars/',
    searchResultsAuctionDate: '/carfinder-online-auto-auctions/copart-:slug/:date/',
    searchResultsLocation: '/carfinder-online-auto-auctions/copart-:slug/',
    buyItNow: '/carfinder-online-auto-auctions/salvage-buy-it-now/',
    locations: '/carfinder-online-auto-auctions/locations/',
    searchNoBidsYet: '/carfinder-online-auto-auctions/salvage-no-bids-yet/',
    searchPureSale: '/carfinder-online-auto-auctions/salvage-pure-sale/',
    savedSearches: '/saved-searches',
    locationView: '/locations/:slug',

    // Lot
    lot: '/carfinder-online-auto-auctions/lot/:id/:slug/',
    vehicleCalculatorPrint: '/vehicle-calculator-print',

    // Auctions
    todayAuctions: '/virtualsales-copart-auto-auctions/',
    todayAuctionsGermany: '/autoauktionen-in-deutschland/',
    auctionCalendar: '/carfinder-online-auto-auctions/calendar/',
    joinAuctions: '/virtualsales-copart-auto-auctions/dashboard',
    joinAuctionsGermany: '/autoauktionen-in-deutschland/dashboard',
    vinCodeLookup: '/vin-code-lookup/',

    // Support
    terms: '/terms-and-conditions/',
    termsOfService: '/terms-of-service/',
    privacy: '/privacy-policy/',
    sitemap: '/sitemap/',
    lounge: '/lounges/:country',
    contactUs: '/aboutus-copart-broker/contact-us/',
    aboutUs: '/aboutus-copart-broker/',
    accessAndInclusion: '/access-and-inclusion/',
    autoBidMasterReviews: '/auto-auction-reviews/',
    gettingStarted: '/howtobuy-copart-auto-auctions/',
    howToBid: '/howtobuy-copart-auto-auctions/%23buying/#bidding',
    howToBuy: '/how-to-buy-used-car-in-usa-online',
    howToBuyUA: '/kak-kupit-auto-iz-ameriki/',
    videoGuides: '/video-guides/',
    howDomesticShippingWorks: '/how-domestic-shipping-works',
    howInternationalShippingWorks: '/how-international-shipping-works',

    // Services
    vehicleHistoryReports: '/services/clearvin-vehicle-history-reports/',
    domesticVehicleTransportation: '/services/domestic-vehicle-transport/',
    internationalShipping: '/services/auto-shipping-international/',
    trackMyOrder: '/services/auto-shipping-international#track-my-order',
    salvageAutoLoans: '/services/salvage-auto-loans',
    businessBuyers: '/business/',

    // Static
    staticFiles: '/files/:fileName',

    // Nigeria
    chekiNigeria: '/cheki-nigeria/',
    howToBuyNigeria: '/howtobuy-copart-auto-auctions/nigeria/',
    autoShippingNigeria: '/services/auto-shipping-to-nigeria/',

    // Help Center
    helpCenter: 'https://helpcenter.autobidmaster.com',
    hcSubmitRequest: '/requests/new/',
    hcFeesMembershipsDeposit: '/sections/5162774560788',
    hcCantPlaceBid: '/articles/5165655930516',
    hcHowToBid: '/sections/360003111652-How-to-Bid/',
    hcGettingStarted: '/sections/360006038951/',
    hcHowToPayOnceWon: '/articles/360020780931-How-do-I-pay-for-a-vehicle-once-I-ve-won-it-/',
    hcHowToRegister: '/articles/360033880851-How-to-register-at-AutoBidMaster-com-/',
    hcHowToIncreaseSecurityDeposit: '/articles/360033880751-How-to-place-or-increase-your-security-deposit-/',
    hcHowToBidOnPreliminaryAndLiveAuctions: '/articles/360033880591-How-to-bid-on-Preliminary-and-Live-Auctions-/',
    hcMoreAboutThisVehicle: '/articles/360025484292-Can-you-tell-me-more-about-this-vehicle-/',
    hcIntlOceanShipping: '/sections/360003111752-International-Ocean-Shipping/',
    hcOwnershipDocsFl:
      '/articles/360020513272-How-are-Ownership-Documents-and-titles-transferred-for-Florida-residents-/',
    hcCanIBuyCa2Ca: '/articles/360042040652-Can-I-buy-vehicles-in-California-as-a-California-resident-/',
    hcBankWireTransfer: '360020781231-How-do-I-make-a-bank-wire-transfer-',
    hcRulesAndPolicies: '/articles/360031300711-Rules-And-Policies',
    hcIsMySecurityDepositRefundable:
      '/articles/360020780711-Is-my-security-deposit-refundable-How-to-release-your-security-deposit',
    hcWhenWillIReceiveMyOwnershipDocument: '/articles/360020513172-When-will-I-receive-my-ownership-documents',
    hcWhenIsMyCarGettingDelivered: '/articles/360025785931-When-is-my-car-getting-delivered',
    hcHowLongWillItTakeToReceiveMyPayment:
      '/articles/360020781631-How-long-will-it-take-for-AutoBidMaster-to-receive-my-payment',
    hcHowDoIUpgradeMyMembership: '/articles/360020781291-How-do-I-upgrade-my-membership',
    hcHowMuchDoesItCostToExport: '/articles/360025487872-How-much-does-it-cost-to-export',
    hcIHavenTReceivedRefund:
      '/articles/360020781311-I-was-told-my-refund-had-been-processed-but-I-haven-t-received-it-yet',
    hcHowToDoInspection: '/articles/360020512532-Can-I-inspect-a-vehicle-I-m-interested-in-in-person',
    hcWhyDoINeedASecurityDeposit:
      '/articles/360049922152-Why-do-I-need-a-security-deposit-and-how-to-increase-the-deposit',
    hcHelpSellMyCar: '/articles/360020512472-Can-AutoBidMaster-help-me-sell-my-car',
    hcPayingForVechicles: '/sections/360003111692-Paying-for-Vehicles',

    // Landings
    importCarsFromUsa: '/copart-auction/import-cars-from-usa-to-:country',
    sellYourCar: '/sell-your-car/',
    sellYourCarOffer: '/sell-your-car/:ref/:hash',
    sellYourCarUpload: '/sell-your-car/upload/:contentType/:ref/:hash',

    // Social networks
    facebookReview: 'https://www.facebook.com/pg/AutoBidMaster/reviews/?ref=page_internal.',
    uaLeadViberInvite:
      'https://invite.viber.com/?g2=AQAvuNfV2mIY1UtowS1%2B3CwY0OJ9jcg3xpAZJpk4mUqc5%2FNxqiskeBR4uJN8aUtA',

    // Easyhaul
    lsa: 'https://www.easyhaul.com/terms/',

    // ClearVin
    clearvin: 'https://www.clearvin.com/',
    clearvinSampleReport: 'https://www.clearvin.com/sample-report',
    clearvinPayment: 'https://www.clearvin.com/:locale/payment/prepare',

    // Partners
    copart: 'https://www.copart.com/',
    easyhaul: 'https://www.easyhaul.com/',
    verisign: 'https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=WWW.AUTOBIDMASTER.COM&lang=en',

    // IAAI LSA
    iaaiLSA: 'https://lsa.autobidmaster.com/',

    // NPA LSA
    npaLSA: 'https://auction-npa.autobidmaster.com/login',
  },

  serializeQueryParams(params = {}) {
    return Object.keys(params)
      .filter((key) => params[key] !== undefined)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  },

  getRoute(routeName, query, noLang = false, params) {
    const queryString = query ? `?${RouterService.serializeQueryParams(query)}` : '';

    let route = RouterService.routes[routeName];
    if (params && route) {
      route = route.replace(/:(\w+)/g, (_, param) => params[param]);
    }
    const path = `${route}${queryString}`;

    return noLang ? path : `${RouterService.lang}${path}`;
  },

  getFullRoute(routeName, query, noLang = false, params) {
    const base = `${window.location.protocol}//${window.location.host}`;
    const route = RouterService.getRoute(routeName, query, noLang, params);

    return `${base}${route}`;
  },

  getLocalizedHcRoute(routeName, locale) {
    const hcBaseRoute = RouterService.getRoute('helpCenter', null, true);
    const userLocale = locale || currentLocale;
    const hsLocalesMap = {
      en: 'en-us',
      es: 'es',
      ru: 'ru',
      uk: 'uk',
      pl: 'pl',
      fr: 'fr',
      ka: 'ka',
      de: 'de',
      ar: 'ar',
      ro: 'ro',
      bg: 'en',
      ko: 'en',
    };

    let localizedHcRoute = `${hcBaseRoute}/hc/${hsLocalesMap[userLocale]}`;

    if (routeName) {
      const hcSpecificRoute = RouterService.getRoute(routeName, null, true);
      localizedHcRoute += hcSpecificRoute;
    }

    return localizedHcRoute;
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
      return ObjectService.parseValues(queryParams);
    } catch (e) {
      return {};
    }
  },

  getQueryParam(key) {
    const params = RouterService.getCurrentQueryParams();

    return params[key];
  },

  addQueryParams(params, opts = {}) {
    const { pushToHistory = false, redirect = false, replaceState = false, paramOrder } = opts;

    const currentQueryParams = RouterService.getCurrentQueryParams();
    let newParams = { ...currentQueryParams, ...params };
    if (paramOrder) {
      newParams = Object.keys(newParams)
        .sort((a, b) => {
          const aOrder = paramOrder[a];
          const bOrder = paramOrder[b];
          const isAFinite = Number.isFinite(aOrder);
          const isBFinite = Number.isFinite(bOrder);
          if (!isAFinite && !isBFinite) {
            return 0;
          }

          if (!isAFinite) {
            return 1;
          }

          if (!isBFinite) {
            return -1;
          }

          return aOrder - bOrder;
        })
        .reduce((acc, key) => {
          acc[key] = newParams[key];

          return acc;
        }, {});
    }

    const queryString = RouterService.serializeQueryParams(newParams);
    if (pushToHistory && RouterService.getQuery() === queryString) {
      return;
    }

    let newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    if (queryString) {
      newUrl += `?${queryString}`;
    }

    if (redirect) {
      RouterService.customRedirect(newUrl);
      return;
    }

    if (pushToHistory && window.history.pushState) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    } else if (replaceState && window.history.replaceState) {
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  },

  setQueryParams(params, opts) {
    const { pushToHistory = false, redirect = false, replaceState = false } = opts;

    const queryString = RouterService.serializeQueryParams(params);
    let newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    if (queryString) {
      newUrl += `?${queryString}`;
    }

    if (pushToHistory && window.history.pushState) {
      window.history.pushState({ path: newUrl }, '', newUrl);
    } else if (replaceState && window.history.replaceState) {
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }

    if (redirect) {
      RouterService.customRedirect(newUrl);
      return true;
    }

    return newUrl;
  },

  replaceLocaleInPath(path = '', locale = currentLocale) {
    const locationParts = path.split('/');
    if (LanguageService.AVAILABLE_LOCALES.includes(locationParts[1])) {
      locationParts[1] = locale;
    } else {
      locationParts.splice(1, 0, locale);
    }

    return locationParts.join('/');
  },

  test(routeName) {
    const route = RouterService.getRoute(routeName);
    const regex = pathToRegexp(route);

    return regex.test(window.location.pathname);
  },

  match(routeName, path = window.location.pathname) {
    const route = RouterService.getRoute(routeName);
    const matchFn = match(route);

    const result = matchFn(path);
    if (result) {
      return result.params;
    }

    return {};
  },

  reload() {
    document.location.reload();
  },

  removeQueryParams(params = [], opts = { replaceState: true }) {
    if (params.length === 0) {
      window.history.replaceState('', '', window.location.href.split('?')[0]);
    }

    const currentQueryParams = RouterService.getCurrentQueryParams();
    params.forEach((name) => {
      delete currentQueryParams[name];
    });
    RouterService.setQueryParams(currentQueryParams, opts);
  },

  fixSpaces(params = {}) {
    return Object.keys(params).reduce((acc, key) => {
      const val = params[key];
      const fixedVal = typeof val === 'string' ? StringService.fixQuerySpaces(val) : val;

      return { ...acc, [key]: fixedVal };
    }, {});
  },

  getHash() {
    return window.location.hash.slice(1);
  },

  getQuery() {
    return window.location.search.split('?')[1];
  },

  setHash(hash) {
    window.location.hash = `#${hash}`;
  },

  redirect(...routeParams) {
    RouterService.customRedirect(RouterService.getRoute(...routeParams));
  },

  customRedirect(url, replace) {
    const parsedUrl = new URL(url, RouterService.getFullRoute('home'));

    const isAbsolutePath = /^(?:[a-z]+:)?\/\//i.test(url);
    const isAnotherHost = parsedUrl.host !== window.location.host;
    const isNotInSPA = !isSPAPath(parsedUrl.pathname);

    if (isAbsolutePath || isAnotherHost || isNotInSPA || !window.isSPAEnv) {
      window.location.href = url;
      return;
    }

    if (replace) {
      browserHistory.replace(url);
    } else {
      browserHistory.push(url);
    }
  },

  replace(...routeParams) {
    RouterService.customRedirect(RouterService.getRoute(...routeParams), true);
  },

  absoluteToRelativeURL(url) {
    const { pathname, search, hash } = new URL(url, RouterService.getFullRoute('home'));

    return [pathname, search, hash].join('');
  },

  isShippingPromoPage() {
    const currentPathPattern = window.location.href;
    const shippingPatterns = ['copart-lp', 'services/auto-shipping-international', 'shipping-order'];

    const routeMatch = shippingPatterns.find((shippingPattern) => currentPathPattern.includes(shippingPattern));
    if (routeMatch) {
      return true;
    }

    const countryCode = BootstrapService.getAppValue('countryCode', CountryService.COUNTRIES.usa.iso2);
    const lotsWonPattern = 'myaccount/lots-won';
    if (countryCode === CountryService.COUNTRIES.usa.iso2 && currentPathPattern.includes(lotsWonPattern)) {
      return true;
    }

    return false;
  },
};

export default RouterService;
