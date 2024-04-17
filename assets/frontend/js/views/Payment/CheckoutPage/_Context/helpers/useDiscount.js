function useDiscount(total, coupon) {
  if (!coupon) {
    return 0;
  }

  if (coupon.fixedDiscount) {
    return coupon.fixedDiscount;
  }

  if (coupon.percentageDiscount) {
    return (total * coupon.percentageDiscount).toFixed(2);
  }

  return 0;
}

export default useDiscount;
