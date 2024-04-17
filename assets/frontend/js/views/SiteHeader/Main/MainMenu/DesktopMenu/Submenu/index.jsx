import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import chunk from 'lodash/chunk';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import TriangleIcon from '../../Shared/TriangleIcon';
import useStyles from './useStyles';

function Submenu({ label, menuItems, onMouseOver, isPlacementLeftEnd, isLazyLoad, className }) {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const [submenuLinks, setSubmenuLinks] = useState(null);
  const [showLazyMenu, setShowLazyMenu] = useState(false);
  const { isBelowMd } = useBreakpoint();
  const COLUMNS_MAX_COUNT_TABLET = 3;

  function setActiveSubmenu(index) {
    const hasLinks = menuItems && menuItems[index]?.links;
    if (hasLinks) {
      setActiveItemIndex(index);

      const HEADER_HEIGHT = 92;
      const LINK_HEIGHT = 30;
      const LINKS_PER_COLUMN_MAX = 15;

      const linksPerColumnMaxOnScreen = Math.floor(
        (document.documentElement.clientHeight - HEADER_HEIGHT) / LINK_HEIGHT,
      );
      const linksPerColumn = Math.min(linksPerColumnMaxOnScreen, LINKS_PER_COLUMN_MAX);

      setSubmenuLinks(chunk(menuItems[index]?.links, linksPerColumn));
    } else {
      setActiveItemIndex(0);
      setSubmenuLinks(null);
    }
  }

  function handleMouseOver(e) {
    onMouseOver(e);
    if (isLazyLoad && !showLazyMenu) {
      setShowLazyMenu(true);
    }
  }

  function handleMouseOverItem(index) {
    setActiveSubmenu(index);
  }

  const columnsCount = (Boolean(submenuLinks) && submenuLinks.length) || 0;
  const hasViewAllLink = isBelowMd && columnsCount > COLUMNS_MAX_COUNT_TABLET;

  useEffect(() => {
    const hasLinks = menuItems && menuItems[0]?.links;
    if (isLazyLoad && hasLinks) {
      setActiveSubmenu(0);
    }
  }, [menuItems]);

  const mountOnEnter = !isLazyLoad || (isLazyLoad && showLazyMenu);

  return (
    <li className={classnames(classes.root, { 'is-placement-left-end': isPlacementLeftEnd }, className)}>
      <button className={classes.toggle} type="button" onMouseOver={handleMouseOver} onFocus={handleMouseOver}>
        <span className={classes.label}>{label}</span>
        <TriangleIcon className={classes.triangleIcon} />
      </button>

      {mountOnEnter && (
        <div className={classes.dropdownMenuContainer}>
          <div className={classes.dropdownMenuWrap}>
            <ul className={classes.dropdownMenu}>
              {menuItems.map((item, index) => {
                if (!item || (typeof item.isVisible === 'function' && !item.isVisible())) {
                  return null;
                }

                return (
                  <li
                    key={index}
                    className={classnames(classes.dropdownMenuListItem, item.isCategory && 'is-category')}
                    onMouseOver={() => handleMouseOverItem(index)}
                    onFocus={() => handleMouseOverItem(index)}
                  >
                    {item.isCategory && !item.href ? (
                      <span className={classnames(classes.dropdownMenuLink)}>{item.label}</span>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (isLazyLoad) {
                            e.preventDefault();
                          }
                          if (item.onClick) {
                            item.onClick();
                          }
                        }}
                        className={classnames(classes.dropdownMenuLink, {
                          'is-active': activeItemIndex === index,
                          'has-triangle': isLazyLoad,
                        })}
                      >
                        <span>
                          {item.label}
                          {item.type === 'highlightedNewItem' ? (
                            <span className={classes.newItem}>
                              <FormattedMessage id="shared.label.new" />
                            </span>
                          ) : null}
                        </span>
                        {isLazyLoad && <TriangleIcon className={classes.rightTriangleIcon} />}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {isLazyLoad && (
              <>
                {!submenuLinks && (
                  <div className={classes.loading}>
                    <SpinnerWheel color="white" size={14} />
                  </div>
                )}
                {submenuLinks &&
                  submenuLinks.map((links, columnIndex) => {
                    if (isBelowMd && columnIndex >= COLUMNS_MAX_COUNT_TABLET) {
                      return null;
                    }

                    return (
                      <ul className={classes.dropdownSubmenu} key={columnIndex}>
                        {links.map((item, index) => {
                          if (
                            hasViewAllLink &&
                            COLUMNS_MAX_COUNT_TABLET === columnIndex + 1 &&
                            index === links.length - 1
                          ) {
                            const activeMenuItem = menuItems[activeItemIndex];
                            return (
                              <li
                                key={activeMenuItem.href || activeMenuItem.id}
                                className={classes.dropdownSubmenuListItem}
                              >
                                <a
                                  href={activeMenuItem.viewAllHref || activeMenuItem.href}
                                  className={classes.dropdownSubmenuLink}
                                  onClick={() => setShowLazyMenu(false)}
                                >
                                  <span>
                                    <FormattedMessage id="homePage.reviews.viewAll" />
                                  </span>
                                </a>
                              </li>
                            );
                          }

                          return (
                            <li
                              key={item.href || item.id}
                              className={classnames(classes.dropdownSubmenuListItem, {
                                'with-max-width': columnsCount > 2,
                              })}
                            >
                              <a
                                href={item.href}
                                onClick={() => {
                                  item.onClick?.();
                                  setShowLazyMenu(false);
                                }}
                                className={classes.dropdownSubmenuLink}
                              >
                                <span>{item.label}</span>&nbsp;
                                <span className={classes.cnt}>({NumberService.formatNumber(item.cnt)})</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  })}
              </>
            )}
          </div>
          <div className={classes.dropdownMenuSpacer} />
        </div>
      )}
    </li>
  );
}

Submenu.propTypes = {
  label: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired,
  onMouseOver: PropTypes.func,
  isPlacementLeftEnd: PropTypes.bool,
  isLazyLoad: PropTypes.bool,
  className: PropTypes.string,
};

Submenu.defaultProps = {
  onMouseOver: () => {},
  isPlacementLeftEnd: false,
  isLazyLoad: false,
  className: '',
};

export default Submenu;
