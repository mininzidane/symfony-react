import { useMemo } from 'react';
import get from 'lodash/get';
import useFilters from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext/useFilters';

function useOptions(section, query, port) {
  const params = {
    ...query,
  };

  if (port && port !== 'any_port' && !(query.p_distance || '').includes(port)) {
    params.PDestination = port;
  }

  const { loading, data: filters } = useFilters(params, {}, true);

  const ports = useMemo(
    () =>
      get(filters, [section, 'values', 'options'], []).map((v) => ({
        label: v.label,
        value: v.key,
      })),
    [filters],
  );

  const distances = useMemo(
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

  // const parameterIsApplied = get(filters, [SECTION, "values", "appliedParameter"];

  return {
    loading,
    data: {
      ports,
      distances,
    },
    // parameterIsApplied
  };
}

export default useOptions;
