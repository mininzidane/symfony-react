import ReactService from 'frontend/js/lib/utils/ReactService';
import SPA_CONFIG from './config';

const ROUTES = [
  {
    ...SPA_CONFIG.HOME,
    jsx: () => import('../views/HomePage'),
  },
  {
    ...SPA_CONFIG.HOW_TO_BUY,
    jsx: () => import('../views/Support/HowToBuyPage'),
  },
  {
    ...SPA_CONFIG.AUCTION_LOCATIONS,
    jsx: () => import('../views/LocationsPage'),
  },
  {
    ...SPA_CONFIG.LOCATION_DETAILS,
    jsx: () => import('../views/LocationDetailsPage'),
  },
  {
    ...SPA_CONFIG.SEARCH,
    jsx: () => import('../views/SearchResultsPage'),
  },
  {
    ...SPA_CONFIG.LOT_PAGE,
    jsx: () => import('../views/LotViewPage'),
  },
  {
    ...SPA_CONFIG.VIDEO_GUIDES,
    jsx: () => import('../views/Support/VideoGuidesPage'),
  },
  {
    ...SPA_CONFIG.CONTACT_US,
    jsx: () => import('../views/Support/ContactUsPage'),
  },
  {
    ...SPA_CONFIG.TERMS,
    jsx: () => import('../views/Support/TermsPage'),
  },
  {
    ...SPA_CONFIG.PRIVACY_POLICY,
    jsx: () => import('../views/Support/PrivacyPolicyPage'),
  },
  {
    ...SPA_CONFIG.ACCESS_AND_INCLUSION,
    jsx: () => import('../views/Support/AccessAndInclusionPage'),
  },
  {
    ...SPA_CONFIG.HOW_DOMESTIC_SHIPPING_WORKS,
    jsx: () => import('../views/Support/HowShippingWorks/HowDomesticShippingWorksPage'),
  },
  {
    ...SPA_CONFIG.HOW_INTERNATIONAL_SHIPPING_WORKS,
    jsx: () => import('../views/Support/HowShippingWorks/HowInternationalShippingWorksPage'),
  },
  {
    ...SPA_CONFIG.HOW_TO_BUY_NIGERIA,
    jsx: () => import('../views/Support/HowToBuyNigeriaPage'),
  },
  {
    ...SPA_CONFIG.TERMS_OF_SERVICE,
    jsx: () => import('../views/Support/TermsOfServicePage'),
  },
  {
    ...SPA_CONFIG.SMS_TERMS,
    jsx: () => import('../views/Support/SmsTermsPage'),
  },
  {
    ...SPA_CONFIG.ABOUT_US,
    jsx: () => import('../views/AboutUsPage'),
  },
  {
    ...SPA_CONFIG.AUCTIONS_CALENDAR,
    jsx: () => import('../views/Auctions/AuctionsCalendarPage'),
  },
  {
    ...SPA_CONFIG.TODAY_AUCTIONS,
    jsx: () => import('../views/Auctions/TodayAuctionsPage'),
  },
  {
    ...SPA_CONFIG.TODAY_AUCTIONS_DE,
    jsx: () => import('../views/Auctions/TodayAuctionsPage'),
  },
  {
    ...SPA_CONFIG.AUCTIONS_DASHBOARD,
    jsx: () => import('../views/Auctions/JoinAuctionsPage'),
  },
  {
    ...SPA_CONFIG.AUCTIONS_DASHBOARD_DE,
    jsx: () => import('../views/Auctions/JoinAuctionsPage'),
  },
  {
    ...SPA_CONFIG.LOGIN,
    jsx: () => import('../views/Auth/LoginPage'),
  },
  {
    ...SPA_CONFIG.REGISTER,
    jsx: () => import('../views/Auth/RegisterPage'),
  },
  {
    ...SPA_CONFIG.FORGOT_PASSWORD,
    jsx: () => import('../views/Auth/ForgotPasswordPage'),
  },
  {
    ...SPA_CONFIG.RESET_PASSWORD,
    jsx: () => import('../views/Auth/ResetPasswordPage'),
  },
  {
    ...SPA_CONFIG.DASHBOARD,
    jsx: () => import('../views/Account/DashboardPage'),
  },
  {
    ...SPA_CONFIG.PURCHASES,
    jsx: () => import('../views/Account/TransactionsPage'),
  },
  {
    ...SPA_CONFIG.DEPOSITS,
    jsx: () => import('../views/Account/TransactionsPage'),
  },
  {
    ...SPA_CONFIG.REFUNDS,
    jsx: () => import('../views/Account/TransactionsPage'),
  },
  {
    ...SPA_CONFIG.CLOSED_TRANSACTIONS,
    jsx: () => import('../views/Account/TransactionsPage'),
  },
  {
    ...SPA_CONFIG.BILLING_INFORMATION,
    jsx: () => import('../views/Account/BillingInformationPage'),
  },
  {
    ...SPA_CONFIG.CONTACT_INFORMATION,
    jsx: () => import('../views/Account/ContactInformationPage'),
  },
  {
    ...SPA_CONFIG.SECURITY,
    jsx: () => import('../views/Account/SecurityPage'),
  },
  {
    ...SPA_CONFIG.CURRENT_BIDS,
    jsx: () => import('../views/Account/BidStatusPage'),
  },
  {
    ...SPA_CONFIG.LOTS_WON,
    jsx: () => import('../views/Account/BidStatusPage'),
  },
  {
    ...SPA_CONFIG.LOTS_LOST,
    jsx: () => import('../views/Account/BidStatusPage'),
  },
  {
    ...SPA_CONFIG.CONTAINERS,
    jsx: () => import('../views/Account/BidStatusPage'),
  },
  {
    ...SPA_CONFIG.WATCHLIST,
    jsx: () => import('../views/Account/SavedVehiclesPage'),
  },
  {
    ...SPA_CONFIG.SAVED_SEARCHES,
    jsx: () => import('../views/Account/SavedVehiclesPage'),
  },
  {
    ...SPA_CONFIG.DOCUMENTS_AND_IDS,
    jsx: () => import('../views/Account/DocumentsAndIds/DocumentsPage'),
  },
  {
    ...SPA_CONFIG.DOCUMENT_SIGN,
    jsx: () => import('../views/Account/DocumentsAndIds/DocumentSignPage'),
  },
  {
    ...SPA_CONFIG.DOCUMENT_STATUS,
    jsx: () => import('../views/Account/DocumentsAndIds/DocumentStatusPage'),
  },
  {
    ...SPA_CONFIG.BUYER_POWER_PAYMENT,
    jsx: () => import('../views/Payment/BuyerPowerPaymentPage'),
  },
  {
    ...SPA_CONFIG.MEMBERSHIP_PAYMENT,
    jsx: () => import('../views/Payment/MembershipPaymentPage'),
  },
  {
    ...SPA_CONFIG.SHIPPING_PAYMENT,
    jsx: () => import('../views/Payment/ShippingPaymentPage'),
  },
  {
    ...SPA_CONFIG.INVOICE_PAYMENT,
    jsx: () => import('../views/Payment/InvoicePaymentPage'),
  },
  {
    ...SPA_CONFIG.CV_REPORT_PAYMENT,
    jsx: () => import('../views/Payment/CVReportPaymentPage'),
  },
  {
    ...SPA_CONFIG.BUYER_POWER,
    jsx: () => import('../views/Account/BuyerPowerPage'),
  },
  {
    ...SPA_CONFIG.MEMBERSHIP_GUEST_RECEIPT,
    jsx: () => import('../views/Payment/GuestMembershipReceiptPage'),
  },
  {
    ...SPA_CONFIG.MEMBERSHIP_PLANS,
    jsx: () => import('../views/Account/MembershipPlansPage'),
  },
  {
    ...SPA_CONFIG.MEMBERSHIP_RENEWAL_SETTINGS,
    jsx: () => import('../views/Account/MembershipRenewalPage'),
  },
  {
    ...SPA_CONFIG.BROKER_MANAGER,
    jsx: () => import('../views/Account/BrokerManagerPage'),
  },
  {
    ...SPA_CONFIG.REGISTER_CONGRATULATIONS,
    jsx: () => import('../views/Account/RegisterCongratulationsPage'),
  },
  {
    ...SPA_CONFIG.VEHICLE_CALCULATOR_PRINT,
    jsx: () => import('../views/VehicleCalculatorPrintPage'),
  },
  {
    ...SPA_CONFIG.DOCUMENTS_UPLOAD_PAGE,
    jsx: () => import('../views/DocumentsUploadPage'),
  },
  {
    ...SPA_CONFIG.TRACKING,
    jsx: () => import('../views/TrackingPage'),
  },
  {
    ...SPA_CONFIG.TESTIMONIALS,
    jsx: () => import('../views/TestimonialsPage'),
  },
  {
    ...SPA_CONFIG.UNSUBSCRIBE,
    jsx: () => import('../views/UnsubscribePage'),
  },
  {
    ...SPA_CONFIG.BROKER_PAGE,
    jsx: () => import('../views/BestBrokerPage'),
  },
  {
    ...SPA_CONFIG.SELL_YOUR_CAR,
    jsx: () => import('../views/SellYourCar'),
  },
  {
    ...SPA_CONFIG.SELL_YOUR_CAR_REF,
    jsx: () => import('../views/SellYourCar'),
  },
  {
    ...SPA_CONFIG.SELL_YOUR_CAR_UPLOAD,
    jsx: () => import('../views/SellYourCar/InstantOfferUploadPage'),
  },
  {
    ...SPA_CONFIG.LANDING_SHIPPING_NIGERIA,
    jsx: () => import('../views/Landings/Services/AutoShippingToNigeriaPage'),
  },
  {
    ...SPA_CONFIG.LANDING_INTERNATIONAL_AUTO_SHIPPING,
    jsx: () => import('../views/Landings/Services/InternationalAutoShippingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_LP1,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Lp1'),
  },
  {
    ...SPA_CONFIG.LANDING_LP2,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Lp2'),
  },
  {
    ...SPA_CONFIG.LANDING_CHECKOUT_INTL_SHIPPING,
    jsx: () => import('../views/Landings/CheckoutIntlShippingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_SALVADOR_COPART_LOUNGE,
    jsx: () => import('../views/Landings/SalvadorCopartLoungePage'),
  },
  {
    ...SPA_CONFIG.LANDING_SALVADOR_COPART_LOUNGE_BUSINESS,
    jsx: () => import('../views/Landings/SalvadorCopartLoungePage'),
  },
  {
    ...SPA_CONFIG.LANDING_STATE_CALIFORNIA,
    jsx: () => import('../views/StateLandingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_STATE_TEXAS,
    jsx: () => import('../views/StateLandingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_STATE_FLORIDA,
    jsx: () => import('../views/StateLandingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_BUSINESS,
    jsx: () => import('../views/Landings/BusinessPage'),
  },
  {
    ...SPA_CONFIG.LANDING_LOUNGE_OPERATOR,
    jsx: () => import('../views/Landings/LoungeOperatorRecruitmentPage'),
  },
  {
    ...SPA_CONFIG.LANDING_AUTO_SHIPPING,
    jsx: () => import('../views/Landings/AutoShippingInternational'),
  },
  {
    ...SPA_CONFIG.LANDING_NIGERIA,
    jsx: () => import('../views/Landings/CopartNigeriaPage'),
  },
  {
    ...SPA_CONFIG.LANDING_NIGERIA_COPART,
    jsx: () => import('../views/Landings/CopartNigeriaPage'),
  },
  {
    ...SPA_CONFIG.LANDING_BROKER_COUNTRY,
    jsx: () => import('../views/Landings/BrokerCountryPage'),
  },
  {
    ...SPA_CONFIG.LANDING_BROKER_COUNTRY_BY,
    jsx: () => import('../views/Landings/BrokerCountryPage'),
  },
  {
    ...SPA_CONFIG.LANDING_COUNTRY,
    jsx: () => import('../views/Landings/CountryPage'),
  },
  {
    ...SPA_CONFIG.LANDING_UKRAINE_REPRESENTATIVE,
    jsx: () => import('../views/Landings/UkraineRepresentative'),
  },
  {
    ...SPA_CONFIG.LANDING_FINANCING,
    jsx: () => import('../views/Landings/Financing'),
  },
  {
    ...SPA_CONFIG.LANDING_DOMESTIC_SHIPPING,
    jsx: () => import('../views/Landings/Services/DomesticShippingPage'),
  },
  {
    ...SPA_CONFIG.LANDING_CLEARVIN_HISTORY_REPORT,
    jsx: () => import('../views/Landings/Services/ClearVinHistoryReportPage'),
  },
  {
    ...SPA_CONFIG.LANDING_BROKER,
    jsx: () => import('../views/Landings/BrokerPage'),
  },
  {
    ...SPA_CONFIG.LANDING_100,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Disc100'),
  },
  {
    ...SPA_CONFIG.LANDING_150,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Disc150'),
  },
  {
    ...SPA_CONFIG.LANDING_B_IS_FOR_BUILD,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/BIsForBuild'),
  },
  {
    ...SPA_CONFIG.LANDING_LP4,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Lp4'),
  },
  {
    ...SPA_CONFIG.LANDING_GHPC,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Ghpc'),
  },
  {
    ...SPA_CONFIG.LANDING_LEGIT_STREET_CARS,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/LegitStreetCars'),
  },
  {
    ...SPA_CONFIG.LANDING_MOTION_AUTO_TV,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/MotionAutoTv'),
  },
  {
    ...SPA_CONFIG.LANDING_TAVARISH,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/Tavarish'),
  },
  {
    ...SPA_CONFIG.LANDING_TJ_HUNT,
    jsx: () => import('../views/Landings/AbmIsEasyToUse/TjHunt'),
  },
  {
    ...SPA_CONFIG.LOUNGE_PAGE,
    jsx: () => import('../views/Landings/LoungePage'),
  },
  {
    ...SPA_CONFIG.LANDING_NEW_AND_USED_MOTORCYCLES,
    jsx: () => import('../views/Landings/NewAndUsedMotorcyclesPage'),
  },
  {
    ...SPA_CONFIG.LANDING_GERMAN_CAR_AUCTIONS,
    jsx: () => import('../views/Landings/GermanCarAuctions'),
  },
];

ROUTES.push({
  ...SPA_CONFIG.NOT_FOUND,
  jsx: () => import('../views/ErrorPage'),
});

(function addContentFromJsx() {
  const content = {};

  ROUTES.forEach((route) => {
    const { jsx, key } = route;

    if (key) {
      content[key] = content[key] ?? ReactService.lazyWithPreload(jsx);
    }

    route.content = content[key] ?? ReactService.lazyWithPreload(jsx);
  });
})();

export default ROUTES;
