import React from 'react';
import PropTypes from 'prop-types';
import SiteFooterSimple from 'frontend/js/views/SiteFooter/Simple';
import DelayedLoadSuspense from 'frontend/js/components/Suspense/DelayedLoad';
import DelayedLoadService from 'frontend/js/api/DelayedLoadService';

const SiteFooter = React.lazy(() => import('frontend/js/views/SiteFooter/Main'));

const Footer = ({ isFooterDisabled, isSimpleFooter, isFooterOfficesHidden, isSeoLocalBusinessDisabled }) => {
  if (isFooterDisabled) {
    return null;
  }

  if (isSimpleFooter) {
    return (
      <footer id="site-footer" className="page-footer">
        <SiteFooterSimple />
      </footer>
    );
  }

  return (
    <footer id="site-footer" className="page-footer">
      <DelayedLoadSuspense fallback={null} actions={[DelayedLoadService.ACTIONS.MAIN_CONTENT_LOADED]}>
        <SiteFooter noOffices={isFooterOfficesHidden} isSeoLocalBusinessDisabled={isSeoLocalBusinessDisabled} />
      </DelayedLoadSuspense>
    </footer>
  );
};

Footer.defaultProps = {
  isSimpleFooter: false,
  isFooterDisabled: false,
  isFooterOfficesHidden: false,
  isSeoLocalBusinessDisabled: false,
};

Footer.propTypes = {
  isSimpleFooter: PropTypes.bool,
  isFooterDisabled: PropTypes.bool,
  isFooterOfficesHidden: PropTypes.bool,
  isSeoLocalBusinessDisabled: PropTypes.bool,
};

export default Footer;
