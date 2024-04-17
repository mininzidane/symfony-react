import React, { useState, useEffect } from 'react';
import { Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import MembershipService from 'frontend/js/api/MembershipService';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';
import Slider from './Slider';
// import Vehicles from "./Vehicles";
import BuyerPowerInput from './BuyerPowerInput';
import VehiclesInput from './VehiclesInput';

function Calculator({
  onMbpChange,
  currentMbp,
  maxMbp,
  minMbp,
  mbpStep,
  membershipUpgrade,
  isMbpAboveLimit,
  initialMbp,
  totalDeposit,
  vehiclesAvailableNumber,
}) {
  const { minDepositAmount, depositToBuyerPowerRatio } = BuyerPowerService;

  const [mbpValue, setMbpValue] = useState(minMbp);

  const vehiclesNumber = vehiclesAvailableNumber || Math.floor(mbpValue / depositToBuyerPowerRatio / minDepositAmount);
  const [minVehiclesNumber, setMinVehiclesNumber] = useState(vehiclesNumber);
  const classes = useStyles();
  const intl = useIntl();

  const { getRoute, getCurrentQueryParams } = RouterService;
  const membershipUpgradePrice = membershipUpgrade
    ? membershipUpgrade.price - parseFloat(window.customer.membershipType.price)
    : 0;

  const translationSets = {
    caption: intl.formatMessage({ id: 'depositsPage.slider.caption2' }),
    vehiclesCaption: intl.formatMessage({ id: 'depositsPage.slider.vehiclesCaption' }),
    buyerPowerInputLabel: intl.formatMessage({ id: 'depositsPage.newBuyerPower.label' }),
    ctaTotal: intl.formatMessage({ id: 'depositsPage.cta.total' }),
    ctaLabel: intl.formatMessage({ id: 'shared.cta.increaseBuyerPower' }),
    upgradeMembershipAdvanced: intl.formatMessage({ id: 'depositsPage.cta.upgradeMembershipAdvanced' }),
    refundableSecurityDeposit: intl.formatMessage({ id: 'depositsPage.refundableSecurityDeposit' }),
    upgradeMembershipBasic: intl.formatMessage({ id: 'depositsPage.cta.upgradeMembershipBasic' }),
  };

  function getAddedDepositValue(nextMbpValue) {
    const value = nextMbpValue / depositToBuyerPowerRatio - totalDeposit;
    if (value < 0) {
      return 0;
    }
    return value + parseFloat(totalDeposit) < minDepositAmount ? minDepositAmount : value;
  }

  function getTotalDueValue(value) {
    return getAddedDepositValue(value) + membershipUpgradePrice;
  }

  function correctValue(value) {
    return value < minMbp ? minMbp : value;
  }

  function handleSliderChange(event, value) {
    setMbpValue(correctValue(value));
  }

  function handleVehicleClick(index) {
    setMbpValue(correctValue(index === 1 ? minMbp : index * minDepositAmount * depositToBuyerPowerRatio));
  }

  function handleCtaClick() {
    RouterService.customRedirect(
      getRoute('buyerPowerPayment', {
        ...getCurrentQueryParams(),
        amount: getAddedDepositValue(mbpValue),
        maxPossibleBid: mbpValue,
      }),
    );
  }

  useEffect(() => {
    const mpbDebounceDelay = 250;

    const timer = setTimeout(() => {
      onMbpChange(mbpValue);
    }, mpbDebounceDelay);

    return () => clearTimeout(timer);
  }, [mbpValue]);

  useEffect(() => {
    setMbpValue(initialMbp || minMbp);
    setMinVehiclesNumber(Math.floor(minMbp / depositToBuyerPowerRatio / minDepositAmount));
  }, [minMbp, initialMbp]);

  const isUpgradeRequired = Boolean(membershipUpgrade);

  const addedDepositValue = getAddedDepositValue(mbpValue);

  return (
    <div className={classnames(classes.root, { 'is-disabled': isMbpAboveLimit })}>
      <div className={classes.sliderContainer}>
        <div className={classes.caption}>
          <span>{translationSets.caption}</span>
        </div>

        <div className={classes.sliderWrap}>
          <div className={classes.sliderBarWrap}>
            <Slider
              onChange={handleSliderChange}
              maxValue={maxMbp}
              step={mbpStep}
              value={mbpValue}
              valueAboveLimit={isMbpAboveLimit ? currentMbp : 0}
            />
          </div>

          <div className={classes.sliderLabels}>
            <div>$0</div>
            <div>$50K+</div>
          </div>

          <div className={classes.grid}>
            <div className={classes.formContainer}>
              <div className={classes.inputContainer}>
                <div className={classes.inputCaption}>{translationSets.buyerPowerInputLabel}</div>
                <div className={classes.inputWrap}>
                  <BuyerPowerInput
                    value={mbpValue}
                    minValue={minMbp}
                    maxValue={maxMbp}
                    step={mbpStep}
                    onChange={setMbpValue}
                    isMbpAboveLimit={isMbpAboveLimit}
                  />
                </div>
              </div>
            </div>

            <div className={classes.vehicles}>
              <span>{translationSets.vehiclesCaption}</span>
              <VehiclesInput
                onChange={handleVehicleClick}
                vehiclesNumber={vehiclesNumber}
                minVehiclesNumber={minVehiclesNumber}
              />
            </div>
          </div>

          <div className={classes.ctaContainer}>
            {addedDepositValue ? (
              <div className={classes.summaryRow}>
                <span>{translationSets.refundableSecurityDeposit}</span>
                <strong>
                  <Amount hasCurrency fontSize={14} fontWeight={400} value={addedDepositValue} />
                </strong>
              </div>
            ) : null}

            <Collapse in={isUpgradeRequired && membershipUpgrade.level === MembershipService.LEVEL.BASIC} timeout={300}>
              <div className={classes.summaryRow}>
                <span>{translationSets.upgradeMembershipBasic}</span>
                <strong>
                  <Amount hasCurrency fontSize={14} fontWeight={400} value={membershipUpgradePrice} />
                </strong>
              </div>
            </Collapse>

            <Collapse
              in={isUpgradeRequired && membershipUpgrade.level === MembershipService.LEVEL.ADVANCED}
              timeout={300}
            >
              <div className={classes.summaryRow}>
                <span>{translationSets.upgradeMembershipAdvanced}</span>
                <strong>
                  <Amount hasCurrency fontSize={14} fontWeight={400} value={membershipUpgradePrice} />
                </strong>
              </div>
            </Collapse>

            <div className={classes.summaryTotalRow}>
              <strong>{translationSets.ctaTotal}</strong>
              <strong>
                <Amount hasCurrency fontSize={14} value={getTotalDueValue(mbpValue)} />
              </strong>
            </div>

            <Button
              label={translationSets.ctaLabel}
              onClick={handleCtaClick}
              className={classes.cta}
              isDisabled={!getTotalDueValue(mbpValue)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Calculator.propTypes = {
  onMbpChange: PropTypes.func.isRequired,
  maxMbp: PropTypes.number.isRequired,
  minMbp: PropTypes.number.isRequired,
  currentMbp: PropTypes.number.isRequired,
  mbpStep: PropTypes.number.isRequired,
  membershipUpgrade: PropTypes.shape({
    price: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
  }),
  isMbpAboveLimit: PropTypes.bool.isRequired,
  initialMbp: PropTypes.number,
  totalDeposit: PropTypes.string,
  vehiclesAvailableNumber: PropTypes.number,
};

Calculator.defaultProps = {
  initialMbp: null,
  membershipUpgrade: null,
  totalDeposit: null,
  vehiclesAvailableNumber: null,
};

export default Calculator;
