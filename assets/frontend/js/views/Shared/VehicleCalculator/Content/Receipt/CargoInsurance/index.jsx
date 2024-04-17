import React, { useCallback, useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CurrencyService from 'frontend/js/api/CurrencyService';
import CalculatorContext from 'frontend/js/views/Shared/VehicleCalculator/CalculatorContext/CalculatorContext';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import ButtonLink from 'frontend/js/components/ButtonLink';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import InfoTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/InfoTriggerThin';
import DecoratorService from 'frontend/js/lib/utils/DecoratorService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function CargoInsurance() {
  const classes = useStyles();
  const intl = useIntl();
  const { refine, refinements, values } = useContext(CalculatorContext);
  const { insurance, lot } = values;
  const { insurance: insuranceId, price } = refinements;
  const [value, setValue] = useState(null);
  const currencyFormat = lot && lot.currencyFeeFormat ? lot.currencyFeeFormat : CurrencyService.CURRENCY_USD;
  const displayValue = value ? NumberService.formatCurrency(value, currencyFormat) : '';

  const {
    INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE,
    INSURANCE_FULL_COVERAGE_PERCENTAGE,
    INSURANCE_TOTAL_LOSS_COVERAGE_ID,
    INSURANCE_FULL_COVERAGE_ID,
  } = ShippingOrderService;

  const throttledRefine = useCallback(
    DecoratorService.throttle((v) => {
      refine({ price: NumberService.parseFloatSafe(v) || 0 });
    }, 300),
    [],
  );

  function handleInsuranceChange(v) {
    refine({ insurance: Number(v) });
  }

  function showVehiclePrice() {
    refine({ price: NaN });
    setValue(null);
  }

  function handleChange(v) {
    setValue(v);
  }

  function handleBlur() {
    if (value) {
      throttledRefine(value);
    }
  }

  if (!insurance) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.label}>
          <RadioButton
            className={classes.radioButton}
            label={
              <>
                {intl.formatMessage({ id: 'vehicleCalculator.totalLossCoverage' })} (
                {INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE}%)
                <span className={classes.tooltipWrap}>
                  &nbsp;
                  <TooltipOnHover
                    content={<FormattedMessage id="vehicleCalculator.tooltip.totalLossCoverage" />}
                    trigger={<InfoTriggerThin />}
                    triggerClassName={classes.tooltipTrigger}
                  />
                </span>
              </>
            }
            value={INSURANCE_TOTAL_LOSS_COVERAGE_ID}
            name="insurance"
            id="insurance-1"
            isChecked={insuranceId === INSURANCE_TOTAL_LOSS_COVERAGE_ID}
            onChange={(_, v) => handleInsuranceChange(v)}
          />
        </div>
        {insuranceId === INSURANCE_TOTAL_LOSS_COVERAGE_ID && (
          <>
            {insurance.totalLossCoverage > 0 ? (
              <>
                {price && value === null ? (
                  <div className={classes.value}>
                    <strong>{NumberService.formatCurrency(insurance.totalLossCoverage)}</strong> USD
                  </div>
                ) : (
                  <ButtonLink
                    className={classes.value}
                    onClick={showVehiclePrice}
                    label={
                      <>
                        <strong>{NumberService.formatCurrency(insurance.totalLossCoverage)}</strong> USD
                      </>
                    }
                    isDashed
                  />
                )}
              </>
            ) : (
              <div className={classes.input}>
                <InputPlane
                  id="price"
                  name="price"
                  mask="numbers"
                  placeholder={intl.formatMessage({ id: 'vehicleCalculator.vehicleValue' })}
                  value={displayValue}
                  onChange={(_, v) => handleChange(v)}
                  onBlur={() => handleBlur()}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className={classes.row}>
        <div className={classes.label}>
          <RadioButton
            className={classes.radioButton}
            label={
              <>
                {intl.formatMessage({ id: 'vehicleCalculator.fullCoverage' })} ({INSURANCE_FULL_COVERAGE_PERCENTAGE}%)
                <span className={classes.tooltipWrap}>
                  &nbsp;
                  <TooltipOnHover
                    content={<FormattedMessage id="vehicleCalculator.tooltip.fullCoverage" />}
                    trigger={<InfoTriggerThin />}
                    triggerClassName={classes.tooltipTrigger}
                  />
                </span>
              </>
            }
            value={INSURANCE_FULL_COVERAGE_ID}
            name="insurance"
            id="insurance-2"
            isChecked={insuranceId === INSURANCE_FULL_COVERAGE_ID}
            onChange={(_, v) => handleInsuranceChange(v)}
          />
        </div>
        {insuranceId === INSURANCE_FULL_COVERAGE_ID && (
          <>
            {insurance.fullCoverage > 0 ? (
              <>
                {price && value === null ? (
                  <div className={classes.value}>
                    <strong>{NumberService.formatCurrency(insurance.fullCoverage)}</strong> USD
                  </div>
                ) : (
                  <ButtonLink
                    className={classes.value}
                    onClick={showVehiclePrice}
                    label={
                      <>
                        <strong>{NumberService.formatCurrency(insurance.fullCoverage)}</strong> USD
                      </>
                    }
                    isDashed
                  />
                )}
              </>
            ) : (
              <div className={classes.input}>
                <InputPlane
                  id="price"
                  name="price"
                  mask="numbers"
                  placeholder={intl.formatMessage({ id: 'vehicleCalculator.vehicleValue' })}
                  value={displayValue}
                  onChange={(_, v) => handleChange(v)}
                  onBlur={() => handleBlur()}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CargoInsurance;
