import ReactService from 'frontend/js/lib/utils/ReactService';

export const GoogleAd = ReactService.lazyWithPreload(() => import('frontend/js/components/GoogleAd'));
export const ShippingQuoteContextProvider = ReactService.lazyWithPreload(() =>
  import('frontend/js/context/ShippingQuoteContext'),
);
export const ObservableBlock = ReactService.lazyWithPreload(() => import('frontend/js/components/ObservableBlock'));
export const VehicleConditionReport = ReactService.lazyWithPreload(() => import('./VehicleConditionReport'));
export const AdButlerBanner = ReactService.lazyWithPreload(() => import('./AdButlerBanner'));
export const ShippingPromo = ReactService.lazyWithPreload(() => import('./ShippingPromo'));
export const LotDetails = ReactService.lazyWithPreload(() => import('./LotDetails'));
export const BidInformation = ReactService.lazyWithPreload(() => import('./BidInformation'));
export const BidInformationSold = ReactService.lazyWithPreload(() => import('./BidInformationSold'));
export const CounterBidding = ReactService.lazyWithPreload(() => import('./CounterBidding'));
export const ClearVinDetails = ReactService.lazyWithPreload(() => import('./ClearVinDetails'));
export const SaleInformation = ReactService.lazyWithPreload(() => import('./SaleInformation'));
export const SalesHistory = ReactService.lazyWithPreload(() => import('./SalesHistory'));
export const Faq = ReactService.lazyWithPreload(() => import('./Faq'));
export const LeadGenerationForm = ReactService.lazyWithPreload(() => import('./LeadGenerationForm'));
export const VehicleCalculatorBlockPlaceholder = ReactService.lazyWithPreload(() =>
  import('./VehicleCalculatorBlock/Placeholder'),
);
export const AlertsForm = ReactService.lazyWithPreload(() => import('./AlertsForm'));
export const IaaLotDescription = ReactService.lazyWithPreload(() => import('./IaaLotDescription'));
export const IaaSaleInformation = ReactService.lazyWithPreload(() => import('./IaaSaleInformation'));
export const RelatedVehicles = ReactService.lazyWithPreload(() => import('./RelatedVehicles'));
export const VehicleCalculatorBlock = ReactService.lazyWithPreload(() => import('./VehicleCalculatorBlock'));
