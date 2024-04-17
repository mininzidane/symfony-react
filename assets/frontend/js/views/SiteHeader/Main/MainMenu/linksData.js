import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import t from 'frontend/js/api/TranslatorService';
import CountryService from 'frontend/js/api/CountryService';
import LanguageService from 'frontend/js/api/LanguageService';
import contactLinks from './contactLinks';

const { getRoute } = RouterService;
const abmInventoryFilter = BootstrapService.isAvailableAuction(AuctionService.AUCTIONS.ABM);
const copartDeInventoryFilter = BootstrapService.isAvailableAuction(AuctionService.AUCTIONS.COPART_DE);
const isCurrentLocaleDe = LanguageService.isCurrentLocale(LanguageService.LOCALES.DE);

const linksData = [
  {
    title: t('header.main_menu.how_to_buy'),
    link: getRoute('howToBuy'),
  },
  {
    title: t('header.main_menu.find_vehicles'),
    lazyLoad: {
      id: 'findVehicles',
    },
    links: [
      {
        label: t('vehicleFinderPage.cards.featuredItems.title'),
        id: 'featured',
      },
      {
        label: t('vehicleFinderPage.cards.popularMakes.title'),
        id: 'popular',
      },
      {
        label: t('vehicleFinderPage.cards.vehicleTypes.title'),
        id: 'types',
      },
      {
        label: t('vehicleFinderPage.cards.bodyStyles.title'),
        id: 'bodyStyles',
      },
      {
        label: t('vehicleFinderPage.cards.damageTypes.title'),
        id: 'damageTypes',
      },
      {
        label: t('vehicleFinderPage.cards.ownershipDocTypes.title'),
        id: 'ownershipDocTypes',
      },
      {
        viewAllHref: getRoute('locations'),
        label: t('vehicleFinderPage.cards.searchByState.title'),
        id: 'locationStates',
      },
    ],
  },
  {
    title: t('header.main_menu.live_auctions'),
    links: [
      {
        href: getRoute('todayAuctionsGermany'),
        label: t('header.main_menu.carAuctionsInGermany'),
        isVisible: () => copartDeInventoryFilter && isCurrentLocaleDe,
      },
      { href: getRoute('todayAuctions'), label: t('header.main_menu.todays_auctions') },
      { href: getRoute('auctionCalendar'), label: t('header.main_menu.auction_calendar') },
      { href: getRoute('joinAuctions'), label: t('header.main_menu.join_auctions') },
      { href: getRoute('locations'), label: t('header.main_menu.locations') },
      {
        href: getRoute('todayAuctionsGermany'),
        label: t('header.main_menu.carAuctionsInGermany'),
        isVisible: () => copartDeInventoryFilter && !isCurrentLocaleDe,
        type: 'highlightedNewItem',
      },
    ],
  },
  {
    title: t('header.main_menu.shipping'),
    link: getRoute('internationalShipping'),
    isVisible: () => !CountryService.isDomestic(CountryService.getUserCountryIso2()),
  },
  {
    title: t('header.main_menu.support'),
    links: contactLinks,
  },
  {
    title: t('shared.links.services'),
    links: [
      { href: getRoute('vehicleHistoryReports'), label: t('shared.links.vehicleHistoryReports') },
      { href: getRoute('domesticVehicleTransportation'), label: t('shared.links.domesticVehicleTransportation') },
      { href: getRoute('internationalShipping'), label: t('shared.links.internationalShipping') },
      { href: getRoute('businessBuyers'), label: t('shared.links.businessBuyers') },
      {
        href: getRoute('salvageAutoLoans'),
        label: t('landings.financing.title'),
        isVisible: () => CountryService.isUsa(),
      },
    ],
  },
  {
    title: t('header.main_menu.sell_your_car'),
    link: getRoute('sellYourCar'),
    isVisible: () => CountryService.isUsa(),
    type: 'highlightedNewItem',
  },
  {
    title: t('header.main_menu.cars_in_stock'),
    link: getRoute('abmSearch'),
    isVisible: () => Boolean(abmInventoryFilter),
    type: 'highlightedNewItem',
  },
];

export default linksData;
