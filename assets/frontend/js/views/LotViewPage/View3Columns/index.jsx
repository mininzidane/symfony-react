import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import LotService from 'frontend/js/api/LotService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import CountryService from 'frontend/js/api/CountryService';
import useCounterBiddingAvailable from 'frontend/js/hooks/useCounterBiddingAvailable';
import OrderedSuspenseProvider from 'frontend/js/components/Suspense/Ordered/Provider';
import OrderedSuspenseWrapper from 'frontend/js/components/Suspense/Ordered/Wrapper';
import PhotoViewer from '../PhotoViewer';
import {
  GoogleAd,
  ShippingQuoteContextProvider,
  ObservableBlock,
  VehicleConditionReport,
  AdButlerBanner,
  ShippingPromo,
  LotDetails,
  BidInformation,
  BidInformationSold,
  CounterBidding,
  ClearVinDetails,
  SaleInformation,
  SalesHistory,
  Faq,
  LeadGenerationForm,
  VehicleCalculatorBlockPlaceholder,
  AlertsForm,
  IaaLotDescription,
  IaaSaleInformation,
  RelatedVehicles,
  VehicleCalculatorBlock,
} from '../lazy';
import useStyles from './useStyles';

function View3Columns({
  id,
  auction,
  isAbmInventory,
  lot,
  customer,
  setCustomer,
  isLotSold,
  isClearvinBannerShown,
  userCountryIso2,
  isVehicleCalculatorShown,
  isShippingPromoShown,
  isFAQShown,
  ymmSearchLink,
  onContentLoad,
}) {
  const classes = useStyles();
  const isIaaAuction = auction === LotService.AUCTION_IAA;
  const isNpaAuction = auction === LotService.AUCTION_NPA;
  const isDomestic = CountryService.isDomestic();
  const showRightAdBlock = isDomestic || (!isDomestic && customer);
  const showBottomAdBlock = isDomestic || (!isDomestic && !customer);
  const showCounterBidding = useCounterBiddingAvailable(lot);

  return (
    <OrderedSuspenseProvider onDone={onContentLoad} order={['details', 'bid-info', 'middle', 'left', 'bottom']}>
      <div className={classes.root}>
        <Suspense fallback={<div style={{ height: 90 }} />}>
          <div className={classes.ads}>
            <GoogleAd
              id="div-gpt-ad-1657813261273-1"
              className="width-xl-728 spacer-xl-90"
              placement="ldp_faq_top"
              adUnitPath="/93216436/LOT-Page-TOP-728x90-300x50"
              pubTargetsArray={['page', ['lot_page']]}
              targetsArray={['page_spot', ['top_1']]}
              withSlot
            />
          </div>
        </Suspense>

        {!isAbmInventory && (
          <Suspense fallback={null}>
            <div className={classes.salesHistory}>
              <SalesHistory lot={lot} initialExpanded={isLotSold} />
            </div>
          </Suspense>
        )}

        <div className={classes.vehicle}>
          <PhotoViewer lot={lot} />

          <OrderedSuspenseWrapper block="left">
            {isShippingPromoShown && (
              <ShippingQuoteContextProvider>
                <ShippingPromo lot={lot} isAbmInventory={isAbmInventory} isWideView />
              </ShippingQuoteContextProvider>
            )}
            {isVehicleCalculatorShown && (
              <ObservableBlock
                placeholder={<VehicleCalculatorBlockPlaceholder />}
                content={
                  <Suspense fallback={<VehicleCalculatorBlockPlaceholder />}>
                    <VehicleCalculatorBlock lot={lot} />
                  </Suspense>
                }
              />
            )}
          </OrderedSuspenseWrapper>
        </div>

        <div className={classes.details}>
          <OrderedSuspenseWrapper block="details">
            <LotDetails lot={lot} />
          </OrderedSuspenseWrapper>

          <OrderedSuspenseWrapper block="middle">
            {isIaaAuction && <IaaLotDescription lot={lot} />}
            {isNpaAuction && <VehicleConditionReport lot={lot} />}
            {isClearvinBannerShown && (
              <ObservableBlock
                placeholder={<ClearVinDetails lotId={id} lot={lot} auction={auction} loader />}
                content={<ClearVinDetails lotId={id} lot={lot} auction={auction} />}
              />
            )}
            {!isLotSold && !isAbmInventory && <AlertsForm lot={lot} />}
            {!isDomestic && (
              <GoogleAd
                desktopSize={[300, 250]}
                id="div-gpt-ad-1668109203311-1"
                className="width-xl-300 mt-10 mb-10"
                adUnitPath="/93216436/ABM-WW-ldp-middle-logged-in-300x250-320x100"
                pubTargetsArray={['page', ['lot_page']]}
                targetsArray={['page_spot', ['top_1']]}
                withSlot
              />
            )}
          </OrderedSuspenseWrapper>
        </div>

        <div className={classes.actions}>
          <OrderedSuspenseWrapper block="bid-info">
            {showCounterBidding ? (
              <CounterBidding lot={lot} />
            ) : (
              <ShippingQuoteContextProvider>
                {!isLotSold ? (
                  <>
                    <BidInformation customer={customer} lot={lot} onCustomerUpdate={setCustomer} />
                    <LeadGenerationForm
                      countryCode={userCountryIso2}
                      customer={customer}
                      lotId={id}
                      isAbmInventory={isAbmInventory}
                    />
                  </>
                ) : (
                  <BidInformationSold lot={lot} ymmSearchLink={ymmSearchLink} />
                )}
              </ShippingQuoteContextProvider>
            )}
          </OrderedSuspenseWrapper>

          <OrderedSuspenseWrapper block="middle">
            {!isLotSold && !isIaaAuction && <SaleInformation lot={lot} isAbmInventory={isAbmInventory} />}
            {!isLotSold && isIaaAuction && <IaaSaleInformation lot={lot} />}
            <AdButlerBanner lot={lot} />
            {showRightAdBlock && (
              <GoogleAd
                desktopSize={[300, 250]}
                id="div-gpt-ad-1668109203311-0"
                className="width-xl-300 mt-10 mb-10"
                adUnitPath={
                  isDomestic
                    ? '/93216436/ABM-US-ldp-right-300x250-320x100'
                    : '/93216436/ABM-WW-ldp-middle-logged-in-300x250-320x100'
                }
                pubTargetsArray={['page', ['lot_page']]}
                targetsArray={['page_spot', ['top_1']]}
                withSlot
              />
            )}

            {isLotSold && <AlertsForm lot={lot} />}
          </OrderedSuspenseWrapper>
        </div>

        <div className={classes.faq}>
          <OrderedSuspenseWrapper block="middle">
            {isFAQShown && <Faq lot={lot} />}
            <GoogleAd
              id="div-gpt-ad-1657813261273-0"
              className="width-xl-728 width-sm-300"
              placement="ldp_faq"
              adUnitPath="/93216436/LOT-Page-New-728x90-300x50"
              pubTargetsArray={['page', ['lot_page']]}
              targetsArray={['page_spot', ['bottom_1']]}
              withSlot
            />
          </OrderedSuspenseWrapper>
        </div>

        <OrderedSuspenseWrapper block="bottom">
          <div className={classes.relatedVehicles}>
            <ObservableBlock
              placeholder={<div style={{ height: 600 }} />}
              content={
                <Suspense fallback={<div style={{ height: 600 }} />}>
                  <RelatedVehicles lot={lot} placeholder={<div style={{ height: 600 }} />} />
                </Suspense>
              }
            />
          </div>

          {showBottomAdBlock && (
            <div className={classes.moreAds}>
              <GoogleAd
                id="div-gpt-ad-1668110039670-0"
                className="width-xl-728 mt-10 mb-10"
                adUnitPath={
                  isDomestic
                    ? '/93216436/ABM-US-ldp-bottom-728x90-320x100'
                    : '/93216436/ABM-WW-ldp-bottom-logged-out-728x90-320x100'
                }
                pubTargetsArray={['page', ['lot_page']]}
                targetsArray={['page_spot', ['top_1']]}
                withSlot
              />
            </div>
          )}
        </OrderedSuspenseWrapper>
      </div>
    </OrderedSuspenseProvider>
  );
}

View3Columns.propTypes = {
  id: PropTypes.string.isRequired,
  lot: LotShape,
  customer: PropTypes.object,
  setCustomer: PropTypes.func.isRequired,
  isLotSold: PropTypes.bool.isRequired,
  isClearvinBannerShown: PropTypes.bool,
  userCountryIso2: PropTypes.string.isRequired,
  isVehicleCalculatorShown: PropTypes.bool.isRequired,
  isShippingPromoShown: PropTypes.bool.isRequired,
  isFAQShown: PropTypes.bool.isRequired,
  auction: PropTypes.string,
  isAbmInventory: PropTypes.bool,
  ymmSearchLink: PropTypes.string,
  onContentLoad: PropTypes.func,
};

View3Columns.defaultProps = {
  lot: undefined,
  customer: undefined,
  isClearvinBannerShown: undefined,
  auction: undefined,
  isAbmInventory: false,
  ymmSearchLink: '',
  onContentLoad: () => {},
};

export default View3Columns;
