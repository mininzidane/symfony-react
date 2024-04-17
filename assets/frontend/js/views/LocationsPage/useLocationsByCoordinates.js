import { useQuery } from 'react-query';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';
import AuctionService from 'frontend/js/api/AuctionService';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

const useLocationsByCoordinates = (auction = LotService.AUCTION_COPART, lat, lng) => {
  const { data, refetch } = useQuery(
    ['locations_list_nearest', auction, lat, lng],
    () => AuctionService.getNearestAuctionLocations(auction, lat, lng),
    {
      select: (res) => {
        const { locations = [] } = res || {};
        return locations.map((location) => ({
          link: RouterService.getRoute('locationView', null, false, { slug: location.slug }),
          slug: location.slug,
          name: location.name,
          address: location.address,
          country: location.country.name,
          city: location.city,
          state: location.stateCode,
          zip: location.zip,
          phone: location.phone,
          map: {
            lat: location.latitude,
            lng: location.longitude,
          },
          date: location.nextSale ? DateTimeService.formatFromISOString(location.nextSale.startedAt) : '',
          status: ['live', 'later'].includes(get(location, 'nextSale.status')) ? 'live' : 'upcoming',
          image: location.image,
          thumbnail: location.thumbnail,
        }));
      },
      enabled: Boolean(lat && lng),
    },
  );

  return {
    refetch,
    data: data || [],
  };
};

export default useLocationsByCoordinates;
