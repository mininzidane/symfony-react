import React, { useRef } from 'react';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ScrollContainer from 'react-indiana-drag-scroll';
import ArrowSvg from 'frontend/images/shared/various/arrow-triangle-right.svg';
import useFiltersBarOverflow, { calcShiftToLeft, calcShiftToRight } from 'frontend/js/hooks/useFiltersBarOverflow';
import FiltersToggle from '../FiltersToggle';
import FeaturedFilters from './FeaturedFilters';
import useStyles from '../useStyles';

function Chips() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();
  const ref = useRef();
  const { hasOverflowLeft, hasOverflowRight, setOverflowValues } = useFiltersBarOverflow(ref);

  function handleScrollToRight() {
    ref.current.scrollTo({ left: calcShiftToRight(ref), behavior: 'smooth' });
  }

  function handleScrollToLeft() {
    ref.current.scrollTo({ left: calcShiftToLeft(ref), behavior: 'smooth' });
  }

  return (
    <div
      className={classnames(classes.scrollWrap, {
        'has-overflow-left': hasOverflowLeft,
        'has-overflow-right': hasOverflowRight,
      })}
    >
      <div id="CHIPS">
        <ScrollContainer className={classes.scrollContainer} onScroll={throttle(setOverflowValues, 100)} innerRef={ref}>
          <FiltersToggle />

          <FeaturedFilters />
        </ScrollContainer>
      </div>

      {isAboveSm && (
        <>
          {hasOverflowLeft && (
            <button type="button" onClick={handleScrollToRight} className={classes.sliderArrowLeft}>
              <img src={ArrowSvg} alt="Arrow" />
            </button>
          )}
          {hasOverflowRight && (
            <button type="button" onClick={handleScrollToLeft} className={classes.sliderArrowRight}>
              <img src={ArrowSvg} alt="Arrow" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Chips;
