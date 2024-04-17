import React, { cloneElement, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popover from '../Popover';

function ContentPopover({
  trigger,
  popoverClass,
  popoverTitle,
  children,
  isInline,
  popoverOptions,
  offsetTop,
  activeTriggerClassName,
  keepMounted,
  onClick,
  onOpen,
  onClose,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const triggerRef = useRef();
  function toggleDropdown() {
    if (onClick) {
      onClick();
    }
    setDropdownOpen((state) => {
      const nextState = !state;
      if (nextState) {
        onOpen();
      } else {
        onClose();
      }
      return nextState;
    });
  }

  return (
    <div className={classnames('content-popover', !isInline && 'sm-12')}>
      <div className="content-popover__trigger" ref={triggerRef}>
        {cloneElement(trigger, {
          onClick: toggleDropdown,
          className: classnames(trigger.props.className, { [activeTriggerClassName]: dropdownOpen }),
        })}
      </div>

      {(keepMounted || dropdownOpen) && (
        <Popover
          className={popoverClass}
          open={dropdownOpen}
          onClose={toggleDropdown}
          title={popoverTitle}
          triggerRef={triggerRef.current}
          popoverOptions={popoverOptions}
          offsetTop={offsetTop}
          isFlipEnabled={false}
        >
          {typeof children === 'function' ? children({ close: toggleDropdown }) : children}
        </Popover>
      )}
    </div>
  );
}

ContentPopover.defaultProps = {
  popoverClass: '',
  popoverTitle: '',
  onClick: null,
  popoverOptions: {},
  isInline: false,
  activeTriggerClassName: '',
  offsetTop: null,
  onOpen: () => {},
  onClose: () => {},
  keepMounted: true,
};

ContentPopover.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
  trigger: PropTypes.node.isRequired,
  popoverClass: PropTypes.string,
  popoverTitle: PropTypes.node,
  popoverOptions: PropTypes.shape({
    placement: PropTypes.string,
  }),
  isInline: PropTypes.bool,
  onClick: PropTypes.func,
  activeTriggerClassName: PropTypes.string,
  offsetTop: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  keepMounted: PropTypes.bool,
};

export default ContentPopover;
