import { useQuery } from 'react-query';
import ClearVinService from 'frontend/js/api/ClearVinService';

function useClearVinDetails(lotId, auction, skip) {
  const { data, isLoading } = useQuery(
    ['cv-preview', lotId, auction],
    () => ClearVinService.getPreview(lotId, auction),
    { staleTime: Infinity, enabled: Boolean(lotId) && !skip },
  );

  return {
    clearVinData: data,
    loading: isLoading,
  };
}

export default useClearVinDetails;
