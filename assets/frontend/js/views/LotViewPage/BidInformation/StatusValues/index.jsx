import React from 'react';
import { Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import LotService from 'frontend/js/api/LotService';
import useIntl from 'frontend/js/hooks/useIntl';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import BidService from 'frontend/js/api/BidService';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import BidStatusLabel from 'frontend/js/components/BidStatusLabel';
import BidShape from 'frontend/js/lib/propshapes/BidShape';
import useRecommendedBid from 'frontend/js/hooks/useRecommendedBid';
import Link from 'frontend/js/components/Link';
import SaleDateTimer from './SaleDateTimer';

function StatusValues({
  lotState,
  timeout,
  currentBid,
  bidStatus,
  customerBid,
  lot,
  isAuthenticated,
  isGuestMembership,
  formType,
  serverResponse,
  inventoryAuction,
}) {
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;
  if (serverResponse && serverResponse.bidStatus === BidService.STATUS_YOU_WON && isAbmInventory) {
    return null;
  }

  const { currency, currencyFeeFormat, sellerReserveMet, saleStatus } = lot;
  const isOnMinimum = saleStatus === LotService.SALE_STATUS_ON_MINIMUM_BID_CODE;
  const [recommendedBid, isRecommendedBidLoading] = useRecommendedBid(lot.id, lot.inventoryAuction);
  const { formatCurrency } = NumberService;

  const intl = useIntl();
  const bidStatusKey = bidStatus.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
  const isCounterBidStatus = BidService.isCounterBidStatus(bidStatus);

  let tagIndex = 0;
  let brIndex = 0;
  const translationSets = {
    bidStatusTooltipContent: intl.formatMessage(
      {
        id: 'bid.status.tooltip',
      },
      {
        div: (chunks) => <div>{chunks}</div>,
        strong: (chunks) => {
          tagIndex += 1;
          return <strong key={`strong${tagIndex}`}>{chunks}</strong>;
        },
        doubleline: () => {
          brIndex += 1;

          return (
            <span key={`br${brIndex}`}>
              <br />
              <br />
            </span>
          );
        },
      },
    ),
    bidStatus: intl.formatMessage({ id: `bid.status.${bidStatusKey}` }),
    labelBidStatus: intl.formatMessage({ id: 'shared.label.bidStatus' }),
    labelMaxBid: intl.formatMessage({ id: 'shared.label.yourMaxBid' }),
    currentBid: intl.formatMessage({ id: 'shared.label.currentBid' }),
    recommendedBid: intl.formatMessage({ id: 'lotPage.recommendedBid' }),
    sellerReserve: intl.formatMessage({ id: 'shared.label.sellerReserve' }),
    notYetMet: intl.formatMessage({ id: 'lotPage.bidInformation.sellerReserve.notYetMet' }),
    met: intl.formatMessage({ id: 'lotPage.bidInformation.sellerReserve.met' }),
    sellerReserveTooltip: intl.formatMessage({ id: 'lotPage.bidInformation.sellerReserve.tooltip' }),
    recommendedBidTooltip: intl.formatMessage({ id: 'lotPage.recommendedBid.tooltip' }),
    timeLeft: intl.formatMessage({ id: 'shared.label.timeLeft' }),
    timerTooltip: intl.formatMessage({ id: 'lotPage.timerTooltip' }),
    authToView: intl.formatMessage(
      {
        id: 'lotPage.authToView',
      },
      {
        a: (chunks) => (
          <span
            className="bid-information__auth-link"
            rel="noopener noreferrer"
            role="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
            onKeyPress={() => window.dispatchEvent(new CustomEvent('openAuthModal'))}
            tabIndex={0}
          >
            <strong>{chunks}</strong>
          </span>
        ),
      },
    ),
    upgradeToView: intl.formatMessage(
      {
        id: 'lotPage.upgradeToView',
      },
      {
        a: (chunks) => <Link href={RouterService.getRoute('membershipPlans')}>{chunks}</Link>,
      },
    ),
  };

  let currentCustomerBid = 0;
  if (customerBid) {
    currentCustomerBid = customerBid.maxBid || 0;
  }

  const isOpen = ![
    LotStatusStates.CONFIRM_PRELIMINARY_BID,
    LotStatusStates.CONFIRM_INCREASE_BID,
    LotStatusStates.CONFIRM_MAKE_AN_OFFER,
    LotStatusStates.CONFIRM_BUY_IT_NOW,
    LotStatusStates.CONFIRM_KEEP_BID,
    LotStatusStates.CONFIRM_COUNTER_BID,
    LotStatusStates.CONFIRM_ACCEPT_BID,
    LotStatusStates.ERROR_UPLOAD_ID,
    LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP,
    LotStatusStates.ERROR_INVALID_INCREMENT,
    LotStatusStates.ERROR_INVALID_AMOUNT,
    LotStatusStates.ERROR_BP_INCREASE,
    LotStatusStates.ERROR_INVALID_BID_AMOUNT,
    LotStatusStates.PENDING,
    LotStatusStates.WON,
  ].includes(lotState);

  return (
    <Collapse in={isOpen} timeout={timeout} unmountOnExit mountOnEnter>
      <div className="card-content__container bid-information__status-wrap is-lot-page-v2">
        <div className="bid-information__status-values is-lot-page-v2">
          {!!bidStatus && (
            <div className="bid-information__status-value is-lot-page-v2">
              <span>{translationSets.labelBidStatus}:</span>
              <div>
                <BidStatusLabel bidStatus={bidStatus} />
                <TooltipOnHover
                  content={translationSets.bidStatusTooltipContent}
                  isFlipEnabled={false}
                  maxWidth={510}
                  badgeTop={-1}
                  placement="bottom-end"
                />
              </div>
            </div>
          )}

          {!isRecommendedBidLoading && (recommendedBid !== null || !isAuthenticated || isGuestMembership) && (
            <div className="bid-information__status-value is-lot-page-v2">
              <span>{translationSets.recommendedBid}:</span>

              <div>
                {isAuthenticated ? (
                  <strong className="bid-information__status-text">
                    {isGuestMembership
                      ? translationSets.upgradeToView
                      : formatCurrency(recommendedBid, currencyFeeFormat)}
                  </strong>
                ) : (
                  <strong className="bid-information__status-text">{translationSets.authToView}</strong>
                )}
                <TooltipOnHover content={translationSets.recommendedBidTooltip} badgeTop={-1} placement="bottom-end" />
              </div>
            </div>
          )}

          {currentCustomerBid > 0 && (
            <div className="bid-information__status-value is-price is-lot-page-v2">
              <span>{translationSets.labelMaxBid}:</span>
              <strong className="bid-information__status-price bid-information__status-text">
                {formatCurrency(currentCustomerBid, currencyFeeFormat)}&nbsp;<span>{currency}</span>
              </strong>
            </div>
          )}

          {currentBid !== null && !isCounterBidStatus && (
            <div className="bid-information__status-value is-price is-lot-page-v2">
              <span>{translationSets.currentBid}:</span>

              <div className="bid-information__status-price bid-information__status-text is-lot-page-v2">
                {formatCurrency(currentBid, currencyFeeFormat)}&nbsp;<span>{currency}</span>
              </div>
            </div>
          )}

          {isOnMinimum && sellerReserveMet !== null && (
            <div className="bid-information__status-value is-lot-page-v2">
              <span>{translationSets.sellerReserve}:</span>

              <div className="bid-information__status-text">
                <strong>{sellerReserveMet ? translationSets.met : translationSets.notYetMet}</strong>
                <TooltipOnHover content={translationSets.sellerReserveTooltip} badgeTop={-1} placement="bottom-end" />
              </div>
            </div>
          )}

          {lot.saleDateTimeLeft && (
            <div className="bid-information__status-value is-lot-page-v2">
              <span>{translationSets.timeLeft}:</span>

              <div>
                <SaleDateTimer
                  lot={lot}
                  date={lot.saleDateTimeLeft}
                  isCounterBidState={formType === LotStatusStates.FORM_COUNTER_BID}
                />
                &nbsp;
                <TooltipOnHover
                  content={translationSets.timerTooltip}
                  isFlipEnabled={false}
                  maxWidth={320}
                  badgeTop={-1}
                  placement="bottom-end"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Collapse>
  );
}

StatusValues.propTypes = {
  lotState: PropTypes.string,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
  bidStatus: PropTypes.string,
  inventoryAuction: PropTypes.string,
  currentBid: PropTypes.number,
  serverResponse: PropTypes.object,
  formType: PropTypes.string,
  customerBid: BidShape,
  lot: LotShape,
  isAuthenticated: PropTypes.bool,
  isGuestMembership: PropTypes.bool,
};

StatusValues.defaultProps = {
  lotState: '',
  bidStatus: '',
  formType: '',
  inventoryAuction: '',
  currentBid: null,
  timeout: 'auto',
  customerBid: null,
  lot: null,
  isAuthenticated: false,
  isGuestMembership: false,
  serverResponse: null,
};

export default StatusValues;
