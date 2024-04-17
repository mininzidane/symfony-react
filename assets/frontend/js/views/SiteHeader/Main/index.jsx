import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

import ReactQueryProvider from 'frontend/js/providers/ReactQueryProvider';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import AuthModalProvider from 'frontend/js/providers/AuthModalProvider';
import CountryService from 'frontend/js/api/CountryService';
import useScrollDirection from 'frontend/js/hooks/useScrollDirection';

import AuthButtons from '../AuthButtons';
import CopartBroker from '../CopartBroker';
import Logo from '../Logo';
import AccountStats from './AccountStats';
import AccountMenu from './AccountMenu';
import Phone from './Shared/Phone';
import SocialLinks from './Shared/SocialLinks';
import Search from './Search';
import MainMenu from './MainMenu';
import useStyles from './useStyles';
import MobileMenuButton from './MobileMenuButton';

const HelpForm = React.lazy(() => import('./Shared/HelpForm'));
const BottomToolbar = React.lazy(() => import('../BottomToolbar'));

function SiteHeader() {
  const isIntl = !CountryService.isDomestic();

  // Customer data
  const { customer } = window;

  const accountMenuTriggerRef = useRef();

  // Menus
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);

  const { isBelowSm } = useBreakpoint();

  // Mobile header shrink animation
  const { scrollDir, SCROLL_DOWN } = useScrollDirection({ thresholdPixels: 50, off: !isBelowSm });
  const isJustScrolledDown = scrollDir === SCROLL_DOWN;
  const isAnyMenuOpen = isMobileMenuOpen || isAccountMenuOpen;
  const isMinimized = !isAnyMenuOpen && isBelowSm && isJustScrolledDown;
  const classes = useStyles();
  const isMinimizedClass = { 'is-minimized': isMinimized };

  function removeSeoHeader() {
    document.getElementById('site-header-for-seo')?.remove();
  }

  const handleAccountMenuClose = useCallback(() => {
    setAccountMenuOpen(false);
  }, [setAccountMenuOpen]);

  useEffect(() => {
    removeSeoHeader();
  }, []);

  useEffect(() => {
    document.body.classList[isMinimized ? 'add' : 'remove']('is-mobile-header-minimized');
  }, [isMinimized]);

  return (
    <>
      <div className={classnames(classes.root, 'fixed-fullsize-panel', isMinimizedClass)} id="header-panel">
        <div className={classnames(classes.mainPanel, isMinimizedClass)}>
          <div className={classes.logosWrap}>
            {isBelowSm && (
              <MobileMenuButton isActive={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            )}
            <Logo />
            <CopartBroker />
          </div>

          {!isBelowSm && <Search />}

          <div className={classes.accountSection}>
            {customer ? (
              <AccountStats
                isAccountMenuOpen={isAccountMenuOpen}
                setAccountMenuOpen={setAccountMenuOpen}
                accountMenuTriggerRef={accountMenuTriggerRef}
              />
            ) : (
              <>
                {isBelowSm ? (
                  <div className={classes.contacts}>
                    {isIntl ? (
                      <Phone />
                    ) : (
                      <Suspense fallback={null}>
                        <HelpForm />
                      </Suspense>
                    )}
                    {isIntl && <SocialLinks />}
                  </div>
                ) : (
                  <AuthButtons />
                )}
              </>
            )}
          </div>
        </div>

        {isBelowSm && (
          <div className={classes.mobileSearchPanel}>
            <Search />
          </div>
        )}

        <MainMenu
          isCollapsed={isMinimized}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {customer && (
        <AccountMenu isOpen={isAccountMenuOpen} onClose={handleAccountMenuClose} triggerRef={accountMenuTriggerRef} />
      )}

      {isBelowSm && (
        <Suspense fallback={null}>
          <BottomToolbar />
        </Suspense>
      )}
    </>
  );
}

const $el = document.getElementById('site-header-container');

if ($el) {
  ReactDOM.render(
    <ReactQueryProvider>
      <ThemeProvider>
        <TranslationProvider>
          <AuthModalProvider>
            <SiteHeader />
          </AuthModalProvider>
        </TranslationProvider>
      </ThemeProvider>
    </ReactQueryProvider>,
    $el,
  );
}

export default SiteHeader;
