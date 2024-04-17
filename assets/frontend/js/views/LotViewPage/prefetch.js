import reactQueryClient from 'frontend/js/providers/ReactQueryProvider/client';
import LotService from 'frontend/js/api/LotService';
import ClearVinService from 'frontend/js/api/ClearVinService';

function prefetch(params) {
  const { lotId, slug } = params;
  const auction = LotService.prefixToAuctionType(slug.split('_')[0]);

  reactQueryClient
    .prefetchQuery(
      ['lot-info-data', `Lot:${lotId}_${auction?.toLowerCase()}`],
      () => LotService.getLotInfo({ query: String(lotId), auction: auction?.toLowerCase(), navdata: true }),
      {
        cacheTime: 5 * 60 * 1000,
        staleTime: 15 * 1000,
      },
    )
    .catch(() => {});

  reactQueryClient
    .prefetchQuery(['cv-preview', lotId, auction], () => ClearVinService.getPreview(lotId, auction), {
      staleTime: Infinity,
    })
    .catch(() => {});
}

export default prefetch;
