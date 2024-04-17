/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import classnames from 'classnames';
import throttle from 'lodash/throttle';
import ScrollContainer from 'react-indiana-drag-scroll';
import FiltersModal from 'frontend/js/views/Account/BidStatusPage/Shared/Filters';
import ArrowSvg from 'frontend/images/shared/various/arrow-triangle-right.svg';
import useFiltersBarOverflow, { calcShiftToLeft, calcShiftToRight } from 'frontend/js/hooks/useFiltersBarOverflow';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import FeaturedFilters from './FeaturedFilters';
import useStyles from './useStyles';

function Chips({ bidders, dateRanges }) {
  const classes = useStyles();
  const ref = useRef();
  const { isAboveSm, isBelowLg } = useBreakpoint();
  const { hasOverflowLeft, hasOverflowRight, setOverflowValues } = useFiltersBarOverflow(ref);

  function handleScrollToRight() {
    ref.current.scrollTo({ left: calcShiftToRight(ref), behavior: 'smooth' });
  }

  function handleScrollToLeft() {
    ref.current.scrollTo({ left: calcShiftToLeft(ref), behavior: 'smooth' });
  }

  return (
    <div
      className={classnames(classes.root, {
        'has-overflow-left': hasOverflowLeft,
        'has-overflow-right': hasOverflowRight,
      })}
    >
      <div>
        <ScrollContainer className={classes.scrollContainer} onScroll={throttle(setOverflowValues, 100)} innerRef={ref}>
          {isBelowLg && (
            <FiltersModal hasTime hasSearchByLotVin bidders={bidders} dateRanges={dateRanges} absolute={false} />
          )}

          <FeaturedFilters />
        </ScrollContainer>
      </div>

      {isAboveSm && hasOverflowLeft && (
        <button type="button" onClick={handleScrollToRight} className={classes.sliderArrowLeft}>
          <img src={ArrowSvg} alt="Arrow" />
        </button>
      )}
      {isAboveSm && hasOverflowRight && (
        <button type="button" onClick={handleScrollToLeft} className={classes.sliderArrowRight}>
          <img src={ArrowSvg} alt="Arrow" />
        </button>
      )}
    </div>
  );
}

export default Chips;
