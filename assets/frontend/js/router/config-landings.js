import { useParams } from 'react-router-dom';
import CountryService from 'frontend/js/api/CountryService';
import OAuthCookieService from 'frontend/js/api/OAuthCookieService';

const exact = true;
const unauthorizedOnly = true;
const isHeaderDisabled = true;
const isAllNotificationsDisabled = true;
const isFooterDisabled = true;

const getSimpleLayout = () => ({
  isSimpleHeader: true,
  isSimpleFooter: true,
  isSiteNotificationsDisabled: true,
  isSiteNotificationsStaticDisabled: true,
  isVideoGuidesNotificationDisabled: true,
});

const LANDINGS_EASY_TO_USE_GROUP_SETTINGS = {
  isHeaderDisabled,
  isAllNotificationsDisabled,
  unauthorizedOnly,
  exact,
};

const COUNTRY_LP_NAMES = [
  'Canada',
  'United Kingdom',
  'Bahamas',
  'Belize',
  'Curacao',
  'Ghana',
  'Benin',
  'Liberia',
  'Mali',
  'Togo',
  'Senegal',
  'Niger',
  'Mauritania',
  'Netherlands',
  'Mexico',
  'Guatemala',
  'El Salvador',
  'Honduras',
  'Costa Rica',
  'Dominican Republic',
  'Bolivia',
  'Panama',
  'Venezuela',
  'Peru',
  'Nicaragua',
  'Paraguay',
];

const LANDINGS_EASY_TO_USE_GROUP = {
  LANDING_100: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/disc-100',
    metaKey: 'disc_100',
  },
  LANDING_150: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/disc-150',
    metaKey: 'disc_150',
  },
  LANDING_B_IS_FOR_BUILD: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/b-is-for-build',
    metaKey: 'b_is_for_build',
    locales: ['en'],
  },
  LANDING_LP4: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/lp4',
    metaKey: 'lp4',
  },
  LANDING_GHPC: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/ghpc',
    metaKey: 'ghpc',
    locales: ['en'],
  },
  LANDING_LEGIT_STREET_CARS: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/legit-street-cars',
    metaKey: 'legit-street-cars',
  },
  LANDING_MOTION_AUTO_TV: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/motion-auto-tv',
    metaKey: 'motion_auto_tv',
    locales: ['en'],
  },
  LANDING_TAVARISH: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/tavarish',
    metaKey: 'tavarish',
    locales: ['en'],
  },
  LANDING_TJ_HUNT: {
    ...LANDINGS_EASY_TO_USE_GROUP_SETTINGS,
    path: '/tj-hunt',
    metaKey: 'tj-hunt',
    locales: ['en'],
  },
};

export default {
  LANDING_SHIPPING_NIGERIA: {
    path: '/services/auto-shipping-to-nigeria',
    metaKey: 'auto_shipping_nigeria',
    exact,
  },
  LANDING_INTERNATIONAL_AUTO_SHIPPING: {
    path: '/services/international-auto-shipping',
    metaKey: 'international_auto_shipping',
    exact,
  },
  LANDING_LP1: {
    path: ['/lp1', '/lp3'],
    isHeaderDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    exact,
  },
  LANDING_LP2: {
    path: '/lp2',
    isHeaderDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    exact,
  },
  LANDING_CHECKOUT_INTL_SHIPPING: {
    path: '/copart-lp',
    isAllNotificationsDisabled,
    isHeaderDisabled,
    metaKey: 'copart_lp',
    exact,
    ...getSimpleLayout(),
  },
  LANDING_SALVADOR_COPART_LOUNGE: {
    path: '/salvador-copart-lounge',
    metaKey: 'salvador_copart_lounge',
    isHeaderDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    exact,
    onWillMount: () => {
      OAuthCookieService.set(OAuthCookieService.SOURCE.COPART_LATAM);
    },
  },
  LANDING_SALVADOR_COPART_LOUNGE_BUSINESS: {
    path: '/salvador-copart-lounge-:isBusiness(business)',
    metaKey: 'salvador_copart_lounge_business_lp',
    isHeaderDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    exact,
    onWillMount: () => {
      OAuthCookieService.set(OAuthCookieService.SOURCE.COPART_LATAM);
    },
  },
  LANDING_STATE_CALIFORNIA: {
    path: '/lp/state-california',
    exact,
    isHeaderDisabled,
    isFooterDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    metaKey: 'lp_state_california',
  },
  LANDING_STATE_TEXAS: {
    path: '/lp/state-texas',
    exact,
    isHeaderDisabled,
    isFooterDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    metaKey: 'lp_state_texas',
  },
  LANDING_STATE_FLORIDA: {
    path: '/lp/state-florida',
    exact,
    isHeaderDisabled,
    isFooterDisabled,
    isAllNotificationsDisabled,
    unauthorizedOnly,
    metaKey: 'lp_state_florida',
  },
  LANDING_BUSINESS: {
    path: '/business',
    exact,
    isAllNotificationsDisabled,
    metaKey: 'business',
  },
  LANDING_LOUNGE_OPERATOR: {
    path: '/open-lounge-for-wholesale-used-cars-from-the-usa',
    isAllNotificationsDisabled,
    metaKey: 'open_lounge',
  },
  LANDING_AUTO_SHIPPING: {
    path: '/services/auto-shipping-international',
    exact,
    isAllNotificationsDisabled,
    metaKey: 'auto_shipping_international',
  },
  LANDING_NIGERIA: {
    path: '/:pageType(cheki)-nigeria',
    exact,
    isHeaderDisabled,
    isAllNotificationsDisabled,
    metaKey: 'cheki_nigeria',
  },
  LANDING_NIGERIA_COPART: {
    path: '/:pageType(copart)-nigeria',
    exact,
    isHeaderDisabled,
    isAllNotificationsDisabled,
    metaKey: 'copart_nigeria',
    onWillMount: () => {
      OAuthCookieService.set(OAuthCookieService.SOURCE.NG);
    },
  },
  LANDING_BROKER_COUNTRY: {
    path: '/broker-:country(ua|ru|ge)',
    isHeaderDisabled,
    unauthorizedOnly,
    metaKey: 'broker_country',
    onWillMount: () => {
      const { country } = useParams();

      const OAuthSourceMap = {
        ua: OAuthCookieService.SOURCE.UA,
        ru: OAuthCookieService.SOURCE.UA,
        ge: OAuthCookieService.SOURCE.GE,
      };

      OAuthCookieService.set(OAuthSourceMap[country]);
    },
  },
  LANDING_BROKER_COUNTRY_BY: {
    path: '/kupit-avto-iz-ssha-v-belarusi',
    isHeaderDisabled,
    unauthorizedOnly,
    metaKey: 'broker_country',
    props: {
      country: CountryService.COUNTRIES.belarus.iso2,
    },
    onWillMount: () => {
      OAuthCookieService.set(OAuthCookieService.SOURCE.BY);
    },
  },
  LANDING_COUNTRY: {
    path: `/copart-auction/import-cars-from-usa-to-:countryPath(${COUNTRY_LP_NAMES.join('|')
      .toLocaleLowerCase()
      .replace(/\s/gi, '-')})`,
    isAllNotificationsDisabled,
  },
  LANDING_UKRAINE_REPRESENTATIVE: {
    path: '/ukraine-representative',
    isHeaderDisabled,
    isAllNotificationsDisabled,
    metaKey: 'ukraine_representative',
  },
  LANDING_FINANCING: {
    path: '/services/salvage-auto-loans',
    isAllNotificationsDisabled,
    metaKey: 'financing',
  },
  LANDING_DOMESTIC_SHIPPING: {
    path: '/services/domestic-vehicle-transport',
  },
  LANDING_CLEARVIN_HISTORY_REPORT: {
    path: '/services/clearvin-vehicle-history-reports',
    metaKey: 'clearvin_history_report',
  },
  LANDING_BROKER: {
    path: '/lp-broker',
    isHeaderDisabled,
    isFooterDisabled,
    isAllNotificationsDisabled,
  },
  LANDING_NEW_AND_USED_MOTORCYCLES: {
    path: '/new-and-used-motorcycles',
    exact,
    isAllNotificationsDisabled,
  },
  LANDING_GERMAN_CAR_AUCTIONS: {
    path: '/german-car-auctions',
    exact,
    isAllNotificationsDisabled,
  },
  ...LANDINGS_EASY_TO_USE_GROUP,
};
