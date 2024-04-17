/* eslint-disable react/prop-types */
import React, { useRef, useCallback } from 'react';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import SavedSearches from './SavedSearches';
import Filter from './Filter';
import ToggleSwitches from './ToggleSwitches';
import config from './config';
import useStyles from './useStyles';

function Accordion({ footerRef, onSavedSearchClick }) {
  const ANIMATION_DURATION = 200;
  const classes = useStyles();
  const accordionRef = useRef();

  const updateScrollPosition = useCallback((id) => {
    if (!footerRef?.current) {
      return;
    }

    setTimeout(() => {
      const menuFooterHeight = footerRef.current.clientHeight;
      const $accordionItem = document.getElementById(id);
      const $content = $accordionItem.lastChild;
      const $accordion = accordionRef.current;

      const contentOffsetTop = $content.getBoundingClientRect().top;
      const contentHeight = $content.clientHeight;
      const contentBottomEdge = contentOffsetTop + contentHeight;
      const availableViewport = window.innerHeight - menuFooterHeight;

      if (contentBottomEdge > availableViewport) {
        const overflow = contentBottomEdge - availableViewport;
        const scrollDestination = $accordion.scrollTop + overflow;
        let speed = 3; /* ms per pixel */

        if (overflow < 100) {
          speed = 4;
        }

        if (overflow > 200) {
          speed = 2;
        }

        ScrollService.smoothScroll({
          el: $accordion,
          top: scrollDestination,
          duration: overflow * speed,
        });
      }
    }, ANIMATION_DURATION);
  }, []);

  return (
    <div className={classes.root} ref={accordionRef}>
      <ToggleSwitches />
      <SavedSearches onLinkClick={onSavedSearchClick} />

      {config.map((section) => (
        <Filter
          {...section}
          key={section.sectionKey}
          onToggle={updateScrollPosition}
          animationDuration={ANIMATION_DURATION}
        />
      ))}
    </div>
  );
}

export default Accordion;
