import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotFeesShape from 'frontend/js/lib/propshapes/LotFeesShape';
import LotService from 'frontend/js/api/LotService';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import BidInformationInput from '../../BidInformationInput';
import IncrementalBidGuidelinesLink from '../IncrementalBidGuidelinesLink';
import FeesCalculator from './FeesCalculator';
import BidType from './BidType';
import useStyles from './useStyles';

function BidNow({
  customer,
  lot,
  fees,
  currentBid,
  customerMaxBid,
  startBid,
  startBidMinimum,
  maxBid,
  bidType,
  isStartBidAvailable,
  onStartBidChange,
  onMaxBidChange,
  onBidTypeChange,
  onSubmitBid,
  onRequestLogin,
  isContactUs,
  onFocus,
  isMistypedBidAvailable,
  onMistypedBid,
}) {
  const { currencyFeeFormat, inventoryAuction } = lot;
  const currentBidDelta = useBidDelta(currentBid, inventoryAuction);
  const minValue = currentBid + currentBidDelta.increment;
  const { getLocalizedHcRoute } = RouterService;
  const startBidDelta = useBidDelta(startBid, inventoryAuction);
  const maxBidDelta = useBidDelta(maxBid, inventoryAuction);
  const intl = useIntl();
  const classes = useStyles();
  const [isStartBidBelowMin, setIsStartBidBelowMin] = useState(false);
  const [isMaxBidBelowMin, setIsMaxBidBelowMin] = useState(false);
  const isCopartAuction = inventoryAuction === LotService.AUCTION_COPART;

  const translationSets = {
    startingBid: intl.formatMessage({ id: 'lotPage.bidInformation.startingBid' }),
    incrementLabel: intl.formatMessage({ id: 'shared.label.increment' }),
    maximumBid: intl.formatMessage({ id: 'membershipPlans.card.maximumBid' }),
    yourNewMaximumBid: intl.formatMessage({ id: 'lotPage.bidInformation.yourNewMaximumBid' }),
    ctaContactUs: intl.formatMessage({ id: 'shared.cta.contactUsToBid' }),
    ctaBidNow: intl.formatMessage({ id: 'shared.cta.bidNow' }),
    ctaMistypedBid: intl.formatMessage({ id: 'shared.cta.mistypedBid' }),
    startingBidTooltip: intl.formatMessage({ id: 'lotPage.bidInformation.startingBidTooltip' }),
  };

  function handleStartBidChange(nextValue) {
    if (isStartBidAvailable) {
      onStartBidChange(nextValue);
      const isStartAndMaxWithinOneIncrement = maxBid - startBid < startBidDelta.increment;

      if (nextValue > maxBid || isStartAndMaxWithinOneIncrement) {
        onMaxBidChange(nextValue);
      }
    }
  }

  function handleMaxBidChange(nextValue) {
    onMaxBidChange(nextValue);

    if (isStartBidAvailable && nextValue < startBid) {
      return;
    }

    const isStartAndMaxWithinOneIncrement = nextValue - startBid < startBidDelta.increment;

    if (isStartBidAvailable && (nextValue < startBid || isStartAndMaxWithinOneIncrement)) {
      const nextStartBid = nextValue > minValue ? nextValue : minValue;
      onStartBidChange(nextStartBid);
    }
  }

  function handleBidNowButtonStateUpdate(e) {
    const { isStartingBid, isBelowMinimum } = e.detail;

    if (isStartingBid) {
      setIsStartBidBelowMin(isBelowMinimum);
    } else {
      setIsMaxBidBelowMin(isBelowMinimum);
    }
  }

  useEffect(() => {
    window.addEventListener('toggleBidNowButtonState', handleBidNowButtonStateUpdate);

    return () => window.removeEventListener('toggleBidNowButtonState', handleBidNowButtonStateUpdate);
  }, []);

  return (
    <div className={classes.root}>
      {currentBid > 0 && isCopartAuction && <BidType value={bidType} onChange={onBidTypeChange} />}
      {isStartBidAvailable && (
        <div className={classes.formContainer}>
          <div className={classnames(classes.bidInformationInput, classes.inputWrap)}>
            <div className={classnames(classes.formInputLabel, 'ws-n')}>
              {translationSets.startingBid} (${currentBid === 0 ? startBidMinimum : startBidDelta.increment}{' '}
              {currencyFeeFormat} {translationSets.incrementLabel})
              <TooltipOnHover
                content={translationSets.startingBidTooltip}
                isFlipEnabled
                maxWidth={360}
                badgeTop={-1}
                placement="bottom"
              />
            </div>

            <BidInformationInput
              value={startBid}
              minValue={startBidMinimum}
              delta={startBidDelta}
              currencyFeeFormat={currencyFeeFormat}
              onChange={handleStartBidChange}
              onFocus={onFocus}
              hasSeparator
              hasMinValueWarning
              isStartingBid
            />
          </div>
        </div>
      )}
      <div className={classes.formInputLabel}>
        {!currentBid && <>{customerMaxBid ? translationSets.yourNewMaximumBid : translationSets.maximumBid}</>} ($
        {maxBidDelta.increment} {currencyFeeFormat} {translationSets.incrementLabel}){' '}
        {currentBid > 0 && <IncrementalBidGuidelinesLink />}
      </div>

      <div className={classes.formContainer}>
        <div className={classes.bidInformationInput}>
          <BidInformationInput
            value={maxBid}
            minValue={isStartBidAvailable ? startBid : minValue}
            delta={maxBidDelta}
            currencyFeeFormat={currencyFeeFormat}
            onChange={handleMaxBidChange}
            onFocus={onFocus}
          />
          <div className={classes.link}>
            <FeesCalculator customer={customer} lot={lot} fees={fees} amount={maxBid} onRequestLogin={onRequestLogin} />
          </div>
        </div>

        <div className={classes.btnWrap}>
          {isContactUs ? (
            <Button href={getLocalizedHcRoute('hcSubmitRequest')} label={translationSets.ctaContactUs} isRegularCase />
          ) : (
            <Button
              label={translationSets.ctaBidNow}
              onClick={onSubmitBid}
              isDisabled={isStartBidBelowMin || isMaxBidBelowMin}
            />
          )}
          {isMistypedBidAvailable && (
            <div className={classes.mistypedBid}>
              <ButtonLink label={translationSets.ctaMistypedBid} onClick={onMistypedBid} isDashed />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

BidNow.propTypes = {
  customer: CustomerShape,
  lot: LotShape,
  fees: LotFeesShape,
  isContactUs: PropTypes.bool,
  maxBid: PropTypes.number.isRequired,
  onMaxBidChange: PropTypes.func.isRequired,
  currentBid: PropTypes.number.isRequired,
  customerMaxBid: PropTypes.number,
  isStartBidAvailable: PropTypes.bool,
  onStartBidChange: PropTypes.func,
  startBid: PropTypes.number,
  startBidMinimum: PropTypes.number,
  bidType: PropTypes.string,
  onSubmitBid: PropTypes.func,
  onRequestLogin: PropTypes.func,
  onFocus: PropTypes.func,
  isMistypedBidAvailable: PropTypes.bool,
  onMistypedBid: PropTypes.func,
  onBidTypeChange: PropTypes.func,
};

BidNow.defaultProps = {
  customer: {},
  startBid: null,
  startBidMinimum: null,
  customerMaxBid: null,
  bidType: null,
  isContactUs: false,
  lot: {},
  fees: {},
  isStartBidAvailable: false,
  onStartBidChange: () => {},
  onSubmitBid: () => {},
  onRequestLogin: () => {},
  onFocus: () => {},
  isMistypedBidAvailable: false,
  onMistypedBid: () => {},
  onBidTypeChange: () => {},
};

export default BidNow;
