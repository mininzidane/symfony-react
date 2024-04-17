import ViewportService from 'frontend/js/lib/utils/ViewportService';

const ScrollService = {
  scrollToTop(isSmooth = false) {
    return window.scroll({ top: 0, behavior: isSmooth ? 'smooth' : 'auto' });
  },

  scrollIntoView($el, offsetFromHeader = 15, behavior = 'auto') {
    if (!$el) {
      return;
    }

    const headerHeight = ViewportService.getHeaderHeight();
    const elTopOffset = ViewportService.offset($el).top;
    const delta = headerHeight + offsetFromHeader;

    window.scroll({ top: elTopOffset - delta, behavior });
  },

  scrollIntoViewById(id, ...args) {
    const $el = document.getElementById(id);
    this.scrollIntoView($el, ...args);
  },

  smoothScrollIntoViewById(id, offsetFromHeader) {
    ScrollService.scrollIntoViewById(id, offsetFromHeader, 'smooth');
  },

  highlightScrollTarget(id, animationClass = 'highlight-animation', duration = 6000) {
    const $el = document.getElementById(id);

    if ($el) {
      $el.classList.add(animationClass);

      setTimeout(() => {
        $el.classList.remove(animationClass);
      }, duration);
    }
  },

  smoothScroll({ el = window, duration = 0, top = 0, left = 0 }) {
    const w = window;
    const d = document;
    const Element = w.HTMLElement || w.Element;
    const now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

    function scrollElement(xVal, yVal) {
      this.scrollLeft = xVal;
      this.scrollTop = yVal;
    }

    const original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView,
    };

    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    function step(context) {
      const { scrollable, method, startTime, duration: time, startX, startY, top: y, left: x } = context;
      const t = now();
      let elapsed = (t - startTime) / time;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      const value = ease(elapsed);

      const currentX = startX + (x - startX) * value;
      const currentY = startY + (y - startY) * value;

      method.call(scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== x || currentY !== y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    let scrollable;
    let startX;
    let startY;
    let method;
    const startTime = now();

    // define scroll context
    if (el === d.body) {
      scrollable = w;
      startX = w.scrollX || w.pageXOffset;
      startY = w.scrollY || w.pageYOffset;
      method = original.scroll;
    } else {
      scrollable = el;
      startX = el.scrollLeft;
      startY = el.scrollTop;
      method = scrollElement;
    }

    // scroll looping over a frame
    step({
      scrollable,
      method,
      startTime,
      duration,
      startX,
      startY,
      top,
      left,
    });
  },
};

export default ScrollService;
