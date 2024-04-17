/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';
import throttle from 'lodash/throttle';
import t from 'frontend/js/api/TranslatorService';
import useStyles from './useStyles';

function PopularSearches({ captionClassName, searches, handleClick }) {
  const classes = useStyles();
  const ref = useRef();
  const [isScrolled, setIsScrolled] = useState(false);

  function updateOverflowState() {
    if (!ref.current) {
      return;
    }

    setIsScrolled(ref.current.scrollLeft > 0);
  }

  if (!searches.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classnames(classes.caption, captionClassName)}>{t('header.search.popularSearches')}</div>

      <div className={classes.searchesListWrap}>
        <div className={classnames(classes.fade, 'is-left')} style={{ opacity: isScrolled ? 1 : 0 }} />

        <ScrollContainer
          className={classes.scrollContainer}
          onScroll={throttle(updateOverflowState, 100)}
          innerRef={ref}
        >
          <div className={classes.searchesList}>
            {searches.map((search, index) => (
              <button type="button" className={classes.search} key={index} onMouseDown={() => handleClick(search)}>
                {search}
              </button>
            ))}
          </div>
        </ScrollContainer>

        <div className={classnames(classes.fade, 'is-right')} />
      </div>
    </div>
  );
}

export default PopularSearches;
