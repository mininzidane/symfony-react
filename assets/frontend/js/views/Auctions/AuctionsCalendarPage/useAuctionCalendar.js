import { useMemo, useContext } from 'react';
import { useQuery } from 'react-query';
import AuctionService from 'frontend/js/api/AuctionService';
import SortContext from 'frontend/js/context/SortContext';

const AUCTION_PRIORITY = {
  usa: 1,
  canada: 2,
  germany: 3,
  npa: 4,
  iaa: 5,
};

function prepareSortField(field) {
  if (field === 'saleTime') {
    return 'saleDate';
  }
  return field;
}

function useAuctionCalendar(tab, viewMode) {
  const isGridView = viewMode === 'grid';
  const { sort } = useContext(SortContext);

  const { isLoading: isLoadingCalendar, data: auctionCalendar } = useQuery(
    ['auction-calendar'],
    AuctionService.getAuctionCalendar,
    {
      enabled: isGridView,
    },
  );

  const { isLoading: isLoadingCalendarList, data: auctionCalendarList } = useQuery(
    ['auction-calendar-list', sort],
    () => AuctionService.getAuctionCalendarList({ sort: prepareSortField(sort.field), order: sort.order }),
    {
      enabled: !isGridView,
      keepPreviousData: true,
    },
  );

  const data = isGridView ? auctionCalendar : auctionCalendarList;
  const isLoading = isGridView ? isLoadingCalendar : isLoadingCalendarList;

  const auctionGroups = useMemo(() => {
    if (!data?.appliedGroups) {
      return [];
    }

    return Object.keys(data.appliedGroups)
      .sort((a, b) => (!AUCTION_PRIORITY[b] ? -1 : AUCTION_PRIORITY[a] - AUCTION_PRIORITY[b]))
      .map((group) => ({
        key: group,
        name: data.appliedGroups[group],
        active: tab === 'all' ? true : group === tab,
      }));
  }, [data?.appliedGroups, tab]);

  const auctions = useMemo(() => {
    if (!data?.auctions) {
      return [];
    }

    if (tab === 'all') {
      return data.auctions;
    }

    if (isGridView) {
      const filteredAuctions = {};
      Object.keys(data.auctions).forEach((status) => {
        filteredAuctions[status] = {};
        auctionGroups.forEach((group) => {
          if (group.active && data.auctions[status]?.[group.key]) {
            filteredAuctions[status][group.key] = data.auctions[status][group.key];
          }
        });
      });

      return filteredAuctions;
    }

    return data.auctions.filter((auction) => auction.auctionGroup === tab);
  }, [data, tab, auctionGroups]);

  return {
    isLoading,
    auctionGroups,
    auctions,
    statuses: data?.statuses,
    calendarDays: data?.calendarDays,
  };
}

export default useAuctionCalendar;
