import React from 'react';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import Form from './Form';

const SECTION = 'p_distance';

function PortFilter() {
  const [{ refinements, query, dispatch }] = useFiltersContext();

  return <Form refinements={refinements} query={query} dispatch={dispatch} section={SECTION} />;
}

export default PortFilter;
