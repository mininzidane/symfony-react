import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import LotService from 'frontend/js/api/LotService';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
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

function View2Columns({
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
  isMembershipPromoShown,
  isFAQShown,
  ymmSearchLink,
  onContentLoad,
}) {
  const classes = useStyles();
  const isIaaAuction = auction === LotService.AUCTION_IAA;
  const isNpaAuction = auction === LotService.AUCTION_NPA;
  const showCounterBidding = useCounterBiddingAvailable(lot);

  return (
    <OrderedSuspenseProvider onDone={onContentLoad} order={['details', 'bid-info', 'left', 'right', 'bottom']}>
      <div className={classes.root}>
        {!isAbmInventory && (
          <Suspense fallback={null}>
            <div>
              <SalesHistory lot={lot} initialExpanded={isLotSold} />
            </div>
          </Suspense>
        )}

        <div className={classes.center}>
          <div className={classes.left}>
            <PhotoViewer lot={lot} />

            <OrderedSuspenseWrapper block="details">
              <LotDetails lot={lot} />
            </OrderedSuspenseWrapper>

            <OrderedSuspenseWrapper block="left">
              {isIaaAuction && <IaaLotDescription lot={lot} />}
              {isNpaAuction && <VehicleConditionReport lot={lot} />}
              {isClearvinBannerShown && (
                <ObservableBlock
                  placeholder={<ClearVinDetails lotId={id} lot={lot} auction={auction} loader />}
                  content={<ClearVinDetails lotId={id} lot={lot} auction={auction} />}
                />
              )}
              {!isLotSold && isMembershipPromoShown && !isAbmInventory && <AlertsForm lot={lot} />}
            </OrderedSuspenseWrapper>
          </div>

          <div className={classes.right}>
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

            <OrderedSuspenseWrapper block="right">
              {isShippingPromoShown && (
                <ShippingQuoteContextProvider>
                  <ShippingPromo lot={lot} isAbmInventory={isAbmInventory} />
                </ShippingQuoteContextProvider>
              )}

              {!isLotSold && !isIaaAuction && <SaleInformation lot={lot} isAbmInventory={isAbmInventory} />}
              {!isLotSold && isIaaAuction && <IaaSaleInformation lot={lot} />}

              <AdButlerBanner lot={lot} />

              {(isLotSold || !isMembershipPromoShown) && <AlertsForm lot={lot} />}
            </OrderedSuspenseWrapper>
          </div>
        </div>

        <OrderedSuspenseWrapper block="bottom">
          <div>
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
              id="div-gpt-ad-1657813261273-0"
              className="width-xl-728 width-sm-300"
              placement="ldp_faq"
              adUnitPath="/93216436/LOT-Page-New-728x90-300x50"
              pubTargetsArray={['page', ['lot_page']]}
              targetsArray={['page_spot', ['top_1']]}
              withSlot
            />

            {isFAQShown && <Faq lot={lot} />}

            <ObservableBlock
              placeholder={<div style={{ height: 540 }} />}
              content={
                <Suspense fallback={<div style={{ height: 540 }} />}>
                  <RelatedVehicles lot={lot} placeholder={<div style={{ height: 540 }} />} />
                </Suspense>
              }
            />
          </div>
        </OrderedSuspenseWrapper>
      </div>
    </OrderedSuspenseProvider>
  );
}

View2Columns.propTypes = {
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
  isMembershipPromoShown: PropTypes.bool.isRequired,
  auction: PropTypes.string,
  isAbmInventory: PropTypes.bool,
  ymmSearchLink: PropTypes.string,
  onContentLoad: PropTypes.func,
};

View2Columns.defaultProps = {
  lot: undefined,
  customer: undefined,
  isClearvinBannerShown: undefined,
  auction: undefined,
  isAbmInventory: false,
  ymmSearchLink: '',
  onContentLoad: () => {},
};

export default View2Columns;
