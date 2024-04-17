import LotService from 'frontend/js/api/LotService';
import BidService from 'frontend/js/api/BidService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function getTimeDiff(modifiedDate) {
  const formattedSaleDatePlusDay = DateTimeService.format(modifiedDate, 'yyyy:MM:dd:kk:mm');
  const d = formattedSaleDatePlusDay.split(':');
  const targetDate = new Date(d[0], parseInt(d[1] - 1, 10), d[2], d[3], d[4]);

  return DateTimeService.getTimeLeft(targetDate);
}

function getTimeLeft(lot) {
  const { saleStatus, bidStatus, saleDate, currentCustomerBid } = lot;

  if (!saleDate) {
    return null;
  }

  if (saleStatus === LotService.SALE_STATUS_ON_MINIMUM_BID_CODE) {
    const saleDatePlusDay = DateTimeService.addBusinessDaysFromString(saleDate);
    return getTimeDiff(saleDatePlusDay);
  }

  if (bidStatus === BidService.STATUS_AWAITING_APPROVAL) {
    const saleDatePlusTwoDays = DateTimeService.addBusinessDaysFromString(saleDate, 2);
    return getTimeDiff(saleDatePlusTwoDays);
  }

  if (bidStatus === BidService.STATUS_SELLER_COUNTERED) {
    const bidAddedPlusTwoDays = DateTimeService.addBusinessDaysFromString(currentCustomerBid.addedAt, 2);
    return getTimeDiff(bidAddedPlusTwoDays);
  }

  return null;
}

function getCountdownDate(date, lot) {
  let countDownDate = date;
  const timeLeft = getTimeLeft(lot);

  if (timeLeft) {
    countDownDate = {
      isTimeLeft: true,
      d: timeLeft.days,
      h: timeLeft.hours,
      m: timeLeft.minutes,
      s: timeLeft.seconds,
    };
  }

  return countDownDate;
}

export default getCountdownDate;
