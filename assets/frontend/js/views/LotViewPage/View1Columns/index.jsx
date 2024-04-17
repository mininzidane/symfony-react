import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import LotService from 'frontend/js/api/LotService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import useCounterBiddingAvailable from 'frontend/js/hooks/useCounterBiddingAvailable';
import CountryService from 'frontend/js/api/CountryService';
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

function View1Columns({
  id,
  lot,
  auction,
  isAbmInventory,
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
  const showCounterBidding = useCounterBiddingAvailable(lot);

  return (
    <OrderedSuspenseProvider onDone={onContentLoad} order={['bid-info', 'rest']}>
      <div className={classes.root}>
        {!isAbmInventory && (
          <Suspense fallback={null}>
            <SalesHistory lot={lot} initialExpanded={isLotSold} />
          </Suspense>
        )}

        <Suspense fallback={<div style={{ height: 50 }} />}>
          <GoogleAd
            id="div-gpt-ad-1657813261273-0"
            className="width-sm-300 spacer-sm-50 mt-15 pb-3"
            placement="ldp_faq"
            adUnitPath="/93216436/LOT-Page-TOP-728x90-300x50"
            pubTargetsArray={['page', ['lot_page']]}
            targetsArray={['page_spot', ['top_1']]}
            withSlot
          />
        </Suspense>

        <PhotoViewer lot={lot} />

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

        <OrderedSuspenseWrapper block="rest">
          <LotDetails lot={lot} />

          {isIaaAuction && <IaaLotDescription lot={lot} />}

          {isNpaAuction && <VehicleConditionReport lot={lot} />}

          {isClearvinBannerShown && (
            <ObservableBlock
              placeholder={<ClearVinDetails lotId={id} lot={lot} auction={auction} loader />}
              content={<ClearVinDetails lotId={id} lot={lot} auction={auction} />}
            />
          )}

          <GoogleAd
            id="div-gpt-ad-1668109203311-0"
            className="width-sm-300"
            adUnitPath={
              isDomestic
                ? '/93216436/ABM-US-ldp-right-300x250-320x100'
                : '/93216436/ABM-WW-ldp-middle-logged-in-300x250-320x100'
            }
            pubTargetsArray={['page', ['lot_page']]}
            targetsArray={['page_spot', ['top_1']]}
            mobileSize={[320, 100]}
            withSlot
          />

          {isShippingPromoShown && (
            <ShippingQuoteContextProvider>
              <ShippingPromo lot={lot} isAbmInventory={isAbmInventory} />
            </ShippingQuoteContextProvider>
          )}

          {!isLotSold && !isIaaAuction && <SaleInformation lot={lot} isAbmInventory={isAbmInventory} />}
          {!isLotSold && isIaaAuction && <IaaSaleInformation lot={lot} />}

          <AdButlerBanner lot={lot} />

          {!isAbmInventory && <AlertsForm lot={lot} />}

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

          <GoogleAd
            id="div-gpt-ad-1657813261273-2"
            className="width-xl-728 width-sm-300"
            placement="ldp_top"
            adUnitPath="/93216436/LOT-Page-New-728x90-300x50"
            pubTargetsArray={['page', ['lot_page']]}
            targetsArray={['page_spot', ['top_1']]}
            withSlot
          />

          {isFAQShown && <Faq lot={lot} />}

          <ObservableBlock
            placeholder={<div style={{ height: 535 }} />}
            content={
              <Suspense fallback={<div style={{ height: 535 }} />}>
                <RelatedVehicles lot={lot} placeholder={<div style={{ height: 535 }} />} />
              </Suspense>
            }
          />

          <GoogleAd
            id="div-gpt-ad-1668110039670-0"
            className="width-sm-300 mb-20"
            adUnitPath={
              isDomestic
                ? '/93216436/ABM-US-ldp-bottom-728x90-320x100'
                : '/93216436/ABM-WW-ldp-bottom-logged-out-728x90-320x100'
            }
            pubTargetsArray={['page', ['lot_page']]}
            targetsArray={['page_spot', ['top_1']]}
            mobileSize={[320, 100]}
            withSlot
          />
        </OrderedSuspenseWrapper>
      </div>
    </OrderedSuspenseProvider>
  );
}

View1Columns.propTypes = {
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

View1Columns.defaultProps = {
  lot: undefined,
  customer: undefined,
  isClearvinBannerShown: undefined,
  auction: undefined,
  ymmSearchLink: '',
  isAbmInventory: false,
  onContentLoad: () => {},
};

export default View1Columns;
