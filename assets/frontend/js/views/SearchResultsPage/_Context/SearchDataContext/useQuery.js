import { useContext } from 'react';
import PaginationContext from 'frontend/js/context/PaginationContext';
import { useDisplaySettingsContext } from '../DisplaySettingsContext';
import { useFiltersContext } from '../FiltersContext';

function useQuery() {
  const [{ query: filters }] = useFiltersContext();

  const { itemsPerPage, currentPage } = useContext(PaginationContext);
  const [{ sort }] = useDisplaySettingsContext();

  const paginationSettings = { size: itemsPerPage, page: currentPage };
  const sortSettings = sort ? { sort: sort.field, order: sort.order } : {};

  const query = {
    ...filters,
    ...paginationSettings,
    ...sortSettings,
  };

  return query;
}

export default useQuery;
