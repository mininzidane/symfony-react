import React, { useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useStyles from './useStyles';

const DesktopMenu = React.lazy(() => import('./DesktopMenu'));
const MobileMenu = React.lazy(() => import('./MobileMenu'));

function MainMenu({ isCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();
  function toggleChatWidgetButton() {
    document.body.classList[isMobileMenuOpen ? 'add' : 'remove']('is-header-menu-open');
  }

  useEffect(() => {
    toggleChatWidgetButton();
  }, [isMobileMenuOpen]);

  return (
    <div className={classnames(classes.root, { 'is-collapsed': isCollapsed })}>
      {isBelowSm ? (
        <SuspenseWrap init={isMobileMenuOpen} fallback={null}>
          <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </SuspenseWrap>
      ) : (
        <Suspense fallback={null}>
          <DesktopMenu />
        </Suspense>
      )}
    </div>
  );
}

MainMenu.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func,
};

MainMenu.defaultProps = {
  setIsMobileMenuOpen: () => {},
};

export default MainMenu;
