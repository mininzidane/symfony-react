import RouterService from 'frontend/js/api/RouterService';
import useFixedCriteria from './useFixedCriteria';

function useQuery(refinements) {
  const query = {
    q: RouterService.getQueryParam('q'),
    saved_search_hash: RouterService.getQueryParam('saved_search_hash'),
    recent_search_hash: RouterService.getQueryParam('recent_search_hash'),
  };

  query.search_hash = query.saved_search_hash || query.recent_search_hash;

  query.fixedCriteria = JSON.stringify(useFixedCriteria(query.search_hash));

  refinements.forEach((refinement) => {
    const { type, section } = refinement;

    // eslint-disable-next-line default-case
    switch (type) {
      case 'CHECKBOX': {
        query[section] = [...(query[section] || []), refinement.value];
        break;
      }
      case 'RADIO': {
        query[section] = refinement.value;
        break;
      }
      case 'SWITCH': {
        if (refinement.value) {
          query[section] = refinement.value;
        } else if (query) {
          delete query[section];
        }
        break;
      }
      case 'MULTIVALUE': {
        Object.entries(refinement.values).forEach(([key, value]) => {
          query[key] = value;
        });
        break;
      }
    }
  });

  return query;
}

export default useQuery;
