import get from 'lodash/get';
import { useQuery } from 'react-query';
import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';
import LanguageService from 'frontend/js/api/LanguageService';
import SpaMetaDataService from 'frontend/js/api/SpaMetaDataService';

function useSeoData(metaKey, args = {}) {
  const locale = LanguageService.getIntlLocale();

  const queryKey = ['meta', metaKey];
  if (args) {
    if (args.locale) {
      delete args.locale;
    }

    queryKey.push(BaseApiServiceInstance.objectToQueryParams(args));
  }

  const { data = {}, isLoading } = useQuery(queryKey, () => SpaMetaDataService.getMetaData(metaKey, locale, args), {
    enabled: Boolean(metaKey),
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return [get(data, 'seo', {}), isLoading];
}

export default useSeoData;
