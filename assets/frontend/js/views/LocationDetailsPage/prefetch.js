import queryClient from 'frontend/js/providers/ReactQueryProvider/client';
import AuctionService from 'frontend/js/api/AuctionService';

function prefetch(params) {
  const { slug } = params;

  queryClient
    .prefetchQuery(['location_details', slug], () => AuctionService.getAuctionLocationDetails(slug))
    .catch(() => {});
}

export default prefetch;
