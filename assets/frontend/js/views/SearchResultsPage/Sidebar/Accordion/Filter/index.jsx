/* eslint-disable react/prop-types */
import React from 'react';
import { useFiltersContext } from 'frontend/js/views/SearchResultsPage/_Context/FiltersContext';
import AccordionItem from '../AccordionItem';

function Filter({
  withoutAccordion,
  label,
  sectionKey,
  expanded,
  noReset,
  overflow,
  component: Component,
  animationDuration,
  onToggle,
  titleQaId,
  ...section
}) {
  const [{ filters, refinements, query, isSectionApplied, hasNoOptions, dispatch }] = useFiltersContext();
  const showResetButton = !noReset && isSectionApplied(sectionKey);

  if (!filters[sectionKey] || hasNoOptions(sectionKey)) {
    return null;
  }

  const { values } = filters[sectionKey];

  const filter = (
    <Component
      key={sectionKey}
      section={sectionKey}
      values={values}
      dispatch={dispatch}
      refinements={refinements}
      query={query}
      {...section}
    />
  );

  if (withoutAccordion) {
    return <div className="pt-15 pb-15">{filter}</div>;
  }

  return (
    <AccordionItem
      onToggle={onToggle}
      label={label}
      initialExpanded={expanded}
      isActive={isSectionApplied(sectionKey)}
      animationDuration={animationDuration}
      overflow={overflow}
      key={label}
      titleQaId={titleQaId}
      onResetClick={
        showResetButton
          ? () => {
              dispatch({ type: 'RESET', payload: sectionKey });
            }
          : null
      }
    >
      {filter}
    </AccordionItem>
  );
}

export default Filter;
