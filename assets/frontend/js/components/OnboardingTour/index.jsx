import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Portal from '@material-ui/core/Portal/Portal';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Popper from 'frontend/js/components/Popper';
import useEventListener from 'frontend/js/hooks/useEventListener';
import useHideNotifications from 'frontend/js/hooks/useHideNotifications';
import Tooltip from './Tooltip';
import useStyles from './useStyles';

function OnboardingTour({ steps, onClose }) {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { isAboveSm, isBelowSm } = useBreakpoint();
  const overlay = useRef();

  function handleClose() {
    setIsOpen(false);
    onClose();
  }

  function handleNext() {
    if (index === steps.length - 1) {
      handleClose();
    } else {
      setIndex(index + 1);
    }
  }

  function handlePrev() {
    setIndex(Math.max(index - 1, 0));
  }

  function handleGoTo(step) {
    setIndex(step);
  }

  function highlight() {
    const $el = steps[index]?.selector ? document.querySelector(steps[index]?.selector) : null;

    if (!overlay.current) {
      return;
    }

    if ($el) {
      if (!ViewportService.isElementInViewport($el, ViewportService.getHeaderHeight() + 15, 15)) {
        ScrollService.scrollIntoView($el, 15);
      }

      const rect = $el.getBoundingClientRect();
      overlay.current.style.top = `${rect.top - 5}px`;
      overlay.current.style.left = `${rect.left - 5}px`;
      overlay.current.style.width = `${rect.width + 10}px`;
      overlay.current.style.height = `${rect.height + 10}px`;
    } else {
      overlay.current.style.top = '';
      overlay.current.style.left = '';
      overlay.current.style.width = '';
      overlay.current.style.height = '';
    }
  }

  useHideNotifications(isOpen);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useLayoutEffect(() => {
    ViewportService.lockBodyScrolling(isOpen, 'onboarding');

    return () => {
      ViewportService.lockBodyScrolling(false, 'onboarding');
    };
  }, [isOpen]);

  useLayoutEffect(highlight, [index]);
  useEventListener('resize', highlight);

  if (!isOpen) {
    return null;
  }

  const step = steps[index];
  const $el = step?.selector ? document.querySelector(step?.selector) : null;
  const tooltip = (
    <Tooltip
      onNext={handleNext}
      onPrev={handlePrev}
      onClose={handleClose}
      total={steps.length}
      title={step.title}
      description={step.description}
      current={index}
      onGoTo={handleGoTo}
    />
  );

  return (
    <Portal container={document.body} onRendered={highlight}>
      <div className={classes.root}>
        <div className={classes.overlay} ref={overlay} />

        {isAboveSm && (
          <>
            {$el ? (
              <Popper
                key={index}
                anchorEl={$el}
                boundariesElement="viewport"
                arrow
                classes={{ paper: classes.paper, arrow: classes.arrow }}
                clickAway={false}
                offsetTop={20}
              >
                {tooltip}
              </Popper>
            ) : (
              <div className={classes.noAnchor}>{tooltip}</div>
            )}
          </>
        )}

        {isBelowSm && <div className={classes.mobile}>{tooltip}</div>}
      </div>
    </Portal>
  );
}

OnboardingTour.defaultProps = {
  onClose: () => {},
};

OnboardingTour.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string,
      title: PropTypes.node,
      description: PropTypes.node,
    }),
  ).isRequired,
  onClose: PropTypes.func,
};

export default OnboardingTour;
