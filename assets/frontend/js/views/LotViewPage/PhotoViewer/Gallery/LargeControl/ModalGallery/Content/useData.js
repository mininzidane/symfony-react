import { useState } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import get from 'lodash/get';
import LotService from 'frontend/js/api/LotService';

function useData(id, auction) {
  const queryClient = useQueryClient();
  const [initialId] = useState(id);
  const [initialAuction] = useState(auction);

  const payload = { id, auction };

  const { data } = useQuery(['large-images-data', payload], () => LotService.getLargeImages(payload), {
    keepPreviousData: true,
  });

  const contents = get(data, 'data.contents', {});

  if (!data) {
    const { lot } = queryClient.getQueryData(['lot-info-data', `Lot:${initialId}_${initialAuction.toLowerCase()}`]);

    return { lot: { ...lot } };
  }

  // press prev
  if (contents.prevLot && contents.prevLot.id === id && contents.prevLot.inventoryAuction === auction) {
    return {
      lot: contents.prevLot,
      nextLot: contents.lot,
      prevLot: null,
    };
  }

  // press next
  if (contents.nextLot && contents.nextLot.id === id && contents.nextLot.inventoryAuction === auction) {
    return {
      lot: contents.nextLot,
      prevLot: contents.lot,
      nextLot: {},
    };
  }

  // press prev to original lot
  if (
    !contents.prevLot &&
    contents.lot.id === id &&
    contents.lot.inventoryAuction === auction &&
    id !== initialId &&
    auction !== initialAuction
  ) {
    return {
      ...contents,
      prevLot: { id: initialId, inventoryAuction: initialAuction },
    };
  }

  return contents;
}

export default useData;
