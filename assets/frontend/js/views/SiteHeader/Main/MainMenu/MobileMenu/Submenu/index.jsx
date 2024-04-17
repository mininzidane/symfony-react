import React, { memo, useState } from 'react';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import TriangleIcon from '../../Shared/TriangleIcon';
import ExtraMenu from '../ExtraMenu';
import useStyles from './useStyles';

function Submenu({ label, menuItems, isOpen, onTriggerClick, isLazyLoad, showExtraMenu, extraMenuRef, closeAll }) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  function handleExtraMenuClose() {
    showExtraMenu(false);
    setActiveItemIndex(null);
  }
  const extraMenuData = activeItemIndex !== null && menuItems[activeItemIndex];

  return (
    <div className={classes.root}>
      <button className={classes.trigger} type="button" onClick={onTriggerClick}>
        <span>{label}</span>

        <svg
          className={classnames(classes.triggerIcon, { 'is-open': isOpen })}
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M0 0L4.00083 4L8 1.39876e-06L0 0Z" fill="white" />
        </svg>
      </button>

      <Collapse in={isOpen} timeout="auto">
        <ul className={classes.submenu}>
          {menuItems.map((item, index) => {
            if (typeof item.isVisible === 'function' && !item.isVisible()) {
              return null;
            }

            return (
              <li key={item.href || item.id} className={classes.submenuListItem}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (isLazyLoad) {
                      e.preventDefault();
                      showExtraMenu(true);
                      setActiveItemIndex(index);
                    }
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className={classes.submenuLink}
                >
                  <span>{item.label}</span>
                  {isLazyLoad && <TriangleIcon className={classes.rightTriangleIcon} />}
                </a>
              </li>
            );
          })}
        </ul>
        {extraMenuData && (
          <ExtraMenu
            close={handleExtraMenuClose}
            extraMenuRef={extraMenuRef}
            label={extraMenuData.label}
            menuItems={extraMenuData.links}
            closeAll={closeAll}
          />
        )}
      </Collapse>
    </div>
  );
}

Submenu.propTypes = {
  label: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onTriggerClick: PropTypes.func.isRequired,
  isLazyLoad: PropTypes.bool,
  showExtraMenu: PropTypes.func,
  extraMenuRef: PropTypes.shape({ current: PropTypes.any }),
  closeAll: () => {},
};

Submenu.defaultProps = {
  isLazyLoad: false,
  showExtraMenu: () => null,
  extraMenuRef: null,
  closeAll: () => {},
};

export default memo(Submenu);
