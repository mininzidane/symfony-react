import { useMemo } from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function useGroupByLocalDateTime(auctions, hideTimes) {
  return useMemo(() => {
    const result = {};
    Object.entries(auctions).forEach(([status, statusData]) => {
      Object.entries(statusData).forEach(([auctionGroup, items]) => {
        if (hideTimes) {
          items.forEach((v) => {
            const date = DateTimeService.format(new Date(v.startedAt), 'yyyy-MM-dd');

            if (!result[date]) {
              result[date] = {};
            }
            if (!result[date][status]) {
              result[date][status] = {};
            }
            if (!result[date][status][auctionGroup]) {
              result[date][status][auctionGroup] = [];
            }
            result[date][status][auctionGroup].push(v);
          });
        } else {
          items.forEach((v) => {
            const [date, time] = DateTimeService.format(new Date(v.startedAt), 'yyyy-MM-dd HH:mm').split(' ');

            if (!result[date]) {
              result[date] = {};
            }
            if (!result[date][time]) {
              result[date][time] = {};
            }
            if (!result[date][time][status]) {
              result[date][time][status] = {};
            }
            if (!result[date][time][status][auctionGroup]) {
              result[date][time][status][auctionGroup] = [];
            }
            result[date][time][status][auctionGroup].push(v);
          });
        }
      });
    });
    return result;
  }, [auctions, hideTimes]);
}

export default useGroupByLocalDateTime;
