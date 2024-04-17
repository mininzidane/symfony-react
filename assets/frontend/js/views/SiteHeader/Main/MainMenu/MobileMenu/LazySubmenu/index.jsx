import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Submenu from '../Submenu';
import useLazySubmenu from '../../Shared/useLazySubmenu';

function LazySubmenu({ label, menuItems, options, isMobileMenuOpen, ...props }) {
  const [init, setInit] = useState(false);
  const { menuItems: lazyMenuItems, getMenuLinks } = useLazySubmenu(menuItems, options);

  useEffect(() => {
    if (!init && isMobileMenuOpen) {
      getMenuLinks();
      setInit(true);
    }
  }, [isMobileMenuOpen]);

  return <Submenu label={label} menuItems={lazyMenuItems} isLazyLoad {...props} />;
}

LazySubmenu.propTypes = {
  label: PropTypes.node.isRequired,
  menuItems: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
};

export default LazySubmenu;
