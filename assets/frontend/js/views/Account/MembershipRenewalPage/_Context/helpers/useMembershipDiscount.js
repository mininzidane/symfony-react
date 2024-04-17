import { get } from 'lodash';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function useMembershipDiscount(customer, couponCode) {
  const { membershipType, membershipValidity } = customer;
  const originalAmount = parseInt(membershipType.price, 10);
  const discountPercentage = get(couponCode, 'percentageDiscount', 0);

  const upgradeDate = DateTimeService.addTimeToISOString(membershipValidity, { years: 1 });
  const discount = Math.floor(originalAmount * discountPercentage);

  return { originalAmount, discount, upgradeDate, membershipValidity };
}

export default useMembershipDiscount;
