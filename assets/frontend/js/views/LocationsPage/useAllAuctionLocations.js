import { useQuery } from 'react-query';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';
import AuctionService from 'frontend/js/api/AuctionService';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';

const useAllAuctionLocations = (auction = LotService.AUCTION_COPART) => {
  const regionsMap = {
    Canada: 'North America',
    'United States': 'North America',
    'United Kingdom': 'Europe',
    'United Arab Emirates': 'Middle East',
    Oman: 'Middle East',
    Bahrain: 'Middle East',
    Ireland: 'Europe',
    Germany: 'Europe',
  };
  const { data } = useQuery(['locations_list', auction], () => AuctionService.getAuctionLocations(auction), {
    select: (res) => {
      const { locations = [] } = res || {};

      return locations
        .filter((location) => location.latitude)
        .map((location) => ({
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
          region: regionsMap[location.country.name],
          stateName: location.stateName,
          image: location.image,
          thumbnail: location.thumbnail,
        }));
    },
  });

  return data || [];
};

export default useAllAuctionLocations;
