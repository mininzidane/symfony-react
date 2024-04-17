import { useMemo } from 'react';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

function useWeeks() {
  return useMemo(() => {
    const [currentMonth, currentDay, currentYear] = DateTimeService.format(new Date()).split('/').map(Number);

    const startDate = new Date(currentYear, currentMonth - 1, currentDay);
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

    const sixWeeks = 6 * 7;
    const endDate = new Date(currentYear, currentMonth - 1, currentDay + sixWeeks);
    endDate.setDate(endDate.getDate() + 7 - endDate.getDay());

    const weeks = [];
    let line = 0;
    while (startDate <= endDate) {
      const day = startDate.getDay();
      if (day === 1) {
        weeks.push([]);
      }

      weeks[line].push(DateTimeService.format(startDate, 'yyyy-MM-dd'));

      if (day === 0) {
        line += 1;
      }

      startDate.setDate(startDate.getDate() + 1);
    }
    return weeks;
  }, []);
}

export default useWeeks;
