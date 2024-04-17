import RouterService from 'frontend/js/api/RouterService';
import { useEffect } from 'react';
import useLot from 'frontend/js/hooks/useLot';
import LotService from 'frontend/js/api/LotService';

function useLotData(id, slug) {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);

  const auction = LotService.prefixToAuctionType(slug?.split('_')?.[0]);
  const [data, loading] = useLot(id, auction, true, {
    placeholderData:
      window.lotDetails?.id === id && window.lotDetails?.inventoryAuction === auction
        ? { lot: window.lotDetails }
        : undefined,
  });

  useEffect(() => {
    if (window.lotDetails?.id !== id) {
      window.lotDetails = null;
    }
  }, [id]);

  if (loading) {
    return null;
  }

  const lot = data?.lot;

  if (!lot) {
    RouterService.customRedirect(RouterService.getRoute('searchResults'), true);
    return null;
  }

  if (id !== lot.id || auction !== lot.inventoryAuction || !slug) {
    const redirectUrl = RouterService.getRoute('lot', null, false, { id: lot.id, slug: lot.slug });
    RouterService.customRedirect(redirectUrl, true);
    return null;
  }

  return data;
}

export default useLotData;
