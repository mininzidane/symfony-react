import React from 'react';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import Chip from './Chip';

const SECTION = 'featured';

function FeaturedFilters() {
  const [{ filters, refinements, dispatch }] = useFiltersContext();

  const options = filters[SECTION]?.values?.all;

  if (!options) {
    return null;
  }

  function handleDelete(facet) {
    dispatch({
      type: 'REFINE',
      payload: {
        type: 'CHECKBOX',
        section: SECTION,
        value: facet.key,
      },
    });
  }

  function handleAdd(facet) {
    dispatch({
      type: 'REFINE',
      payload: {
        type: 'CHECKBOX',
        section: SECTION,
        value: facet.key,
      },
    });
  }

  const isActive = (key) => refinements.some((v) => v.section === SECTION && v.value === key);

  return options.map((facet, index) => (
    <Chip
      key={facet.key}
      label={facet.label}
      count={facet.cnt}
      onClick={() => handleAdd(facet)}
      onDelete={() => handleDelete(facet)}
      isActive={isActive(facet.key)}
      index={index}
    />
  ));
}

export default FeaturedFilters;
