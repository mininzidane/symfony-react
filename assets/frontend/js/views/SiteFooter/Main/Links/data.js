import t from 'frontend/js/api/TranslatorService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import RouterService from 'frontend/js/api/RouterService';
import CountryService from 'frontend/js/api/CountryService';
import AuctionService from 'frontend/js/api/AuctionService';
import importCarsFromUsaLink from './importCarsFromUsaLink';

const abmInventoryFilter = BootstrapService.isAvailableAuction(AuctionService.AUCTIONS.ABM);
const { getRoute, getLocalizedHcRoute } = RouterService;

const data = {
  finder: {
    title: t('footer.links.vehicleFinder'),
    links: [
      { label: t('footer.links.cars'), href: `${getRoute('searchResults')}salvage-cars/` },
      { label: t('footer.links.suvs'), href: `${getRoute('searchResults')}salvage-suv-crossovers/` },
      { label: t('footer.links.pickupTrucks'), href: `${getRoute('searchResults')}salvage-pickups/` },
      { label: t('footer.links.motorcycles'), href: `${getRoute('searchResults')}salvage-motorcycles/` },
      { label: t('footer.links.classics'), href: `${getRoute('searchResults')}salvage-classics/` },
      { label: t('footer.links.rvs'), href: `${getRoute('searchResults')}salvage-rvs/` },
      { label: t('footer.links.atvs'), href: `${getRoute('searchResults')}salvage-atvs/` },
      { label: t('footer.links.noDamage'), href: `${getRoute('searchResults')}salvage-no-damage/` },
      { label: t('footer.links.cleanTitles'), href: `${getRoute('searchResults')}salvage-clean-title/` },
      {
        label: t('footer.links.runs&Drives'),
        href: `${getRoute('searchResults')}salvage-runs-and-drives/`,
      },
      { label: t('footer.links.floodDamage'), href: `${getRoute('searchResults')}salvage-flood-damage/` },
      { label: t('footer.links.vandalism'), href: `${getRoute('searchResults')}salvage-vandalism/` },
      { label: t('footer.links.hailDamage'), href: `${getRoute('searchResults')}salvage-hail-damage/` },
      { label: t('footer.links.buyItNow'), href: `${getRoute('searchResults')}salvage-buy-it-now/` },
    ],
  },
  auctions: {
    title: t('footer.links.auctions'),
    links: [
      { label: t('footer.links.searchAuctions'), href: getRoute('searchResults') },
      { label: t('footer.links.auctionLocations'), href: getRoute('locations') },
      { label: t('footer.links.auctionCalendar'), href: getRoute('auctionCalendar') },
      { label: t('footer.links.todayAuctions'), href: getRoute('todayAuctions') },
    ],
  },
  support: {
    title: t('footer.links.support'),
    links: [
      { label: t('footer.links.videoGuides'), href: getRoute('videoGuides') },
      { label: t('footer.links.howToBuy'), href: getRoute('howToBuy') },
      { label: t('footer.links.helpCenter'), href: getLocalizedHcRoute() },
      { label: t('footer.links.registerToBuy'), href: getRoute('register') },
      { label: t('footer.links.contactUs'), href: getRoute('contactUs') },
    ],
  },
  services: {
    title: t('shared.links.services'),
    links: [
      { label: t('shared.links.vehicleHistoryReports'), href: getRoute('vehicleHistoryReports') },
      {
        label: t('shared.links.domesticVehicleTransportation'),
        href: getRoute('domesticVehicleTransportation'),
      },
      { label: t('shared.links.internationalShipping'), href: getRoute('internationalShipping') },
      { label: t('shared.links.businessBuyers'), href: getRoute('businessBuyers') },
      ...importCarsFromUsaLink,
      {
        label: t('landings.financing.title'),
        href: getRoute('salvageAutoLoans'),
        isVisible: () => CountryService.isUsa(),
      },
      {
        label: t('header.main_menu.sell_your_car'),
        href: getRoute('sellYourCar'),
        isVisible: () => CountryService.isUsa(),
      },
      {
        label: t('header.main_menu.cars_in_stock'),
        href: getRoute('abmSearch'),
        isVisible: () => Boolean(abmInventoryFilter),
      },
    ],
  },
  companyInfo: {
    title: t('footer.links.companyInformation'),
    links: [
      { label: t('footer.links.aboutAutobidmaster'), href: getRoute('aboutUs') },
      { label: t('footer.links.termsAndConditions'), href: getRoute('terms') },
      { label: t('footer.links.rulesAndPolicies'), href: RouterService.getLocalizedHcRoute('hcRulesAndPolicies') },
      { label: t('footer.links.accessAndInclusion'), href: getRoute('accessAndInclusion') },
      {
        label: t('footer.links.autoBidMasterReviews'),
        href: getRoute('autoBidMasterReviews'),
      },
    ],
  },
};

export default data;
