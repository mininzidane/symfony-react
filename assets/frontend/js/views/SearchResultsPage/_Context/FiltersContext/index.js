import { useCallback, useContext, useMemo, useEffect } from 'react';
import { createContainer } from 'react-tracked';
import isEmpty from 'lodash/isEmpty';
import PaginationContext from 'frontend/js/context/PaginationContext';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useFilters from './useFilters';
import useURLSync from './useURLSync';
import useRefinements from './useRefinements';
import useFiltersOpenState from './useFiltersOpenState';
import useQuery from './useQuery';

const useValues = () => {
  const { formatNumber } = NumberService;
  const { setCurrentPage } = useContext(PaginationContext);
  const [refinements, refinementsDispatch] = useRefinements();
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useFiltersOpenState();

  const query = useQuery(refinements);
  const filters = useFilters(query);

  useURLSync(refinements);

  useEffect(() => {
    dispatchEvent(new CustomEvent('init_refinements'));
  }, [query.fixedCriteria]);

  const dispatch = useCallback((action) => {
    refinementsDispatch(action);

    if (action.type !== 'FILL') {
      setTimeout(() => {
        RouterService.addQueryParams({ page: undefined }, { pushToHistory: true });
        setCurrentPage(1);
      }, 0);
    }
  }, []);

  const isSectionApplied = useCallback(
    (section) => Boolean(refinements.find((v) => v.section === section)),
    [refinements],
  );

  const hasNoOptions = useCallback((section) => filters?.[section]?.total <= 0, [filters]);

  const getLabel = useCallback(
    (refinement) => {
      if (!filters) {
        return '';
      }

      const { type, section } = refinement;

      switch (type) {
        case 'CHECKBOX': {
          if (refinement.label) {
            return refinement.label;
          }

          const facet = filters?.[section]?.values?.all?.find(
            (v) =>
              String(v.key) === String(refinement.value) ||
              String(v.label).replace(' ', '-').toLowerCase() === String(refinement.value).toLowerCase(),
          );
          return facet?.label;
        }
        case 'MULTIVALUE': {
          if (refinement.label) {
            return refinement.label;
          }

          if (['odometer', 'years'].includes(section)) {
            const { appliedFrom, appliedTo } = filters?.[section]?.values || {};
            const applyFormat = section !== 'years';
            const formattedFrom = applyFormat ? formatNumber(appliedFrom) : appliedFrom;
            const formattedTo = applyFormat ? formatNumber(appliedTo) : appliedTo;

            return appliedFrom === appliedTo ? appliedFrom : `${formattedFrom} – ${formattedTo}`;
          }

          return undefined;
        }
        default: {
          return refinement.label;
        }
      }
    },
    [filters],
  );

  const total = useMemo(
    () => Object.values(filters || {}).reduce((acc, curr) => Math.max(acc, curr.total), 0),
    [filters],
  );

  const areFiltersEmpty = isEmpty(refinements) && total <= 1;
  const filtersCount = new Set(refinements.map((v) => v.section)).size;

  return [
    {
      refinements,
      dispatch,
      filters,
      loading: !filters || query.search_hash,
      filtersCount,
      query,
      isSectionApplied,
      hasNoOptions,
      getLabel,
      areFiltersEmpty,
      isFiltersPanelOpen,
      setIsFiltersPanelOpen,
    },
  ];
};

export const { Provider: FiltersProvider, useTracked: useFiltersContext } = createContainer(useValues);
