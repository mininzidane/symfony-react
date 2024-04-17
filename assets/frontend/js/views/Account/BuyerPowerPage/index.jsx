import React, { useState, useEffect } from 'react';
import LotService from 'frontend/js/api/LotService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import { Collapse } from '@material-ui/core';
import PaymentService from 'frontend/js/api/PaymentService';
import Container from 'frontend/js/components/Container';
import ArrowSvg from 'frontend/images/shared/various/arrow-left-squared.svg';
import CustomerService from 'frontend/js/api/CustomerService';
import RouterService from 'frontend/js/api/RouterService';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import MembershipService from 'frontend/js/api/MembershipService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import AboveLimitAlert from './Alerts/AboveLimitAlert';
import UpgradeRequiredAlert from './Alerts/UpgradeRequiredAlert';
import ZeroDepositAlert from './Alerts/ZeroDepositAlert';
import usePrepareMembershipTypes from './usePrepareMembershipTypes';
import PendingRefunds from './Transactions/PendingRefunds';
import ClosedRefunds from './Transactions/ClosedRefunds';
import Deposits from './Transactions/Deposits';
import InfoCard from './InfoCard';
import Calculator from './Calculator';
import useStyles from './useStyles';
import CaptionPanelSection from './CaptionPanelSection';

function getDepositValueFromMpb(value) {
  return value / BuyerPowerService.depositToBuyerPowerRatio;
}

function DepositsPage() {
  const COLLAPSE_ANIMATION_TIMEOUT = 300;
  const { getRoute, getQueryParam, getCurrentQueryParams } = RouterService;
  const { minDepositThreshold } = BuyerPowerService;
  const membershipTypes = usePrepareMembershipTypes();
  const {
    id,
    biddingAmountLimit,
    membershipType: customerMembershipType,
    balance,
    blAmount,
    blRemainingAmount,
  } = useCustomerHelper();

  // MPB = maximum possible bid
  const MIN_MPB = Math.min(minDepositThreshold, biddingAmountLimit || Infinity);
  const MAX_MPB = 50000;
  const MPB_STEP = 100;

  const urlMbpParam = parseInt(getQueryParam('amount'), 10);
  const initialMbp = urlMbpParam && urlMbpParam > blAmount && urlMbpParam > MIN_MPB ? urlMbpParam : null;
  const [currentMpb, setCurrentMpb] = useState(blAmount);
  const [totalDeposit, setTotalDeposit] = useState(balance);
  const [availableDeposit, setAvailableDeposit] = useState(getDepositValueFromMpb(blRemainingAmount));

  const isCurrentMbpZero = currentMpb === 0;
  const isMbpAboveLimit = currentMpb > MAX_MPB;

  const [membershipUpgrade, setMembershipUpgrade] = useState(null);
  const [isZeroDepositAlertShown, setZeroDepositAlertShown] = useState(false);
  const [isAboveLimitAlertShown, setAboveLimitAlertShown] = useState(false);
  const [isUpgradeRequiredAlertShown, setUpgradeRequiredAlertShown] = useState(false);
  const [vehiclesAvailableNumber, setVehiclesAvailableNumber] = useState(
    customerMembershipType?.biddingLimitCount || null,
  );

  const classes = useStyles();
  const levelsToUpgrade = [MembershipService.LEVEL.BASIC, MembershipService.LEVEL.ADVANCED];

  function checkMembershipUpgradeRequired(value) {
    let maxBiddingAmountLimit = null;
    membershipTypes?.forEach((mType) => {
      if (mType.biddingAmountLimit && mType.biddingAmountLimit > maxBiddingAmountLimit) {
        maxBiddingAmountLimit = mType.biddingAmountLimit;
      }
    });
    const upgradeMembership = membershipTypes?.find((mType) => {
      if (!levelsToUpgrade.includes(mType.level)) {
        return null;
      }
      if (
        customerMembershipType?.biddingLimitAmount &&
        mType.level > customerMembershipType.level &&
        mType.biddingAmountLimit &&
        value <= mType.biddingAmountLimit &&
        value > customerMembershipType?.biddingLimitAmount
      ) {
        return true;
      }
      if (mType.level > customerMembershipType.level && !mType.biddingAmountLimit && value > maxBiddingAmountLimit) {
        return true;
      }
      return null;
    });
    if (upgradeMembership) {
      return membershipTypes?.find((item) => item.level === upgradeMembership.level) || null;
    }
    return null;
  }

  function updateVehiclesAvailableNumber(value) {
    const membership = checkMembershipUpgradeRequired(value);

    setVehiclesAvailableNumber(
      membership ? membership.purchaseLimit : customerMembershipType?.biddingLimitCount || null,
    );
  }

  function handleMpbChange(value) {
    const membership = checkMembershipUpgradeRequired(value);
    setMembershipUpgrade(membership);
    setUpgradeRequiredAlertShown(Boolean(membership) && value < MAX_MPB);

    setAboveLimitAlertShown(value >= MAX_MPB);
    setZeroDepositAlertShown(isCurrentMbpZero && value === MIN_MPB);
    updateVehiclesAvailableNumber(value);
  }

  function getUpdatedMpb() {
    CustomerService.getCustomer()
      .then((response) => {
        const { customer: customerObj } = response;

        if (customerObj) {
          setCurrentMpb(customerObj.blAmount);
          setTotalDeposit(customerObj.balance);
          setAvailableDeposit(getDepositValueFromMpb(customerObj.blRemainingAmount));
          updateVehiclesAvailableNumber(customerObj.blAmount);
        }
      })
      .catch(null);
  }

  function handleSuccessfulDepositRelease(refundType) {
    if (PaymentService.REFUNDABLE_METHODS.includes(refundType)) {
      getUpdatedMpb();
    }
  }

  // Page caption
  const [pageCaption, setPageCaption] = useState();

  async function updateCaption() {
    const { lotId, slug = '' } = getCurrentQueryParams();

    if (lotId) {
      const data = await LotService.getLotDetails(lotId);
      const { lot } = data || {};

      if (lot) {
        setPageCaption(
          <>
            <a href={getRoute('lot', null, false, { id: lotId, slug })} className="has-extra-hitbox">
              <img src={ArrowSvg} alt="←" />
            </a>
            <div>
              <FormattedMessage
                id="depositsPage.captionLotSpecific"
                values={{ vehicle: `${lot.year} ${lot.make} ${lot.model}` }}
              />
            </div>
          </>,
        );
      }
    }
  }

  useEffect(() => {
    updateCaption();

    if (id) {
      LocalStorageService.set(`user${id}_is_bp_visited`, true);
    }
  }, []);

  useEffect(() => {
    if (!membershipTypes) {
      return;
    }
    handleMpbChange(initialMbp || currentMpb || MIN_MPB);
  }, [membershipTypes]);

  return (
    <TabsContainer defaultTab="increaseBuyerPower">
      <CaptionPanelSection />

      <Container className={classes.container}>
        <TabContent id="increaseBuyerPower">
          <div>
            {pageCaption && <h2 className={classes.caption}>{pageCaption}</h2>}

            <div className={classes.notificationContainer}>
              <Collapse in={isZeroDepositAlertShown} timeout={COLLAPSE_ANIMATION_TIMEOUT} mountOnEnter unmountOnExit>
                <div>
                  <ZeroDepositAlert currentPossibleBid={biddingAmountLimit || minDepositThreshold} />
                </div>
              </Collapse>

              <Collapse
                in={isUpgradeRequiredAlertShown}
                timeout={COLLAPSE_ANIMATION_TIMEOUT}
                mountOnEnter
                unmountOnExit
              >
                <div>
                  <UpgradeRequiredAlert currentPossibleBid={biddingAmountLimit || minDepositThreshold} />
                </div>
              </Collapse>

              <Collapse in={isAboveLimitAlertShown} timeout={COLLAPSE_ANIMATION_TIMEOUT} mountOnEnter unmountOnExit>
                <div>
                  <AboveLimitAlert />
                </div>
              </Collapse>
            </div>

            <div className={classes.cardsContainer}>
              <Calculator
                onMbpChange={handleMpbChange}
                currentMbp={currentMpb}
                initialMbp={initialMbp}
                minMbp={currentMpb || MIN_MPB}
                maxMbp={MAX_MPB}
                mbpStep={MPB_STEP}
                membershipUpgrade={membershipUpgrade}
                isMbpAboveLimit={isMbpAboveLimit}
                totalDeposit={totalDeposit}
                vehiclesAvailableNumber={vehiclesAvailableNumber}
              />
              <InfoCard totalDeposit={totalDeposit} availableDeposit={availableDeposit} />
            </div>

            <div className={classes.deposits} id="buyer-power-page-deposits-table">
              <div className={classes.depositsTitle}>
                <FormattedMessage id="depositsPage.depositsTransactions" />
              </div>
              <Deposits onReleaseSuccess={handleSuccessfulDepositRelease} />
            </div>
          </div>
        </TabContent>

        <TabContent id="pendingRefunds">
          <PendingRefunds />
        </TabContent>
        <TabContent id="closed">
          <ClosedRefunds />
        </TabContent>
      </Container>
    </TabsContainer>
  );
}

export default DepositsPage;
