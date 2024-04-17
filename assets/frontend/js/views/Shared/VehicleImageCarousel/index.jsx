/* eslint-disable prefer-destructuring,consistent-return */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ImageNotFound from 'frontend/images/shared/errors/image-not-found.svg';
import LeftArrowIcon from 'frontend/images/shared/various/arrow_left_squared_white.svg';
import handleTouchEvents from './handleTouchEvents';
import throttle from './throttle';
import observer from './observer';
import useStyles from './useStyles';

function VehicleImageCarousel({ images, lazy, leftIconSrc, title, getAPI, onPositionChange, ...props }) {
  const classes = useStyles(props);
  const ref = useRef();
  const refWrapper = useRef();
  const refLeftButton = useRef();
  const refRightButton = useRef();
  const refBullets = useRef();
  const refCounter = useRef();
  const api = useRef({});

  useEffect(() => {
    getAPI(api.current);
  }, []);

  useEffect(() => {
    const cleanup = [];

    const root = ref.current;
    const wrapper = refWrapper.current;

    const leftButton = refLeftButton.current;
    const rightButton = refRightButton.current;

    const bullets = refBullets.current;
    const counter = refCounter.current;

    const state = ['left', 'center', 'right'];
    let current = 0;

    const slides = [wrapper.children[0], wrapper.children[1], wrapper.children[2]];

    slides.forEach((slide) => {
      const img = slide.children[0];
      img.onerror = (e) => {
        if (e.target.getAttribute('src')) {
          img.src = ImageNotFound;
        }
      };

      cleanup.push(() => {
        img.onerror = null;
      });
    });

    if (lazy) {
      observer.observe(wrapper, (visible) => {
        if (visible) {
          wrapper.children[1].children[0].src = images[0];
          observer.unobserve(wrapper);
        }
      });
      cleanup.push(() => observer.unobserve(wrapper));
    }

    function init() {
      wrapper.children[0].children[0].src = images[images.length - 1];
      wrapper.children[2].children[0].src = images[1];

      root.removeEventListener('mouseenter', init);
      root.removeEventListener('touchstart', init);
    }

    root.addEventListener('mouseenter', init, { once: true, passive: true, useCapture: false });
    root.addEventListener('touchstart', init, { once: true, passive: true, useCapture: false });
    cleanup.push(() => {
      root.removeEventListener('mouseenter', init);
      root.removeEventListener('touchstart', init);
    });

    function setCurrent(index) {
      current = index;

      onPositionChange(current);
    }

    function position(delta) {
      if (current + delta < 0) {
        return images.length - 1;
      }

      return (current + delta) % images.length;
    }

    function rotate(delta) {
      slides[0].style.zIndex = 1;
      slides[1].style.zIndex = 1;
      slides[2].style.zIndex = 1;

      bullets?.children[current].classList.remove('is-active');

      setCurrent(position(delta));

      bullets?.children[current].classList.add('is-active');
      if (counter) {
        counter.innerText = current + 1;
      }

      let slideToReplace;
      if (delta > 0) {
        slideToReplace = slides[state.indexOf('left')];
      } else {
        slideToReplace = slides[state.indexOf('right')];
      }

      slideToReplace.style.zIndex = -1;

      if (delta > 0) {
        state.unshift(state.pop());
      } else {
        state.push(state.shift());
      }

      slides[0].dataset.position = state[0];
      slides[1].dataset.position = state[1];
      slides[2].dataset.position = state[2];

      slideToReplace.children[0].src = '';
      slideToReplace.children[0].src = images[position(delta)];
    }

    const goLeft = throttle(() => {
      rotate(+1);
    }, 300);

    const goRight = throttle(() => {
      rotate(-1);
    }, 300);

    function goto(index) {
      if (index > images.length - 1 || Number.isNaN(index)) {
        return;
      }

      bullets?.children[index].classList.add('is-active');
      bullets?.children[current].classList.remove('is-active');

      if (counter) {
        counter.innerText = index + 1;
      }

      setCurrent(index);

      const left = wrapper.querySelector("[data-position='left']");
      const center = wrapper.querySelector("[data-position='center']");
      const right = wrapper.querySelector("[data-position='right']");

      center.children[0].src = '';
      center.children[0].src = images[index];

      right.children[0].src = '';
      right.children[0].src = images[position(+1)];

      left.children[0].src = '';
      left.children[0].src = images[position(-1)];
    }

    leftButton.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goRight();
    };
    rightButton.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goLeft();
    };
    cleanup.push(() => {
      leftButton.onclick = null;
      rightButton.onclick = null;
    });

    if (bullets) {
      bullets.onclick = (e) => {
        e.preventDefault();

        const index = Number(e.target.dataset.index);

        goto(index);
      };
      cleanup.push(() => {
        bullets.onclick = null;
      });
    }

    let width;
    let left;
    let center;
    let right;

    function onTouchStart() {
      width = wrapper.clientWidth;

      left = wrapper.querySelector("[data-position='left']");
      center = wrapper.querySelector("[data-position='center']");
      right = wrapper.querySelector("[data-position='right']");
    }

    function onTouchMove(diff) {
      left.style.transition = 'none';
      left.style.transform = `translate3d(${-width - diff}px, 0, 0)`;

      center.style.transition = 'none';
      center.style.transform = `translate3d(${-diff}px, 0, 0)`;

      right.style.transition = 'none';
      right.style.transform = `translate3d(${width - diff}px, 0, 0)`;
    }

    function onTouchEnd(diff) {
      left.style.transition = '';
      left.style.transform = ``;

      center.style.transition = '';
      center.style.transform = ``;

      right.style.transition = '';
      right.style.transform = ``;

      if (Math.abs(diff) > width / 2) {
        if (diff < 0) {
          goRight();
        } else {
          goLeft();
        }
      }
    }

    function onSwipe(direction) {
      if (direction === 'left') {
        goLeft();
      } else {
        goRight();
      }
    }

    const removeTouchListeners = handleTouchEvents(wrapper, onTouchStart, onTouchMove, onTouchEnd, onSwipe);
    cleanup.push(removeTouchListeners);

    api.current.goto = goto;

    return () => {
      cleanup.forEach((func) => func());
    };
  }, []);

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.slides} ref={refWrapper}>
        <div className={classes.slide} data-position="left">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={title} />
        </div>
        <div className={classes.slide} data-position="center">
          <img
            src={lazy ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : images[0]}
            alt={title}
          />
        </div>
        <div className={classes.slide} data-position="right">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={title} />
        </div>
      </div>

      <div className={classnames(classes.navigation, classes.prev)} ref={refLeftButton}>
        <img className="centered" src={leftIconSrc} alt="" />
      </div>

      <div className={classnames(classes.navigation, classes.next)} ref={refRightButton}>
        <img className="centered" src={leftIconSrc} alt="" />
      </div>

      {images.length > 10 ? (
        <div className={classes.position}>
          <span ref={refCounter}>1</span>/{images.length}
        </div>
      ) : (
        <div className={classes.position} ref={refBullets}>
          {images.map((_, index) => (
            <span key={index} className={classnames(classes.bullet, index === 0 && 'is-active')} data-index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

VehicleImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  leftIconSrc: PropTypes.string,
  lazy: PropTypes.bool,
  getAPI: PropTypes.func,
  onPositionChange: PropTypes.func,
};

VehicleImageCarousel.defaultProps = {
  title: '',
  leftIconSrc: LeftArrowIcon,
  lazy: true,
  getAPI: () => {},
  onPositionChange: () => {},
};

export default React.memo(VehicleImageCarousel, () => true);
