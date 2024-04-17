import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CurrencyService from 'frontend/js/api/CurrencyService';
import InputPlane from 'frontend/js/components/Form/PlaneTheme/InputPlane';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import InfoTriggerThin from 'frontend/js/components/TooltipOnHover/Triggers/InfoTriggerThin';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function CargoInsurance({ formik, lot }) {
  const classes = useStyles();
  const intl = useIntl();
  const { vehiclePrice, insuranceType } = formik.values;
  const currencyFormat = lot && lot.currencyFeeFormat ? lot.currencyFeeFormat : CurrencyService.CURRENCY_USD;
  const displayValue = vehiclePrice ? NumberService.formatCurrency(vehiclePrice, currencyFormat) : '';

  const price = NumberService.parseFloatSafe(vehiclePrice) || NaN;

  const {
    INSURANCE_TOTAL_LOSS_COVERAGE_LOWER_THRESHOLD,
    INSURANCE_FULL_COVERAGE_LOWER_THRESHOLD,
    INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE,
    INSURANCE_FULL_COVERAGE_PERCENTAGE,
    INSURANCE_TOTAL_LOSS_COVERAGE_ID,
    INSURANCE_FULL_COVERAGE_ID,
  } = ShippingOrderService;

  const totalLossCoverageAmount = Math.round((price * INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE) / 100);
  const fullCoverageAmount = Math.round((price * INSURANCE_FULL_COVERAGE_PERCENTAGE) / 100);
  const insurance = {
    totalLossCoverage: Math.max(totalLossCoverageAmount, INSURANCE_TOTAL_LOSS_COVERAGE_LOWER_THRESHOLD),
    fullCoverage: Math.max(fullCoverageAmount, INSURANCE_FULL_COVERAGE_LOWER_THRESHOLD),
  };

  function handleInsuranceChange(v) {
    formik.setFieldValue('insuranceType', Number(v));
  }

  return (
    <div>
      {!formik.values.isLotPurchase && (
        <div className="pb-10">
          <InputPlane
            id="vehiclePrice"
            name="vehiclePrice"
            mask="numbers"
            placeholder={intl.formatMessage({ id: 'vehicleCalculator.vehicleValue' })}
            value={displayValue}
            error={formik.errors.vehiclePrice}
            touched={formik.touched.vehiclePrice}
            onChange={formik.setFieldValue}
            onBlur={formik.setFieldTouched}
          />
        </div>
      )}
      <div className={classes.row}>
        <div className={classes.label}>
          <RadioButton
            className={classes.radioButton}
            label={
              <>
                {intl.formatMessage({ id: 'vehicleCalculator.totalLossCoverage' })} (
                {INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE}%)
              </>
            }
            value={INSURANCE_TOTAL_LOSS_COVERAGE_ID}
            name="insurance"
            id="insurance-1"
            isChecked={insuranceType === INSURANCE_TOTAL_LOSS_COVERAGE_ID}
            onChange={(_, v) => handleInsuranceChange(v)}
          />
          <div>
            <span className={classes.tooltipWrap}>
              &nbsp;
              <TooltipOnHover
                content={<FormattedMessage id="vehicleCalculator.tooltip.totalLossCoverage" />}
                trigger={<InfoTriggerThin />}
                triggerClassName={classes.tooltipTrigger}
                popperClassName={classes.tooltip}
                placement="top"
                maxWidth={400}
              />
            </span>
          </div>
        </div>
        {insurance.totalLossCoverage > 0 ? (
          <div className={classes.value}>
            <strong>{NumberService.formatCurrency(insurance.totalLossCoverage)}</strong> USD
          </div>
        ) : (
          '------'
        )}
      </div>
      <div className={classes.row}>
        <div className={classes.label}>
          <RadioButton
            className={classes.radioButton}
            label={
              <>
                {intl.formatMessage({ id: 'vehicleCalculator.fullCoverage' })} ({INSURANCE_FULL_COVERAGE_PERCENTAGE}%)
              </>
            }
            value={INSURANCE_FULL_COVERAGE_ID}
            name="insurance"
            id="insurance-2"
            isChecked={insuranceType === INSURANCE_FULL_COVERAGE_ID}
            onChange={(_, v) => handleInsuranceChange(v)}
          />
          <div>
            <span className={classes.tooltipWrap}>
              &nbsp;
              <TooltipOnHover
                content={<FormattedMessage id="vehicleCalculator.tooltip.fullCoverage" />}
                trigger={<InfoTriggerThin />}
                triggerClassName={classes.tooltipTrigger}
                popperClassName={classes.tooltip}
                placement="top"
                maxWidth={400}
              />
            </span>
          </div>
        </div>

        {insurance.fullCoverage > 0 ? (
          <div className={classes.value}>
            <strong>{NumberService.formatCurrency(insurance.fullCoverage)}</strong> USD
          </div>
        ) : (
          '------'
        )}
      </div>
    </div>
  );
}

CargoInsurance.propTypes = {
  formik: PropTypes.object.isRequired,
  lot: PropTypes.object,
};

CargoInsurance.defaultProps = {
  lot: null,
};

export default CargoInsurance;
