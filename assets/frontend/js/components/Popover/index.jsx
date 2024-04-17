import React, { useEffect, useRef, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popper from '@material-ui/core/Popper';
import CloseSvg from 'frontend/images/shared/various/cross-black-10x10.svg';

const defaultOptions = {
  placement: 'bottom',
  offset: 15,
};

function Popover({ title, children, open, triggerRef, onClose, className, popoverOptions, offsetTop, isFlipEnabled }) {
  const [isOpen, setIsOpen] = useState(open);
  const popperRef = useRef();

  const pageYOffset = useMemo(() => window.pageYOffset, [open]);

  const buttonLabel = <img src={CloseSvg} alt="close popover" />;
  const popperOptions = { ...defaultOptions, ...popoverOptions };

  function closeOnOutsideClick(event) {
    if (triggerRef && triggerRef.contains(event.target)) {
      return true;
    }

    if (popperRef.current && popperRef.current.contains(event.target) === false) {
      onClose();
    }

    return true;
  }

  function updatePopper(data) {
    const offsetsPopper = data.offsets.popper;
    offsetsPopper.top += offsetTop;

    const posBottomMax = pageYOffset + document.documentElement.clientHeight;
    if (posBottomMax < offsetsPopper.bottom) {
      offsetsPopper.top -= offsetsPopper.bottom - posBottomMax + popperOptions.offset;
    }

    if (offsetsPopper.top < pageYOffset) {
      offsetsPopper.top = pageYOffset + popperOptions.offset;
    }

    offsetsPopper.bottom = offsetsPopper.top + offsetsPopper.height;

    return data;
  }

  useEffect(() => {
    const { body: $body } = document;

    if (open) {
      setTimeout(() => setIsOpen(true), 0);
      $body.addEventListener('click', closeOnOutsideClick);
    } else {
      setIsOpen(false);
      $body.removeEventListener('click', closeOnOutsideClick);
    }

    return () => {
      $body.removeEventListener('click', closeOnOutsideClick);
    };
  }, [open]);

  return (
    <Popper
      open={open}
      anchorEl={triggerRef}
      onClose={onClose}
      disablePortal={false}
      style={{ zIndex: 9999999 }}
      modifiers={{
        flip: { enabled: isFlipEnabled },
        preventOverflow: {
          enabled: true,
          priority: ['top', 'left', 'right', 'bottom'],
          boundariesElement: 'window',
          padding: popperOptions.offset,
        },
        offset: {
          enabled: true,
          fn: updatePopper,
        },
      }}
      placement={popperOptions.placement}
      ref={popperRef}
    >
      <div className={classNames('popover-wrapper', { 'is-open': isOpen })}>
        <div className={classNames('popover', className)}>
          <div className="popover__header">
            <div className="popover__title">{title}</div>
            <div className="popover__close">
              <button type="button" className="has-extra-hitbox" onClick={onClose}>
                {buttonLabel}
              </button>
            </div>
          </div>
          <div className="popover__content">{children}</div>
        </div>
      </div>
    </Popper>
  );
}

Popover.defaultProps = {
  className: '',
  title: '',
  triggerRef: undefined,
  isFlipEnabled: true,
  popoverOptions: {},
  offsetTop: 10,
};

Popover.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  triggerRef: PropTypes.oneOfType([PropTypes.instanceOf(Element), PropTypes.object]),
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isFlipEnabled: PropTypes.bool,
  popoverOptions: PropTypes.shape({
    placement: PropTypes.string,
  }),
  offsetTop: PropTypes.number,
};

export default Popover;
