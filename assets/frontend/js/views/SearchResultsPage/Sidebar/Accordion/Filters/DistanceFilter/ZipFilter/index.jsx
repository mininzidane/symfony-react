import React from 'react';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import Form from './Form';

const SECTION = 'distance';

function ZipFilter() {
  const [{ refinements, query, dispatch }] = useFiltersContext();

  return <Form refinements={refinements} query={query} dispatch={dispatch} section={SECTION} />;
}

export default ZipFilter;
