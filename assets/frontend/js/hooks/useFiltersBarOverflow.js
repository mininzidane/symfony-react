import { useState, useLayoutEffect } from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useEventListener from 'frontend/js/hooks/useEventListener';

const ITEMS_GAP_SIZE = 14;

function calcShiftToLeft(ref) {
  const $container = ref.current;
  const containerScrollLeft = $container.scrollLeft;
  const containerWidth = $container.getBoundingClientRect().width;
  const $items = Array.from($container.children);
  let itemIndex = null;
  let overflowWidth;

  function getOverflowItemIndex() {
    for (let i = 0; i < $items.length; i++) {
      const $item = $items[i];
      const itemOffsetLeft = $item.offsetLeft;
      const itemWidth = $item.getBoundingClientRect().width;

      if (itemOffsetLeft + itemWidth > containerWidth + containerScrollLeft) {
        const diff = itemOffsetLeft + itemWidth - containerWidth - containerScrollLeft;
        itemIndex = i;
        overflowWidth = itemWidth - diff;
        break;
      }
    }
  }

  function getShiftSize() {
    const $nextItems = $items.slice(itemIndex, itemIndex + 3);
    let sum = 0;

    for (let i = 0; i < $nextItems.length; i++) {
      const $item = $nextItems[i];
      const itemWidth = $item.getBoundingClientRect().width;

      sum += itemWidth;
    }

    sum += $nextItems.length * ITEMS_GAP_SIZE - ITEMS_GAP_SIZE / 2 - overflowWidth;

    return sum;
  }

  getOverflowItemIndex();

  return itemIndex !== null ? containerScrollLeft + getShiftSize() : containerScrollLeft;
}

function calcShiftToRight(ref) {
  const $container = ref.current;
  const containerScrollLeft = $container.scrollLeft;
  const $items = Array.from($container.querySelectorAll('button'));
  let itemIndex = null;
  let overflowWidth;

  function getOverflowItemIndex() {
    for (let i = $items.length - 1; i >= 0; i--) {
      const $item = $items[i];
      const itemOffsetLeft = $item.offsetLeft;
      const itemWidth = $item.getBoundingClientRect().width;

      if (itemOffsetLeft < containerScrollLeft) {
        const diff = containerScrollLeft - itemOffsetLeft;
        itemIndex = i;
        overflowWidth = itemWidth - diff;
        break;
      }
    }
  }

  function getShiftSize() {
    const firstIndex = itemIndex - 2;
    const nextIndex = firstIndex >= 0 ? firstIndex : 0;
    const $nextItems = $items.slice(nextIndex, itemIndex + 1);
    let sum = 0;

    for (let i = 0; i < $nextItems.length; i++) {
      const $item = $nextItems[i];
      const itemWidth = $item.getBoundingClientRect().width;

      sum += itemWidth;
    }

    sum += $nextItems.length * ITEMS_GAP_SIZE - ITEMS_GAP_SIZE / 2 - overflowWidth;

    return sum;
  }

  getOverflowItemIndex();

  return itemIndex !== null ? containerScrollLeft - getShiftSize() : containerScrollLeft;
}

function useFiltersBarOverflow(ref) {
  const DESKTOP_SIDE_PADDING = 0;
  const MOBILE_SIDE_PADDING = 12;

  const { isBelowSm } = useBreakpoint();
  const [hasOverflowLeft, setHasOverflowLeft] = useState(false);
  const [hasOverflowRight, setHasOverflowRight] = useState(false);
  const sidePaddings = isBelowSm ? MOBILE_SIDE_PADDING : DESKTOP_SIDE_PADDING;

  function setOverflowValues() {
    if (!ref.current) {
      return;
    }

    const { scrollWidth, clientWidth, scrollLeft } = ref.current;
    const diff = scrollWidth - clientWidth;

    if (diff <= 0) {
      setHasOverflowLeft(false);
      setHasOverflowRight(false);
    } else {
      setHasOverflowLeft(scrollLeft > sidePaddings);
      setHasOverflowRight(scrollLeft < diff - sidePaddings);
    }
  }

  useLayoutEffect(() => {
    window.requestAnimationFrame(setOverflowValues);
  });
  useEventListener('resize', setOverflowValues);

  return { hasOverflowLeft, hasOverflowRight, setOverflowValues };
}

export default useFiltersBarOverflow;

export { calcShiftToLeft, calcShiftToRight };
