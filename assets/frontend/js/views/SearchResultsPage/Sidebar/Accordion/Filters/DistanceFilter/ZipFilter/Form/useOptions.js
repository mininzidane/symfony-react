import { useMemo } from 'react';
import get from 'lodash/get';
import useFilters from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext/useFilters';

function useOptions(section, query, location) {
  const params = {
    ...query,
  };

  if (location) {
    params.UOrigin = [location.lat, location.lon].join(',');
  }

  const { loading, data: filters } = useFilters(params, {}, true);

  const options = useMemo(
    () =>
      get(filters, [section, 'values', 'all'], []).reduce((acc, v) => {
        if (v.cnt) {
          acc.push({
            label: v.label,
            count: v.cnt,
            value: v.key,
          });
        }

        return acc;
      }, []),
    [filters],
  );

  return { loading, options };
}

export default useOptions;
