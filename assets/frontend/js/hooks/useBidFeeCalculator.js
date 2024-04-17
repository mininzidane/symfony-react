import { useState, useEffect } from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LocationService from '../api/LocationService';
import UserLocationService from '../api/UserLocationService';
import ShippingOrderService from '../api/ShippingOrderService';

const defaultFees = {
  copartAuctionFees: 0,
  transactionFee: 0,
  transactionFeeDiscount: 0,
  documentationFee: 0,
  intlWirePaymentFee: 0,
  inspectionFee: 0,
  hasStateTax: false,
  salesTaxState: '',
  stateTax: 0,
  surtax: 0,
  hazMatFee: 0,
  gstFee: 0,
  hstFee: 0,
  totalFees: 0,
  total: 0,
};

function useBidFeeCalculator(fees = {}, amount = 0, countryId = 0) {
  const userLocationService = new UserLocationService();
  const [calculatedFees, setCalculatedFees] = useState(defaultFees);
  const { billTransactionFeeToBrokerAdmin } = useCustomerHelper();

  function findFeeThreshold(feeTable = {}) {
    const { rates = {}, defaultRate = 0, defaultAmount = 0 } = feeTable;

    const buyerFee = Object.keys(rates).find((threshold) => amount < threshold);
    if (rates[buyerFee] >= 0) {
      return rates[buyerFee];
    }

    if (defaultRate) {
      return Math.round(amount * defaultRate);
    }

    return defaultAmount || 0;
  }

  function getStaticFees() {
    const { documentationFee = 0, intlWireFee: intlWirePaymentFee = 0 } = fees;
    return {
      documentationFee,
      intlWirePaymentFee,
    };
  }

  function calculateCopartAuctionFees() {
    const {
      feesTable = {},
      virtualFeesTable = {},
      brokerFee,
      gateFee,
      hazMatFee = 0,
      postalFees = 0,
      serviceFees = 0,
      environmentFees = 0,
    } = fees;
    const buyersFee = findFeeThreshold(feesTable);
    const virtualFees = findFeeThreshold(virtualFeesTable);
    return buyersFee + virtualFees + gateFee + brokerFee + hazMatFee + postalFees + serviceFees + environmentFees;
  }

  function calculateInspectionFee() {
    const { CountryIdBY, CountryIdDE, INSPECTION_FEE } = ShippingOrderService;
    const isInspectionFee = countryId && [CountryIdBY, CountryIdDE].includes(countryId);
    return isInspectionFee ? INSPECTION_FEE : 0;
  }

  function calculateTransactionFees() {
    if (billTransactionFeeToBrokerAdmin) {
      return {
        transactionFee: 0,
        transactionFeeDiscount: 0,
      };
    }
    const customerLocation = userLocationService.getUserLocation();
    const isUACustomer = customerLocation && customerLocation.country_code === ShippingOrderService.CountryCodeUA;
    const { transactionFeePerc, transactionFeeMin, transactionFeePremiumPerc, transactionFeeCustomRules } = fees;

    if (Array.isArray(transactionFeeCustomRules)) {
      const rule = transactionFeeCustomRules.find((item) => amount >= item.from && amount <= item.to);
      if (rule) {
        return {
          transactionFee: parseInt(rule.fee, 10),
          transactionFeeDiscount: 0,
        };
      }
    }

    const calculated = Math.round((amount / 100) * transactionFeePerc);
    const calculatedPrem = Math.round((amount / 100) * transactionFeePremiumPerc);

    const transactionFee = isUACustomer ? transactionFeeMin : Math.max(transactionFeeMin, calculated);
    const transPremFee = Math.max(transactionFeeMin, calculatedPrem);
    const transactionFeeDiscount = transactionFee - transPremFee;

    return {
      transactionFee,
      transactionFeeDiscount,
    };
  }

  function calculateGstFee(copartAuctionFees) {
    const { gstRate } = fees;
    if (gstRate > 0) {
      return Math.round((amount + copartAuctionFees) * gstRate);
    }

    return 0;
  }

  function calculateHstFee(copartAuctionFees) {
    const { hstRate } = fees;
    if (hstRate > 0) {
      return Math.round((amount + copartAuctionFees) * hstRate);
    }

    return 0;
  }

  function calculateCaStateTax(copartAuctionFees = 0) {
    const { hasStateTax, stateTaxRate, salesTaxState, outOfStateTitleFee = 0, stateTaxAdditionalFee = 0 } = fees;

    const updatedStateTaxes = {};
    if (hasStateTax) {
      const totalCost = amount + copartAuctionFees + stateTaxAdditionalFee + outOfStateTitleFee;

      updatedStateTaxes.hasStateTax = true;
      updatedStateTaxes.stateTax = Math.round(totalCost * stateTaxRate);
      updatedStateTaxes.salesTaxState = salesTaxState;
    }

    return updatedStateTaxes;
  }

  function calculateStateTax(copartAuctionFees = 0) {
    const { hasStateTax, stateTaxRate, salesTaxState, discretionarySurtaxRate, surtaxThreshold } = fees;

    const updatedStateTaxes = {};
    if (salesTaxState === LocationService.STATE_CODE_CALIFORNIA) {
      return calculateCaStateTax(copartAuctionFees);
    }

    if (hasStateTax) {
      updatedStateTaxes.hasStateTax = true;
      updatedStateTaxes.salesTaxState = salesTaxState;
      updatedStateTaxes.stateTax = Math.round(amount * stateTaxRate);

      let countyTax = 0;
      if (discretionarySurtaxRate) {
        countyTax = Math.round(amount * discretionarySurtaxRate);
        if (surtaxThreshold && amount > surtaxThreshold) {
          countyTax = Math.round(surtaxThreshold * discretionarySurtaxRate);
        }

        updatedStateTaxes.surtax = countyTax;
      }
    }

    return updatedStateTaxes;
  }

  function applyExchangeRate(value) {
    const { exchangeRate } = fees;
    if (!exchangeRate || Number.isNaN(exchangeRate)) {
      return value;
    }

    return Math.round(value / exchangeRate);
  }

  function calculateTotals(updatedFees = {}) {
    const {
      hasStateTax,
      stateTax,
      surtax,
      gstFee,
      hstFee,
      copartAuctionFees,
      transactionFee,
      inspectionFee,
      documentationFee,
      intlWirePaymentFee,
    } = updatedFees;

    const allFees = [
      applyExchangeRate(gstFee),
      applyExchangeRate(hstFee),
      applyExchangeRate(copartAuctionFees),
      transactionFee,
      inspectionFee,
      documentationFee,
      intlWirePaymentFee,
    ];

    if (hasStateTax) {
      allFees.push(stateTax);
      allFees.push(surtax);
    }

    const convertedAmount = applyExchangeRate(amount);
    const totalFees = allFees.reduce((arr, cur) => {
      if (cur) {
        return arr + cur;
      }

      return arr;
    }, 0);

    const total = convertedAmount + totalFees;
    return {
      totalFees,
      total,
    };
  }

  function updateFees() {
    const staticFees = getStaticFees();
    const copartAuctionFees = calculateCopartAuctionFees();
    const transactionFees = calculateTransactionFees();
    const inspectionFee = calculateInspectionFee();
    const gstFee = calculateGstFee(copartAuctionFees);
    const hstFee = calculateHstFee(copartAuctionFees);
    const stateTaxes = calculateStateTax(copartAuctionFees);

    const updatedFees = {
      ...calculatedFees,
      ...staticFees,
      ...transactionFees,
      ...stateTaxes,
      inspectionFee,
      copartAuctionFees,
      gstFee,
      hstFee,
    };

    const updatedTotals = calculateTotals(updatedFees);
    const updatedAmounts = {
      ...calculatedFees,
      ...updatedFees,
      ...updatedTotals,
    };

    setCalculatedFees(updatedAmounts);
  }

  useEffect(() => {
    updateFees();
  }, [amount, fees, countryId]);

  return calculatedFees;
}

export default useBidFeeCalculator;
