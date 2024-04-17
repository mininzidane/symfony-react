import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Submenu from '../Submenu';
import useLazySubmenu from '../../Shared/useLazySubmenu';

function LazySubmenu({ label, menuItems, options }) {
  const { isBelowLg } = useBreakpoint();
  const { menuItems: lazyMenuItems, getMenuLinks } = useLazySubmenu(menuItems, options);
  return (
    <Submenu
      label={label}
      menuItems={lazyMenuItems}
      onMouseOver={getMenuLinks}
      isPlacementLeftEnd={isBelowLg}
      isLazyLoad
    />
  );
}

LazySubmenu.propTypes = {
  label: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};

export default LazySubmenu;
