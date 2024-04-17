function useAdditionalCharges(values, config, isRateEnabled) {
  const { insurance } = values;

  const additionalCharges = {};
  if (insurance > 0 && isRateEnabled('insurance')) {
    additionalCharges.insurance = insurance;
  }

  additionalCharges.total = Object.values(additionalCharges).reduce((acc, curr) => acc + curr, 0);

  return { additionalCharges };
}

export default useAdditionalCharges;
