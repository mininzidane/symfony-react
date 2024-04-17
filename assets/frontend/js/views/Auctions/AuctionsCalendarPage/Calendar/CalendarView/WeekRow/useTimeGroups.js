import { useMemo } from 'react';

function useTimeGroups(auctions, dates) {
  return useMemo(
    () =>
      [
        ...new Set(
          dates.reduce((acc, date) => {
            if (auctions[date]) {
              return acc.concat(Object.keys(auctions[date]));
            }
            return acc;
          }, []),
        ),
      ].sort(),
    [auctions, dates],
  );
}

export default useTimeGroups;
