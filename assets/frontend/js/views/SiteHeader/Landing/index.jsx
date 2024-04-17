import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Logo from 'frontend/js/views/SiteHeader/Logo';
import CopartBroker from 'frontend/js/views/SiteHeader/CopartBroker';
import BottomToolbar from 'frontend/js/views/SiteHeader/BottomToolbar';
import AuthButtons from '../AuthButtons';
import Phone from './Phone';
import useStyles from './useStyles';

function LandingHeader({ phone }) {
  const { isBelowSm } = useBreakpoint();
  const isMinimized = isBelowSm;
  const classes = useStyles();
  const isMinimizedClass = { 'is-minimized': isMinimized };

  useEffect(() => {
    document.body.classList[isMinimized ? 'add' : 'remove']('is-mobile-header-minimized');
  }, [isMinimized]);

  return (
    <>
      <div className={classnames(classes.root, 'fixed-fullsize-panel', isMinimizedClass)} id="header-panel">
        <div className={classnames(classes.mainPanel, isMinimizedClass)}>
          <div className={classes.logosWrap}>
            <Logo />
            <CopartBroker />
          </div>
          {phone || <Phone />}
          <div className={classes.accountSection}>{!isBelowSm && <AuthButtons />}</div>
        </div>
      </div>
      {isBelowSm && <BottomToolbar />}
    </>
  );
}

LandingHeader.propTypes = {
  phone: PropTypes.node,
};

LandingHeader.defaultProps = {
  phone: null,
};

export default LandingHeader;
