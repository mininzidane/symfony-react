import LanguageService from 'frontend/js/api/LanguageService';
import LandingsRoutes from 'frontend/js/router/config-landings';

const isScrolltopDisabled = true;
const hasLiveAuctionBanner = true;
const exact = true;
const skipHrefSaving = true;
const unauthorizedOnly = true;
const authorizedOnly = true;
const preloadJsx = true;
const isSimpleHeaderWithoutLabel = true;
const isSimpleHeaderDefaultPaddings = true;
const isHeaderDisabled = true;
const isAllNotificationsDisabled = true;
const isFooterDisabled = true;
const superLazy = true; // wait for page's inner lazy content to load

const getSimpleLayout = () => ({
  isSimpleHeader: true,
  isSimpleFooter: true,
  isSiteNotificationsDisabled: true,
  isSiteNotificationsStaticDisabled: true,
  isVideoGuidesNotificationDisabled: true,
});

// If key params is passed, then the same component will be used as a content, pages with the same key should have the same onWillMount param
const SPA_CONFIG = {
  HOME: {
    path: '/',
    exact,
    metaKey: 'homepage',
    hasLiveAuctionBanner,
    superLazy,
  },
  HOW_TO_BUY: {
    path: '/how-to-buy-used-car-in-usa-online',
    exact,
    metaKey: 'how_to_buy',
  },
  AUCTION_LOCATIONS: {
    path: '/carfinder-online-auto-auctions/locations',
    exact,
    metaKey: 'locations_list',
  },
  LOCATION_DETAILS: {
    path: '/locations/:slug',
    exact,
    metaKey: 'location_details',
  },
  SEARCH: {
    path: [
      '/carfinder-online-auto-auctions',
      '/carfinder-online-auto-auctions/finder',
      '/carfinder-online-auto-auctions/:quick_pick(autobidmaster-inventory)',
      '/carfinder-online-auto-auctions/:quick_pick(new-and-used-powersport-vehicles)',
      '/carfinder-online-auto-auctions/:quick_pick(german-car-auctions)',
      '/carfinder-online-auto-auctions/:quick_pick(autobidmaster-used-cars)',
      '/carfinder-online-auto-auctions/salvage-:quick_pick',
      '/carfinder-online-auto-auctions/salvage-:quick_pick/:make',
      '/carfinder-online-auto-auctions/salvage-:quick_pick/:make/:model',
      '/carfinder-online-auto-auctions/salvage-:quick_pick/:make/:model/:years',
      '/carfinder-online-auto-auctions/copart-:sale_location',
      '/carfinder-online-auto-auctions/copart-:sale_location/:sale_date',
      '/carfinder-online-auto-auctions/state-:location_state',
    ],
    preloadJsx,
    exact,
    isScrolltopDisabled,
    superLazy,
  },
  LOT_PAGE: {
    path: ['/carfinder-online-auto-auctions/lot/:lotId/:slug', '/carfinder-online-auto-auctions/lot/:lotId/'],
    preloadJsx,
    exact,
    isScrolltopDisabled,
    superLazy,
  },
  VIDEO_GUIDES: {
    path: '/video-guides',
    metaKey: 'video_guides',
    exact,
  },
  CONTACT_US: {
    path: '/aboutus-copart-broker/contact-us',
    metaKey: 'contact_us',
    isFooterOfficesHidden: true,
    exact,
  },
  TERMS: {
    path: '/terms-and-conditions',
    metaKey: 'terms_and_conditions',
    exact,
  },
  PRIVACY_POLICY: {
    path: '/privacy-policy',
    metaKey: 'privacy_policy',
    exact,
  },
  ACCESS_AND_INCLUSION: {
    path: '/access-and-inclusion',
    metaKey: 'access_and_inclusion',
    exact,
  },
  HOW_DOMESTIC_SHIPPING_WORKS: {
    path: '/how-domestic-shipping-works',
    metaKey: 'how_domestic_shipping_works',
    exact,
  },
  HOW_INTERNATIONAL_SHIPPING_WORKS: {
    path: '/how-international-shipping-works',
    metaKey: 'how_international_shipping_works',
    exact,
  },
  HOW_TO_BUY_NIGERIA: {
    path: '/howtobuy-copart-auto-auctions/nigeria',
    metaKey: 'how_to_buy_nigeria',
    exact,
  },
  TERMS_OF_SERVICE: {
    path: '/terms-of-service',
    metaKey: 'terms_of_service',
    exact,
  },
  SMS_TERMS: {
    path: '/sms-terms',
    metaKey: 'sms_terms',
    exact,
  },
  ABOUT_US: {
    path: '/aboutus-copart-broker',
    metaKey: 'about_us',
    exact,
  },
  AUCTIONS_CALENDAR: {
    path: '/carfinder-online-auto-auctions/calendar',
    exact,
    metaKey: 'auctions_calendar',
    superLazy,
  },
  TODAY_AUCTIONS: {
    path: '/virtualsales-copart-auto-auctions',
    exact,
    metaKey: 'auction_today',
    superLazy,
  },
  TODAY_AUCTIONS_DE: {
    path: '/autoauktionen-in-deutschland/',
    exact,
    metaKey: 'auction_today_de',
    props: {
      isAuctionDe: true,
    },
    superLazy,
  },
  AUCTIONS_DASHBOARD: {
    path: '/virtualsales-copart-auto-auctions/dashboard',
    exact,
    metaKey: 'auction_dashboard',
  },
  AUCTIONS_DASHBOARD_DE: {
    path: '/autoauktionen-in-deutschland/dashboard',
    exact,
    metaKey: 'auction_dashboard_de',
    props: {
      isAuctionDe: true,
    },
  },
  LOGIN: {
    path: '/login',
    exact,
    metaKey: 'login',
    skipHrefSaving,
    unauthorizedOnly,
    ...getSimpleLayout(),
  },
  REGISTER: {
    path: '/register-online-auto-auctions/',
    exact,
    metaKey: 'registration',
    skipHrefSaving,
    unauthorizedOnly,
    ...getSimpleLayout(),
  },
  FORGOT_PASSWORD: {
    path: '/forgot-password',
    exact,
    metaKey: 'forgot_password',
    skipHrefSaving,
    unauthorizedOnly,
    ...getSimpleLayout(),
  },
  RESET_PASSWORD: {
    path: '/forgot-password/reset/:key',
    exact,
    metaKey: 'forgot_password',
    skipHrefSaving,
    unauthorizedOnly,
    ...getSimpleLayout(),
  },
  DASHBOARD: {
    path: ['/myaccount', '/myaccount/upgraded-:plan'],
    authorizedOnly,
    exact,
    metaKey: 'dashboard',
  },
  PURCHASES: {
    key: 'transactions',
    path: '/myaccount/:tab(purchases)',
    authorizedOnly,
    exact,
    metaKey: 'purchases',
  },
  DEPOSITS: {
    key: 'transactions',
    path: '/myaccount/:tab(deposits)',
    authorizedOnly,
    exact,
    metaKey: 'deposits',
  },
  REFUNDS: {
    key: 'transactions',
    path: '/myaccount/:tab(refunds)',
    authorizedOnly,
    exact,
    metaKey: 'refunds',
  },
  CLOSED_TRANSACTIONS: {
    key: 'transactions',
    path: '/myaccount/:tab(closed-transactions)',
    authorizedOnly,
    exact,
    metaKey: 'closed_transactions',
  },
  BILLING_INFORMATION: {
    path: '/myaccount/billing-information',
    authorizedOnly,
    exact,
    metaKey: 'billing_information',
  },
  CONTACT_INFORMATION: {
    path: '/myaccount/contact-information',
    authorizedOnly,
    exact,
    metaKey: 'contact_information',
  },
  SECURITY: {
    path: '/myaccount/security',
    authorizedOnly,
    exact,
    metaKey: 'login_and_password',
  },
  CURRENT_BIDS: {
    key: 'bid-status',
    path: '/myaccount/:tab(current-bids)',
    authorizedOnly,
    exact,
    metaKey: 'current_bids',
  },
  LOTS_WON: {
    key: 'bid-status',
    path: '/myaccount/:tab(lots-won)',
    authorizedOnly,
    exact,
    metaKey: 'lots_won',
  },
  LOTS_LOST: {
    key: 'bid-status',
    path: '/myaccount/:tab(lots-lost)',
    authorizedOnly,
    exact,
    metaKey: 'lots_lost',
  },
  CONTAINERS: {
    key: 'bid-status',
    path: '/myaccount/:tab(containers)',
    authorizedOnly,
    exact,
    metaKey: 'containers',
  },
  WATCHLIST: {
    key: 'saved-vehicles',
    path: '/:path(watchlist)',
    authorizedOnly,
    exact,
    metaKey: 'watchlist',
  },
  SAVED_SEARCHES: {
    key: 'saved-vehicles',
    path: '/:path(saved-searches)',
    authorizedOnly,
    exact,
    metaKey: 'saved_searches',
  },
  DOCUMENTS_AND_IDS: {
    path: '/myaccount/documents',
    exact,
    metaKey: 'documents_and_ids',
  },
  DOCUMENT_SIGN: {
    path: '/myaccount/documents/sign/:token',
    exact,
    metaKey: 'sign_document',
  },
  DOCUMENT_STATUS: {
    path: '/myaccount/documents/status/:token',
    exact,
    metaKey: 'documents',
  },
  BUYER_POWER_PAYMENT: {
    path: '/myaccount/buyer-power/payment',
    exact,
    metaKey: 'bidding_limit',
    authorizedOnly,
    isSimpleHeaderWithoutLabel,
    isSimpleHeaderDefaultPaddings,
    ...getSimpleLayout(),
  },
  MEMBERSHIP_PAYMENT: {
    path: '/myaccount/membership/:plan/payment',
    exact,
    metaKey: 'membership_payment',
    authorizedOnly,
    isSimpleHeaderWithoutLabel,
    isSimpleHeaderDefaultPaddings,
    ...getSimpleLayout(),
  },
  SHIPPING_PAYMENT: {
    path: '/myaccount/shipping/:token/payment',
    exact,
    metaKey: 'shipping_payment',
    authorizedOnly,
    isSimpleHeaderDefaultPaddings,
    ...getSimpleLayout(),
  },
  INVOICE_PAYMENT: {
    path: '/invoice/:token/payment',
    exact,
    metaKey: 'invoice_payment',
    authorizedOnly,
    isSimpleHeaderDefaultPaddings,
    ...getSimpleLayout(),
  },
  CV_REPORT_PAYMENT: {
    path: '/myaccount/cv-report/payment',
    exact,
    metaKey: 'cv_report_payment',
    authorizedOnly,
    isSimpleHeaderDefaultPaddings,
    ...getSimpleLayout(),
  },
  BUYER_POWER: {
    path: '/myaccount/buyer-power',
    authorizedOnly,
    exact,
    metaKey: 'bidding_limit',
  },
  MEMBERSHIP_GUEST_RECEIPT: {
    path: '/myaccount/membership/Guest/receipt',
    authorizedOnly,
    exact,
    metaKey: 'membership_guest_receipt',
    ...getSimpleLayout(),
  },
  MEMBERSHIP_PLANS: {
    path: '/myaccount/membership/plans',
    authorizedOnly,
    exact,
    metaKey: 'membership',
  },
  MEMBERSHIP_RENEWAL_SETTINGS: {
    path: '/myaccount/renewal-settings',
    authorizedOnly,
    exact,
    metaKey: 'renewal_settings',
  },
  BROKER_MANAGER: {
    path: '/myaccount/broker-manager',
    authorizedOnly,
    exact,
    metaKey: 'broker_manager',
  },
  REGISTER_CONGRATULATIONS: {
    path: '/register-online-auto-auctions/congratulations',
    authorizedOnly,
    exact,
    ...getSimpleLayout(),
  },
  VEHICLE_CALCULATOR_PRINT: {
    path: '/vehicle-calculator-print',
    metaKey: 'vehicle_calc_print',
    exact,
    isAllNotificationsDisabled,
    isHeaderDisabled,
    isFooterDisabled,
  },
  DOCUMENTS_UPLOAD_PAGE: {
    path: '/wt-upload',
    metaKey: 'wire_transfer_upload_page',
    authorizedOnly,
    exact,
    ...getSimpleLayout(),
  },
  // DISPUTE_RESOLUTION: {
  //   path: "/dispute-resolution",
  //   metaKey: "dispute_resolution",
  //   exact,
  // },
  TRACKING: {
    path: '/shipping-order/:emailOrToken/:vin',
    metaKey: 'shipping_order_tracking',
    exact,
  },
  TESTIMONIALS: {
    path: '/auto-auction-reviews',
    metaKey: 'testimonial',
    exact,
  },
  UNSUBSCRIBE: {
    path: '/unsubscribe/:email/:userId',
    exact,
    ...getSimpleLayout(),
  },
  BROKER_PAGE: {
    path: '/best-broker',
    metaKey: 'best_broker',
    exact,
    isHeaderDisabled,
    unauthorizedOnly,
  },
  SELL_YOUR_CAR: {
    path: '/sell-your-car/:version(v2)?/',
    metaKey: 'lp_sell_your_car',
    exact,
    isAllNotificationsDisabled,
  },
  LOUNGE_PAGE: {
    path: '/lounges/:country',
    isFooterOfficesHidden: true,
    isSeoLocalBusinessDisabled: true,
  },
  SELL_YOUR_CAR_REF: {
    path: '/sell-your-car/:ref/:hash',
    metaKey: 'lp_sell_your_car',
    exact,
    isAllNotificationsDisabled,
    isHeaderDisabled,
    isFooterDisabled,
    isScrolltopDisabled,
  },
  SELL_YOUR_CAR_UPLOAD: {
    path: '/sell-your-car/upload/:contentType/:ref/:hash',
    metaKey: 'lp_sell_your_car',
    exact,
    ...getSimpleLayout(),
    isAllNotificationsDisabled,
  },

  ...LandingsRoutes,

  NOT_FOUND: {
    path: '',
    props: {
      errorCode: '404',
    },
    ...getSimpleLayout(),
  },
};

(function addLangSupportToConfig() {
  const addLangSupportToPath = (path, locales = LanguageService.AVAILABLE_LOCALES) =>
    `/:locale(${locales.join('|')})${path}`;

  Object.keys(SPA_CONFIG).forEach((key) => {
    const { path } = SPA_CONFIG[key];

    if (SPA_CONFIG[key].noLocales || !path) {
      return;
    }

    if (Array.isArray(path)) {
      SPA_CONFIG[key].path = path.map((p) => addLangSupportToPath(p, SPA_CONFIG[key].locales));
      return;
    }

    SPA_CONFIG[key].path = addLangSupportToPath(path, SPA_CONFIG[key].locales);
  });
})();

export default SPA_CONFIG;
